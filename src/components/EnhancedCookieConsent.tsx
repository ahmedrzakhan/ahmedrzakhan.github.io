import React, { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { CookieConsentData } from '../types/analytics';

interface EnhancedCookieConsentProps {
  onAccept: (preferences: CookieConsentData) => void;
  onDecline: (preferences: CookieConsentData) => void;
  onPreferencesChange?: (preferences: CookieConsentData) => void;
}

const EnhancedCookieConsent: React.FC<EnhancedCookieConsentProps> = ({
  onAccept,
  onDecline,
  onPreferencesChange
}) => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsentData>({
    essential: true, // Always true - required for basic functionality
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: new Date().toISOString(),
    consent_version: '1.0'
  });

  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const storedConsent = localStorage.getItem('cookie-consent-preferences');
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent);
        setPreferences(parsed);
        setHasConsented(true);
      } catch (error) {
        console.warn('Failed to parse stored cookie consent:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences: CookieConsentData = {
      essential: true,
      analytics: true,
      marketing: false, // Keep false for privacy
      preferences: true,
      timestamp: new Date().toISOString(),
      consent_version: '1.0'
    };

    setPreferences(newPreferences);
    setHasConsented(true);
    
    // Store preferences
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(newPreferences));
    
    onAccept(newPreferences);
  };

  const handleDeclineAll = () => {
    const newPreferences: CookieConsentData = {
      essential: true, // Can't decline essential cookies
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString(),
      consent_version: '1.0'
    };

    setPreferences(newPreferences);
    setHasConsented(true);
    
    // Store preferences
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(newPreferences));
    
    onDecline(newPreferences);
  };

  const handleSavePreferences = () => {
    const newPreferences: CookieConsentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
      consent_version: '1.0'
    };

    setPreferences(newPreferences);
    setHasConsented(true);
    setShowPreferences(false);
    
    // Store preferences
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(newPreferences));
    
    if (onPreferencesChange) {
      onPreferencesChange(newPreferences);
    }

    // Call appropriate callback based on analytics consent
    if (newPreferences.analytics) {
      onAccept(newPreferences);
    } else {
      onDecline(newPreferences);
    }
  };

  const updatePreference = (key: keyof CookieConsentData, value: boolean) => {
    if (key === 'essential') return; // Can't change essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (hasConsented && !showPreferences) {
    return null;
  }

  if (showPreferences) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cookie Preferences
              </h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies to enhance your browsing experience and provide personalized content. 
                  You can choose which types of cookies to accept below.
                </p>
              </div>

              {/* Essential Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Essential Cookies
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      These cookies are necessary for the website to function and cannot be disabled. 
                      They include session management and security features.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.essential}
                      disabled
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      These cookies help us understand how visitors interact with our website by 
                      collecting and reporting information anonymously.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Preference Cookies
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      These cookies allow the website to remember choices you make and provide 
                      enhanced, more personal features.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={(e) => updatePreference('preferences', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Marketing Cookies
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      These cookies are used to track visitors across websites to display relevant 
                      and targeted advertisements.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference('marketing', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleDeclineAll}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2 text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Accept All
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              <p>
                You can change your preferences at any time by clicking the cookie settings link in the footer. 
                For more information, please read our{' '}
                <a href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={handleAcceptAll}
      onDecline={handleDeclineAll}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#374151',
        fontSize: '14px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      buttonStyle={{
        background: '#3B82F6',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
      }}
      declineButtonStyle={{
        background: '#6B7280',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        marginRight: '10px'
      }}
      expires={365}
      cookieName="portfolio-cookie-consent"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">
            🍪 We Value Your Privacy
          </h3>
          <p className="text-gray-700 text-sm">
            This website uses cookies to enhance your browsing experience and provide personalized content. 
            We respect your privacy and give you control over your data.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowPreferences(true)}
            className="px-4 py-2 text-blue-600 bg-transparent border border-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Customize
          </button>
        </div>
      </div>
    </CookieConsent>
  );
};

export default EnhancedCookieConsent;