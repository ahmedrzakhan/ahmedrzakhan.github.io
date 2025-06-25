import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface VisitData {
  id?: string;
  timestamp: string;
  page_path: string;
  page_title: string;
  referrer: string;
  user_agent: string;
  session_id: string;
  ip_hash?: string;
  country?: string;
  city?: string;
}

export interface EventData {
  id?: string;
  timestamp: string;
  event_name: string;
  event_data: any;
  session_id: string;
  page_path: string;
}

export interface SessionData {
  session_id: string;
  start_time: string;
  end_time?: string;
  page_views: number;
  events: number;
  duration?: number;
}

class CustomTracker {
  private supabase: SupabaseClient | null = null;
  private sessionId: string;
  private sessionStartTime: number;
  private pageStartTime: number;
  private isEnabled: boolean = false;

  constructor(supabaseUrl?: string, supabaseKey?: string) {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
    this.pageStartTime = Date.now();

    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private async hashIP(ip: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(ip + 'salt_for_privacy');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return await this.hashIP(data.ip);
    } catch (error) {
      console.warn('Could not get IP address:', error);
      return 'unknown';
    }
  }

  private async getGeoLocation(): Promise<{ country?: string; city?: string }> {
    // Skip geo location to avoid CORS issues
    // This can be enabled later with a proper backend proxy
    return {};
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  async trackPageView(pagePath: string, pageTitle: string): Promise<void> {
    if (!this.isEnabled || !this.supabase) return;

    try {
      const ip_hash = await this.getClientIP();
      const geoData = await this.getGeoLocation();

      const visitData: VisitData = {
        timestamp: new Date().toISOString(),
        page_path: pagePath,
        page_title: pageTitle,
        referrer: document.referrer || 'direct',
        user_agent: navigator.userAgent,
        session_id: this.sessionId,
        ip_hash,
        ...geoData,
      };

      const { error } = await this.supabase
        .from('visitor_data')
        .insert([visitData]);

      if (error) {
        console.error('Error tracking page view:', error);
      }

      this.pageStartTime = Date.now();
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  async trackEvent(eventName: string, eventData: any = {}): Promise<void> {
    if (!this.isEnabled || !this.supabase) return;

    try {
      const event: EventData = {
        timestamp: new Date().toISOString(),
        event_name: eventName,
        event_data: eventData,
        session_id: this.sessionId,
        page_path: window.location.pathname,
      };

      const { error } = await this.supabase
        .from('analytics_events')
        .insert([event]);

      if (error) {
        console.error('Error tracking event:', error);
      }
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  async trackTimeOnPage(): Promise<void> {
    if (!this.isEnabled || !this.supabase) return;

    const timeSpent = Date.now() - this.pageStartTime;
    
    if (timeSpent > 1000) { // Only track if more than 1 second
      await this.trackEvent('time_on_page', {
        duration: timeSpent,
        page_path: window.location.pathname,
      });
    }
  }

  async endSession(): Promise<void> {
    if (!this.isEnabled || !this.supabase) return;

    try {
      const sessionData: SessionData = {
        session_id: this.sessionId,
        start_time: new Date(this.sessionStartTime).toISOString(),
        end_time: new Date().toISOString(),
        duration: Date.now() - this.sessionStartTime,
        page_views: 0, // This would be calculated by the database
        events: 0, // This would be calculated by the database
      };

      const { error } = await this.supabase
        .from('session_data')
        .upsert([sessionData], { 
          onConflict: 'session_id' 
        });

      if (error) {
        console.error('Error ending session:', error);
      }
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }

  // Analytics methods
  async getVisitStats(days: number = 30): Promise<any> {
    if (!this.supabase) return null;

    try {
      const { data, error } = await this.supabase
        .from('visitor_data')
        .select('*')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        console.error('Error getting visit stats:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting visit stats:', error);
      return null;
    }
  }

  async getEventStats(days: number = 30): Promise<any> {
    if (!this.supabase) return null;

    try {
      const { data, error } = await this.supabase
        .from('analytics_events')
        .select('*')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        console.error('Error getting event stats:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting event stats:', error);
      return null;
    }
  }

  async getTopPages(days: number = 30): Promise<any> {
    if (!this.supabase) return null;

    try {
      const { data, error } = await this.supabase
        .from('visitor_data')
        .select('page_path, page_title')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        console.error('Error getting top pages:', error);
        return null;
      }

      const pageCounts = data?.reduce((acc: any, visit: any) => {
        const key = `${visit.page_path}|${visit.page_title}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(pageCounts || {})
        .map(([key, count]) => {
          const [page_path, page_title] = key.split('|');
          return { page_path, page_title, count };
        })
        .sort((a: any, b: any) => b.count - a.count);
    } catch (error) {
      console.error('Error getting top pages:', error);
      return null;
    }
  }
}

export default CustomTracker;