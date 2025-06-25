import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  AnalyticsEvent, 
  VisitorData, 
  SessionData, 
  DeviceInfo, 
  GeoData, 
  UTMParams, 
  PerformanceMetrics,
  OfflineQueueItem,
  AnalyticsError,
  Database
} from '../types/analytics';

export class EnhancedCustomTracker {
  private supabase: SupabaseClient<Database> | null = null;
  private sessionId: string;
  private sessionStartTime: number;
  private pageStartTime: number;
  private isEnabled: boolean = false;
  private isOnline: boolean = navigator.onLine;
  private offlineQueue: OfflineQueueItem[] = [];
  private deviceInfo: DeviceInfo | null = null;
  private geoData: GeoData | null = null;
  private utmParams: UTMParams | null = null;
  private performanceObserver: PerformanceObserver | null = null;
  private batchQueue: any[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private readonly BATCH_SIZE = 10;
  private readonly BATCH_INTERVAL = 5000; // 5 seconds
  private readonly MAX_RETRIES = 3;

  constructor(supabaseUrl?: string, supabaseKey?: string) {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
    this.pageStartTime = Date.now();

    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
    }

    this.initializeDeviceInfo();
    this.initializeGeoData();
    this.initializeUTMParams();
    this.setupOnlineOfflineListeners();
    this.setupPerformanceMonitoring();
    this.setupVisibilityChangeListener();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private async initializeDeviceInfo(): Promise<void> {
    try {
      const userAgent = navigator.userAgent;
      const screen = window.screen;
      
      // Parse user agent for device info
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);
      
      let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
      if (isTablet) deviceType = 'tablet';
      else if (isMobile) deviceType = 'mobile';

      // Extract browser info
      let browserName = 'Unknown';
      let browserVersion = 'Unknown';
      
      if (userAgent.indexOf('Chrome') > -1) {
        browserName = 'Chrome';
        browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Firefox';
        browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.indexOf('Safari') > -1) {
        browserName = 'Safari';
        browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.indexOf('Edge') > -1) {
        browserName = 'Edge';
        browserVersion = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
      }

      // Extract OS info
      let osName = 'Unknown';
      let osVersion = 'Unknown';
      
      if (userAgent.indexOf('Windows') > -1) {
        osName = 'Windows';
        osVersion = userAgent.match(/Windows NT ([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.indexOf('Mac') > -1) {
        osName = 'macOS';
        osVersion = userAgent.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown';
      } else if (userAgent.indexOf('Linux') > -1) {
        osName = 'Linux';
      } else if (userAgent.indexOf('Android') > -1) {
        osName = 'Android';
        osVersion = userAgent.match(/Android ([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.indexOf('iOS') > -1) {
        osName = 'iOS';
        osVersion = userAgent.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown';
      }

      this.deviceInfo = {
        device_type: deviceType,
        browser_name: browserName,
        browser_version: browserVersion,
        os_name: osName,
        os_version: osVersion,
        screen_resolution: `${screen.width}x${screen.height}`,
        color_depth: screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        is_mobile: isMobile,
        is_touch_device: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      };
    } catch (error) {
      console.warn('Could not initialize device info:', error);
    }
  }

  private async initializeGeoData(): Promise<void> {
    try {
      // Try to get geo data from IP-based service
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        this.geoData = {
          country: data.country_name,
          country_code: data.country_code,
          region: data.region,
          city: data.city,
          timezone: data.timezone,
          coordinates: {
            latitude: data.latitude,
            longitude: data.longitude
          }
        };
      }
    } catch (error) {
      console.warn('Could not get geo location:', error);
      // Fallback to timezone-based detection
      this.geoData = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  }

  private initializeUTMParams(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: UTMParams = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utmParams[param as keyof UTMParams] = value;
      }
    });

    if (Object.keys(utmParams).length > 0) {
      this.utmParams = utmParams;
      // Store UTM params in sessionStorage for the session
      sessionStorage.setItem('analytics_utm_params', JSON.stringify(utmParams));
    } else {
      // Try to get from sessionStorage
      const stored = sessionStorage.getItem('analytics_utm_params');
      if (stored) {
        this.utmParams = JSON.parse(stored);
      }
    }
  }

  private setupOnlineOfflineListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncOfflineQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private setupPerformanceMonitoring(): void {
    if ('PerformanceObserver' in window) {
      try {
        this.performanceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          this.processPerformanceEntries(entries);
        });

        this.performanceObserver.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      } catch (error) {
        console.warn('Performance monitoring not available:', error);
      }
    }

    // Track page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.trackPerformanceMetrics();
      }, 0);
    });
  }

  private setupVisibilityChangeListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackTimeOnPage();
        this.flushBatchQueue();
      } else {
        this.pageStartTime = Date.now();
      }
    });
  }

  private async hashIP(ip: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(ip + 'portfolio_salt_2024');
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
    } catch (error) {
      console.warn('Could not hash IP:', error);
      return 'unknown';
    }
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

  private addToBatch(data: any): void {
    this.batchQueue.push(data);
    
    if (this.batchQueue.length >= this.BATCH_SIZE) {
      this.flushBatchQueue();
    } else if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flushBatchQueue();
      }, this.BATCH_INTERVAL);
    }
  }

  private async flushBatchQueue(): Promise<void> {
    if (this.batchQueue.length === 0) return;

    const batch = [...this.batchQueue];
    this.batchQueue = [];

    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    if (this.isOnline && this.supabase) {
      try {
        // Group by table type
        const visitorBatch = batch.filter(item => item.type === 'visitor');
        const eventBatch = batch.filter(item => item.type === 'event');
        const sessionBatch = batch.filter(item => item.type === 'session');

        // Execute batch inserts
        const promises = [];
        
        if (visitorBatch.length > 0) {
          promises.push(
            this.supabase.from('visitor_data').insert(visitorBatch.map(item => item.data))
          );
        }
        
        if (eventBatch.length > 0) {
          promises.push(
            this.supabase.from('analytics_events').insert(eventBatch.map(item => item.data))
          );
        }
        
        if (sessionBatch.length > 0) {
          promises.push(
            this.supabase.from('session_data').upsert(sessionBatch.map(item => item.data))
          );
        }

        await Promise.all(promises);
      } catch (error) {
        console.error('Error flushing batch queue:', error);
        // Add failed items to offline queue
        batch.forEach(item => this.addToOfflineQueue(item));
      }
    } else {
      // Add to offline queue
      batch.forEach(item => this.addToOfflineQueue(item));
    }
  }

  private addToOfflineQueue(item: any): void {
    const queueItem: OfflineQueueItem = {
      id: crypto.randomUUID(),
      type: item.type,
      data: item.data,
      timestamp: new Date().toISOString(),
      retry_count: 0,
      max_retries: this.MAX_RETRIES
    };
    
    this.offlineQueue.push(queueItem);
    
    // Persist to localStorage
    try {
      localStorage.setItem('analytics_offline_queue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.warn('Could not persist offline queue:', error);
    }
  }

  private async syncOfflineQueue(): Promise<void> {
    if (!this.isOnline || !this.supabase || this.offlineQueue.length === 0) return;

    // Load from localStorage
    try {
      const stored = localStorage.getItem('analytics_offline_queue');
      if (stored) {
        this.offlineQueue = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Could not load offline queue:', error);
    }

    const itemsToRetry = this.offlineQueue.filter(item => item.retry_count < item.max_retries);
    
    for (const item of itemsToRetry) {
      try {
        if (item.type === 'event') {
          await this.supabase.from('analytics_events').insert([item.data]);
        } else if (item.type === 'pageview') {
          await this.supabase.from('visitor_data').insert([item.data]);
        } else if (item.type === 'session') {
          await this.supabase.from('session_data').upsert([item.data]);
        }
        
        // Remove successful item
        this.offlineQueue = this.offlineQueue.filter(qItem => qItem.id !== item.id);
      } catch (error) {
        item.retry_count++;
        console.warn(`Retry ${item.retry_count}/${item.max_retries} failed for item ${item.id}:`, error);
      }
    }

    // Remove items that exceeded max retries
    this.offlineQueue = this.offlineQueue.filter(item => item.retry_count < item.max_retries);

    // Update localStorage
    try {
      localStorage.setItem('analytics_offline_queue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.warn('Could not update offline queue:', error);
    }
  }

  enable(): void {
    this.isEnabled = true;
    if (this.isOnline) {
      this.syncOfflineQueue();
    }
  }

  disable(): void {
    this.isEnabled = false;
    this.flushBatchQueue();
  }

  async trackPageView(pagePath: string, pageTitle: string): Promise<void> {
    if (!this.isEnabled) return;

    try {
      const ip_hash = await this.getClientIP();

      const visitData: VisitorData = {
        timestamp: new Date().toISOString(),
        page_path: pagePath,
        page_title: pageTitle,
        referrer: document.referrer || 'direct',
        user_agent: navigator.userAgent,
        session_id: this.sessionId,
        ip_hash,
        geo_data: this.geoData || undefined,
        device_info: this.deviceInfo || undefined,
        utm_params: this.utmParams || undefined,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          scroll_depth: 0,
          time_to_scroll: 0
        }
      };

      this.addToBatch({ type: 'visitor', data: visitData });
      this.pageStartTime = Date.now();

      // Update real-time visitors
      if (this.supabase) {
        await this.supabase
          .from('real_time_visitors')
          .upsert({
            session_id: this.sessionId,
            last_seen: new Date().toISOString(),
            page_path: pagePath,
            user_agent: navigator.userAgent,
            device_info: this.deviceInfo || undefined,
            geo_data: this.geoData || undefined
          });
      }
    } catch (error) {
      this.trackError(error as Error, { context: 'trackPageView', pagePath, pageTitle });
    }
  }

  async trackEvent(eventName: string, eventData: any = {}): Promise<void> {
    if (!this.isEnabled) return;

    try {
      const event: AnalyticsEvent = {
        timestamp: new Date().toISOString(),
        event_name: eventName,
        event_data: {
          ...eventData,
          page_url: window.location.href,
          timestamp: Date.now()
        },
        session_id: this.sessionId,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent,
        device_info: this.deviceInfo || undefined,
        utm_params: this.utmParams || undefined
      };

      this.addToBatch({ type: 'event', data: event });
    } catch (error) {
      this.trackError(error as Error, { context: 'trackEvent', eventName, eventData });
    }
  }

  trackTimeOnPage(): void {
    if (!this.isEnabled) return;

    const timeSpent = Date.now() - this.pageStartTime;
    
    if (timeSpent > 1000) { // Only track if more than 1 second
      this.trackEvent('time_on_page', {
        duration: timeSpent,
        page_path: window.location.pathname,
        scroll_depth: this.getScrollDepth()
      });
    }
  }

  private getScrollDepth(): number {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    return Math.round(((scrollTop + windowHeight) / documentHeight) * 100);
  }

  private processPerformanceEntries(entries: PerformanceEntry[]): void {
    entries.forEach(entry => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;
        this.trackPerformanceFromNavigation(navEntry);
      }
    });
  }

  private trackPerformanceFromNavigation(navEntry: PerformanceNavigationTiming): void {
    const metrics: PerformanceMetrics = {
      page_load_time: navEntry.loadEventEnd - navEntry.fetchStart,
      dom_content_loaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
      first_contentful_paint: 0, // Will be updated by paint entries
      largest_contentful_paint: 0, // Will be updated by LCP entries
      first_input_delay: 0, // Will be tracked separately
      cumulative_layout_shift: 0, // Will be tracked separately
      time_to_interactive: navEntry.domInteractive - navEntry.fetchStart
    };

    this.trackPerformanceMetrics(metrics);
  }

  async trackPerformanceMetrics(metrics?: PerformanceMetrics): Promise<void> {
    if (!this.isEnabled || !this.supabase) return;

    try {
      const performanceData = metrics || this.getWebVitals();
      
      await this.supabase.from('performance_metrics').insert([{
        timestamp: new Date().toISOString(),
        session_id: this.sessionId,
        page_path: window.location.pathname,
        ...performanceData
      }]);
    } catch (error) {
      console.error('Error tracking performance metrics:', error);
    }
  }

  private getWebVitals(): PerformanceMetrics {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
    
    return {
      page_load_time: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
      dom_content_loaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
      first_contentful_paint: fcp ? fcp.startTime : 0,
      largest_contentful_paint: 0, // Would need LCP observer
      first_input_delay: 0, // Would need FID observer
      cumulative_layout_shift: 0, // Would need CLS observer
      time_to_interactive: navigation ? navigation.domInteractive - navigation.fetchStart : 0
    };
  }

  async trackError(error: Error, context?: Record<string, any>): Promise<void> {
    if (!this.isEnabled || !this.supabase) return;

    try {
      const errorData: AnalyticsError = {
        timestamp: new Date().toISOString(),
        error_type: 'tracking_error',
        error_message: error.message,
        error_stack: error.stack,
        session_id: this.sessionId,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent,
        additional_context: context
      };

      await this.supabase.from('analytics_errors').insert([errorData]);
    } catch (insertError) {
      console.error('Error tracking error:', insertError);
    }
  }

  async endSession(): Promise<void> {
    if (!this.isEnabled) return;

    try {
      this.trackTimeOnPage();
      this.flushBatchQueue();

      const sessionData: SessionData = {
        session_id: this.sessionId,
        start_time: new Date(this.sessionStartTime).toISOString(),
        end_time: new Date().toISOString(),
        duration: Date.now() - this.sessionStartTime,
        page_views: 0, // Will be calculated by database triggers
        events: 0, // Will be calculated by database triggers
        device_info: this.deviceInfo || undefined,
        geo_data: this.geoData || undefined,
        utm_params: this.utmParams || undefined
      };

      this.addToBatch({ type: 'session', data: sessionData });
      this.flushBatchQueue();

      // Clean up real-time visitor
      if (this.supabase) {
        await this.supabase
          .from('real_time_visitors')
          .delete()
          .eq('session_id', this.sessionId);
      }
    } catch (error) {
      this.trackError(error as Error, { context: 'endSession' });
    }
  }

  // Analytics query methods for dashboard
  async getDashboardStats(days: number = 30): Promise<any> {
    if (!this.supabase) return null;

    try {
      const { data, error } = await this.supabase
        .rpc('get_dashboard_stats', { days_back: days });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return null;
    }
  }

  async getTopPages(days: number = 30, limit: number = 10): Promise<any> {
    if (!this.supabase) return null;

    try {
      const { data, error } = await this.supabase
        .rpc('get_top_pages', { days_back: days, limit_count: limit });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting top pages:', error);
      return null;
    }
  }

  async getDeviceBreakdown(days: number = 30): Promise<any> {
    if (!this.supabase) return null;

    try {
      const { data, error } = await this.supabase
        .rpc('get_device_breakdown', { days_back: days });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting device breakdown:', error);
      return null;
    }
  }

  async getRealTimeVisitors(): Promise<number> {
    if (!this.supabase) return 0;

    try {
      const { count, error } = await this.supabase
        .from('real_time_visitors')
        .select('*', { count: 'exact' })
        .gte('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString());

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting real-time visitors:', error);
      return 0;
    }
  }

  // Cleanup method
  cleanup(): void {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
    
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }
    
    this.flushBatchQueue();
  }
}

export default EnhancedCustomTracker;