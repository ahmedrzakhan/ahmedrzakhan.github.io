import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    functional: true, // Always true for essential cookies
  });

  useEffect(() => {
    const consentGiven = Cookies.get('cookie-consent');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    Cookies.set('analytics-consent', 'true', { expires: 365 });
    setIsVisible(false);
    onAccept();
  };

  const handleDeclineAll = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 });
    Cookies.set('analytics-consent', 'false', { expires: 365 });
    setIsVisible(false);
    onDecline();
  };

  const handleSavePreferences = () => {
    Cookies.set('cookie-consent', 'custom', { expires: 365 });
    Cookies.set('analytics-consent', preferences.analytics.toString(), { expires: 365 });
    setIsVisible(false);
    
    if (preferences.analytics) {
      onAccept();
    } else {
      onDecline();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Cookie Preferences
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              We use cookies to enhance your browsing experience and analyze our traffic. 
              Choose which cookies you'd like to accept.
            </p>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  disabled
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Essential Cookies</strong> - Required for basic site functionality
                </span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Analytics Cookies</strong> - Help us understand how you use our site
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDeclineAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Decline All
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>
            By using this website, you agree to our use of cookies as described in our{' '}
            <a href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
              Privacy Policy
            </a>
            . You can change your cookie preferences at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;