// Core Analytics Types
export interface AnalyticsEvent {
  id?: string;
  timestamp: string;
  event_name: string;
  event_data: Record<string, any>;
  session_id: string;
  page_path: string;
  user_agent?: string;
  device_info?: DeviceInfo;
  utm_params?: UTMParams;
}

export interface VisitorData {
  id?: string;
  timestamp: string;
  page_path: string;
  page_title: string;
  referrer: string;
  user_agent: string;
  session_id: string;
  ip_hash?: string;
  geo_data?: GeoData;
  device_info?: DeviceInfo;
  utm_params?: UTMParams;
  viewport?: ViewportData;
}

export interface SessionData {
  session_id: string;
  start_time: string;
  end_time?: string;
  page_views: number;
  events: number;
  duration?: number;
  bounce_rate?: number;
  device_info?: DeviceInfo;
  geo_data?: GeoData;
  utm_params?: UTMParams;
}

// Device and Browser Information
export interface DeviceInfo {
  device_type: 'desktop' | 'mobile' | 'tablet';
  browser_name: string;
  browser_version: string;
  os_name: string;
  os_version: string;
  screen_resolution: string;
  color_depth: number;
  timezone: string;
  language: string;
  is_mobile: boolean;
  is_touch_device: boolean;
}

// Geographic Data
export interface GeoData {
  country?: string;
  country_code?: string;
  region?: string;
  city?: string;
  timezone?: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}

// UTM Parameters
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Viewport Information
export interface ViewportData {
  width: number;
  height: number;
  scroll_depth: number;
  time_to_scroll: number;
}

// Google Analytics Types
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface GAPageView {
  page_title: string;
  page_location: string;
  page_path?: string;
  custom_parameters?: Record<string, any>;
}

export interface GACustomEvent {
  event_name: string;
  event_parameters?: Record<string, any>;
}

export interface GAUserProperties {
  user_id?: string;
  custom_properties?: Record<string, any>;
}

// Dashboard Analytics Types
export interface DashboardStats {
  totalVisits: number;
  totalEvents: number;
  totalSessions: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: PageStat[];
  topReferrers: ReferrerStat[];
  deviceBreakdown: DeviceStat[];
  browserBreakdown: BrowserStat[];
  geoBreakdown: GeoStat[];
  recentEvents: AnalyticsEvent[];
  visitsByDate: DateStat[];
  eventsByType: EventTypeStat[];
  realTimeVisitors: number;
}

export interface PageStat {
  page_path: string;
  page_title: string;
  count: number;
  avg_time_on_page: number;
  bounce_rate: number;
}

export interface ReferrerStat {
  referrer: string;
  count: number;
  percentage: number;
}

export interface DeviceStat {
  device_type: string;
  count: number;
  percentage: number;
}

export interface BrowserStat {
  browser_name: string;
  browser_version: string;
  count: number;
  percentage: number;
}

export interface GeoStat {
  country: string;
  country_code: string;
  count: number;
  percentage: number;
}

export interface DateStat {
  date: string;
  visits: number;
  events: number;
  sessions: number;
  avg_duration: number;
}

export interface EventTypeStat {
  event_name: string;
  count: number;
  percentage: number;
}

// Performance Monitoring Types
export interface PerformanceMetrics {
  page_load_time: number;
  dom_content_loaded: number;
  first_contentful_paint: number;
  largest_contentful_paint: number;
  first_input_delay: number;
  cumulative_layout_shift: number;
  time_to_interactive: number;
}

// A/B Testing Types
export interface ABTestVariant {
  id: string;
  name: string;
  traffic_allocation: number;
  is_active: boolean;
}

export interface ABTestEvent {
  test_id: string;
  variant_id: string;
  event_type: 'impression' | 'conversion';
  timestamp: string;
  session_id: string;
  user_properties?: Record<string, any>;
}

// Cookie Consent Types
export interface CookieConsentData {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
  consent_version: string;
}

// Error Tracking Types
export interface AnalyticsError {
  id?: string;
  timestamp: string;
  error_type: 'tracking_error' | 'api_error' | 'validation_error';
  error_message: string;
  error_stack?: string;
  session_id: string;
  page_path: string;
  user_agent: string;
  additional_context?: Record<string, any>;
}

// Offline Queue Types
export interface OfflineQueueItem {
  id: string;
  type: 'event' | 'pageview' | 'session';
  data: AnalyticsEvent | VisitorData | SessionData;
  timestamp: string;
  retry_count: number;
  max_retries: number;
}

// Analytics Configuration
export interface AnalyticsConfig {
  gaId?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  enableOfflineTracking?: boolean;
  enablePerformanceMonitoring?: boolean;
  enableErrorTracking?: boolean;
  enableABTesting?: boolean;
  samplingRate?: number;
  sessionTimeout?: number;
  maxRetries?: number;
  batchSize?: number;
  flushInterval?: number;
}

// Hook Return Types
export interface UseAnalyticsReturn {
  trackPageView: (pagePath: string, pageTitle: string, customData?: Record<string, any>) => void;
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
  trackPortfolioView: () => void;
  trackProjectClick: (projectName: string, projectData?: Record<string, any>) => void;
  trackContactFormSubmission: (formData?: Record<string, any>) => void;
  trackResumeDownload: () => void;
  trackTimeOnPage: () => void;
  trackPerformance: (metrics: PerformanceMetrics) => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
  setUserProperties: (properties: Record<string, any>) => void;
  updateConsentPreferences: (preferences: CookieConsentData) => void;
  isTrackingEnabled: boolean;
  isOnline: boolean;
  sessionId: string;
}

// Supabase Table Types
export interface Database {
  public: {
    Tables: {
      analytics_events: {
        Row: AnalyticsEvent;
        Insert: Omit<AnalyticsEvent, 'id'>;
        Update: Partial<AnalyticsEvent>;
      };
      visitor_data: {
        Row: VisitorData;
        Insert: Omit<VisitorData, 'id'>;
        Update: Partial<VisitorData>;
      };
      session_data: {
        Row: SessionData;
        Insert: SessionData;
        Update: Partial<SessionData>;
      };
      performance_metrics: {
        Row: PerformanceMetrics & {
          id?: string;
          timestamp: string;
          session_id: string;
          page_path: string;
        };
        Insert: Omit<PerformanceMetrics & {
          timestamp: string;
          session_id: string;
          page_path: string;
        }, 'id'>;
        Update: Partial<PerformanceMetrics>;
      };
      analytics_errors: {
        Row: AnalyticsError;
        Insert: Omit<AnalyticsError, 'id'>;
        Update: Partial<AnalyticsError>;
      };
    };
  };
}

// Export utility type for creating typed Supabase client
export type SupabaseClient = any; // Will be properly typed when imported from @supabase/supabase-js