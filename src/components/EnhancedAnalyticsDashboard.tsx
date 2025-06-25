import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, subDays, parseISO } from 'date-fns';
import { EnhancedCustomTracker } from '../analytics/enhanced-custom-tracker';
import { DashboardStats } from '../types/analytics';

interface EnhancedAnalyticsDashboardProps {
  supabaseUrl?: string;
  supabaseKey?: string;
  isAdmin?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00c49f', '#ffbb28', '#ff8042'];

const EnhancedAnalyticsDashboard: React.FC<EnhancedAnalyticsDashboardProps> = ({
  supabaseUrl,
  supabaseKey,
  isAdmin = false,
  isVisible = false,
  onClose
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState(30);
  const [activeTab, setActiveTab] = useState('overview');
  const [customTracker, setCustomTracker] = useState<EnhancedCustomTracker | null>(null);
  const [realTimeVisitors, setRealTimeVisitors] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (supabaseUrl && supabaseKey) {
      setCustomTracker(new EnhancedCustomTracker(supabaseUrl, supabaseKey));
    }
  }, [supabaseUrl, supabaseKey]);

  useEffect(() => {
    if (!customTracker || !isAdmin || !isVisible) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const [dashboardStats, topPages, deviceBreakdown, realTime] = await Promise.all([
          customTracker.getDashboardStats(timeRange),
          customTracker.getTopPages(timeRange),
          customTracker.getDeviceBreakdown(timeRange),
          customTracker.getRealTimeVisitors()
        ]);

        // Mock additional data for demo (in real implementation, these would come from the database)
        const mockVisitsByDate = Array.from({ length: timeRange }, (_, i) => {
          const date = format(subDays(new Date(), timeRange - i - 1), 'yyyy-MM-dd');
          return {
            date,
            visits: Math.floor(Math.random() * 50) + 10,
            events: Math.floor(Math.random() * 100) + 20,
            sessions: Math.floor(Math.random() * 30) + 5,
            avg_duration: Math.floor(Math.random() * 300) + 60
          };
        });

        const mockReferrers = [
          { referrer: 'google.com', count: 45, percentage: 35.2 },
          { referrer: 'direct', count: 38, percentage: 29.7 },
          { referrer: 'linkedin.com', count: 25, percentage: 19.5 },
          { referrer: 'github.com', count: 12, percentage: 9.4 },
          { referrer: 'twitter.com', count: 8, percentage: 6.2 }
        ];

        const mockBrowserBreakdown = [
          { browser_name: 'Chrome', browser_version: '118.0', count: 65, percentage: 52.0 },
          { browser_name: 'Firefox', browser_version: '119.0', count: 28, percentage: 22.4 },
          { browser_name: 'Safari', browser_version: '17.0', count: 22, percentage: 17.6 },
          { browser_name: 'Edge', browser_version: '118.0', count: 10, percentage: 8.0 }
        ];

        const mockGeoBreakdown = [
          { country: 'United States', country_code: 'US', count: 45, percentage: 36.0 },
          { country: 'United Kingdom', country_code: 'GB', count: 25, percentage: 20.0 },
          { country: 'Canada', country_code: 'CA', count: 18, percentage: 14.4 },
          { country: 'Germany', country_code: 'DE', count: 15, percentage: 12.0 },
          { country: 'France', country_code: 'FR', count: 12, percentage: 9.6 },
          { country: 'Australia', country_code: 'AU', count: 10, percentage: 8.0 }
        ];

        const mockEventsByType = [
          { event_name: 'page_view', count: 450, percentage: 45.0 },
          { event_name: 'project_click', count: 180, percentage: 18.0 },
          { event_name: 'time_on_page', count: 250, percentage: 25.0 },
          { event_name: 'contact_form_submit', count: 45, percentage: 4.5 },
          { event_name: 'resume_download', count: 75, percentage: 7.5 }
        ];

        setStats({
          totalVisits: dashboardStats?.total_visits || 0,
          totalEvents: dashboardStats?.total_events || 0,
          totalSessions: dashboardStats?.total_sessions || 0,
          avgSessionDuration: dashboardStats?.avg_session_duration || 0,
          bounceRate: dashboardStats?.bounce_rate || 0,
          topPages: topPages || [],
          topReferrers: mockReferrers,
          deviceBreakdown: deviceBreakdown || [],
          browserBreakdown: mockBrowserBreakdown,
          geoBreakdown: mockGeoBreakdown,
          recentEvents: [],
          visitsByDate: mockVisitsByDate,
          eventsByType: mockEventsByType,
          realTimeVisitors: realTime
        });

        setRealTimeVisitors(realTime);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Set up real-time updates
    const interval = setInterval(() => {
      if (customTracker) {
        customTracker.getRealTimeVisitors().then(setRealTimeVisitors);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [customTracker, timeRange, isAdmin, isVisible]);

  const handleExportData = async () => {
    if (!stats) return;
    
    setIsExporting(true);
    try {
      const exportData = {
        generated_at: new Date().toISOString(),
        time_range_days: timeRange,
        summary: {
          total_visits: stats.totalVisits,
          total_events: stats.totalEvents,
          total_sessions: stats.totalSessions,
          avg_session_duration: stats.avgSessionDuration,
          bounce_rate: stats.bounceRate,
          real_time_visitors: realTimeVisitors
        },
        top_pages: stats.topPages,
        referrers: stats.topReferrers,
        devices: stats.deviceBreakdown,
        browsers: stats.browserBreakdown,
        geography: stats.geoBreakdown,
        visits_by_date: stats.visitsByDate,
        events_by_type: stats.eventsByType
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-analytics-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
  };

  if (!isAdmin) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Admin access required to view analytics data.
          </p>
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h2>
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                {realTimeVisitors} online now
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
            <button
              onClick={handleExportData}
              disabled={isExporting || !stats}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
            >
              <i className={`fas ${isExporting ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
              <span>Export</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
              Error Loading Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        ) : (
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
                  { id: 'audience', label: 'Audience', icon: 'fas fa-users' },
                  { id: 'behavior', label: 'Behavior', icon: 'fas fa-mouse-pointer' },
                  { id: 'technology', label: 'Technology', icon: 'fas fa-laptop' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <i className={tab.icon}></i>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Visits</h3>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{stats.totalVisits}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Total Events</h3>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-200">{stats.totalEvents}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Sessions</h3>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">{stats.totalSessions}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-orange-600 dark:text-orange-400">Avg. Duration</h3>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-200">
                      {formatDuration(stats.avgSessionDuration)}
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Bounce Rate</h3>
                    <p className="text-2xl font-bold text-red-900 dark:text-red-200">
                      {stats.bounceRate.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Visits Over Time */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Visits Over Time
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={stats.visitsByDate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        labelFormatter={(label) => format(parseISO(label), 'MMM dd, yyyy')}
                        formatter={(value, name) => [value, name === 'visits' ? 'Visits' : 'Events']}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="visits" 
                        stackId="1" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Visits"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="events" 
                        stackId="2" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        name="Events"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Pages and Events */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Pages</h3>
                    <div className="space-y-3">
                      {stats.topPages.slice(0, 5).map((page, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {page.page_title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {page.page_path}
                            </p>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {page.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Event Types</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={stats.eventsByType}
                          dataKey="count"
                          nameKey="event_name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {stats.eventsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Audience Tab */}
            {activeTab === 'audience' && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Geographic Distribution */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Geographic Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stats.geoBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country_code" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          labelFormatter={(label) => {
                            const country = stats.geoBreakdown.find(g => g.country_code === label);
                            return country?.country || label;
                          }}
                          formatter={(value) => [value, 'Visits']}
                        />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Referrer Sources */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Referrers</h3>
                    <div className="space-y-3">
                      {stats.topReferrers.map((referrer, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {referrer.referrer}
                            </p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${referrer.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4 text-right">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {referrer.count}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {referrer.percentage}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Technology Tab */}
            {activeTab === 'technology' && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Device Types */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Device Types</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={stats.deviceBreakdown}
                          dataKey="count"
                          nameKey="device_type"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ device_type, percentage }) => `${device_type}: ${percentage}%`}
                        >
                          {stats.deviceBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Browser Distribution */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Browser Distribution</h3>
                    <div className="space-y-3">
                      {stats.browserBreakdown.map((browser, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {browser.browser_name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Version {browser.browser_version}
                            </p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${browser.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4 text-right">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {browser.count}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {browser.percentage}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;