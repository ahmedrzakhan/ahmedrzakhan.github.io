import React, { useState, useEffect } from 'react';
import CustomTracker from '../analytics/custom-tracker';

interface DashboardStats {
  totalVisits: number;
  totalEvents: number;
  topPages: Array<{
    page_path: string;
    page_title: string;
    count: number;
  }>;
  recentEvents: Array<{
    event_name: string;
    timestamp: string;
    event_data: any;
  }>;
  visitsByDate: Array<{
    date: string;
    count: number;
  }>;
}

interface AnalyticsDashboardProps {
  supabaseUrl?: string;
  supabaseKey?: string;
  isAdmin?: boolean;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  supabaseUrl,
  supabaseKey,
  isAdmin = false,
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState(30);
  const [customTracker, setCustomTracker] = useState<CustomTracker | null>(null);

  useEffect(() => {
    if (supabaseUrl && supabaseKey) {
      setCustomTracker(new CustomTracker(supabaseUrl, supabaseKey));
    }
  }, [supabaseUrl, supabaseKey]);

  useEffect(() => {
    if (!customTracker || !isAdmin) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const [visits, events, topPages] = await Promise.all([
          customTracker.getVisitStats(timeRange),
          customTracker.getEventStats(timeRange),
          customTracker.getTopPages(timeRange),
        ]);

        // Process visits by date
        const visitsByDate = visits?.reduce((acc: any, visit: any) => {
          const date = new Date(visit.timestamp).toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const visitsByDateArray = Object.entries(visitsByDate || {})
          .map(([date, count]) => ({ date, count: count as number }))
          .sort((a, b) => a.date.localeCompare(b.date));

        // Get recent events
        const recentEvents = events?.slice(-10).reverse() || [];

        setStats({
          totalVisits: visits?.length || 0,
          totalEvents: events?.length || 0,
          topPages: topPages || [],
          recentEvents,
          visitsByDate: visitsByDateArray,
        });
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [customTracker, timeRange, isAdmin]);

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

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
            Error Loading Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Total Visits
            </h3>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
              {stats?.totalVisits || 0}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-400">
              Total Events
            </h3>
            <p className="text-2xl font-bold text-green-900 dark:text-green-200">
              {stats?.totalEvents || 0}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Top Page Views
            </h3>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
              {stats?.topPages?.[0]?.count || 0}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-orange-600 dark:text-orange-400">
              Avg. Daily Visits
            </h3>
            <p className="text-2xl font-bold text-orange-900 dark:text-orange-200">
              {stats?.visitsByDate && stats.visitsByDate.length > 0 
                ? Math.round((stats?.totalVisits || 0) / stats.visitsByDate.length)
                : 0}
            </p>
          </div>
        </div>

        {/* Top Pages */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Top Pages
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stats?.topPages?.slice(0, 5).map((page, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {page.page_path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {page.page_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {page.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Events */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Events
          </h3>
          <div className="space-y-3">
            {stats?.recentEvents?.map((event, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {event.event_name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {event.event_data && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {JSON.stringify(event.event_data, null, 1)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;