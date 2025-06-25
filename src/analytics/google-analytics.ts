declare global {
  interface Window {
    gtag: {
      (command: 'js', date: Date): void;
      (command: 'config', targetId: string, config?: { [key: string]: any }): void;
      (command: 'event', eventName: string, eventParameters?: { [key: string]: any }): void;
      (command: 'set', config: { [key: string]: any }): void;
      (command: 'consent', type: string, consentState: { [key: string]: any }): void;
    };
    dataLayer: any[];
  }
}

export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface GAPageView {
  page_title: string;
  page_location: string;
}

export interface GACustomEvent {
  event_name: string;
  event_parameters?: {
    [key: string]: any;
  };
}

class GoogleAnalytics {
  private gaId: string;
  private isInitialized: boolean = false;

  constructor(gaId: string) {
    this.gaId = gaId;
  }

  init(): void {
    if (this.isInitialized || !this.gaId) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.gaId, {
      send_page_view: false, // We'll handle page views manually
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    this.isInitialized = true;
  }

  trackPageView(pageView: GAPageView): void {
    if (!this.isInitialized) return;

    window.gtag('config', this.gaId, {
      page_title: pageView.page_title,
      page_location: pageView.page_location,
    });
  }

  trackEvent(event: GAEvent): void {
    if (!this.isInitialized) return;

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }

  trackCustomEvent(event: GACustomEvent): void {
    if (!this.isInitialized) return;

    window.gtag('event', event.event_name, event.event_parameters);
  }

  setUserProperties(properties: { [key: string]: any }): void {
    if (!this.isInitialized) return;

    window.gtag('set', properties);
  }

  updateConsent(granted: boolean): void {
    if (!this.isInitialized) return;

    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied', // Always deny ad storage for privacy
    });
  }
}

export default GoogleAnalytics;