import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CookieConsent from './components/CookieConsent';
import useAnalytics from './hooks/useAnalytics';

// Analytics configuration - Add your actual values here
const ANALYTICS_CONFIG = {
  gaId: process.env.REACT_APP_GA_ID, // Add your Google Analytics ID to .env
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL, // Add your Supabase URL to .env
  supabaseKey: process.env.REACT_APP_SUPABASE_ANON_KEY, // Add your Supabase anon key to .env
};

function App() {
  const analytics = useAnalytics(ANALYTICS_CONFIG);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Track initial page view
    analytics.trackPageView('/', 'Ahmed Raza Khan - Portfolio');
    
    // Set up intersection observer for section tracking
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'projects') {
            analytics.trackPortfolioView();
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('#projects, #about, #experience, #skills, #contact');
    sections.forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [analytics]);

  const handleAnalyticsAccept = () => {
    // Analytics will be enabled automatically via the cookie consent
    window.location.reload(); // Reload to initialize analytics
  };

  const handleAnalyticsDecline = () => {
    // Analytics remains disabled
  };

  // Check if user has admin access (you can implement your own logic here)
  const isAdmin = process.env.REACT_APP_ADMIN_MODE === 'true';

  return (
    <div className="relative min-h-screen bg-slate-900">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects analytics={analytics} />
        <Skills />
        <Contact analytics={analytics} />
      </main>
      <Footer />
      
      {/* Cookie Consent Banner */}
      <CookieConsent 
        onAccept={handleAnalyticsAccept}
        onDecline={handleAnalyticsDecline}
      />

      {/* Admin Analytics Toggle */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Toggle Analytics Dashboard"
          >
            <i className="fas fa-chart-bar"></i>
          </button>
        </div>
      )}

      {/* Analytics Dashboard Modal */}
      {showAnalytics && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
              <button
                onClick={() => setShowAnalytics(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-4">
              {/* Analytics Dashboard will be imported and rendered here */}
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Analytics dashboard placeholder - configure Supabase to enable tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;