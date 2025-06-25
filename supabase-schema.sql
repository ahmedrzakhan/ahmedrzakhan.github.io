-- Ahmed Portfolio Analytics Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create analytics_events table
CREATE TABLE analytics_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  event_name TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  device_info JSONB,
  utm_params JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create visitor_data table
CREATE TABLE visitor_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  page_path TEXT NOT NULL,
  page_title TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT NOT NULL,
  ip_hash TEXT,
  geo_data JSONB,
  device_info JSONB,
  utm_params JSONB,
  viewport JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create session_data table
CREATE TABLE session_data (
  session_id TEXT PRIMARY KEY,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  page_views INTEGER DEFAULT 0,
  events INTEGER DEFAULT 0,
  duration INTEGER,
  bounce_rate DECIMAL(5,2),
  device_info JSONB,
  geo_data JSONB,
  utm_params JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create performance_metrics table
CREATE TABLE performance_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_load_time INTEGER,
  dom_content_loaded INTEGER,
  first_contentful_paint INTEGER,
  largest_contentful_paint INTEGER,
  first_input_delay INTEGER,
  cumulative_layout_shift DECIMAL(10,6),
  time_to_interactive INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create analytics_errors table
CREATE TABLE analytics_errors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  error_stack TEXT,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  additional_context JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ab_test_events table for A/B testing
CREATE TABLE ab_test_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  test_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'conversion')),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  user_properties JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create real_time_visitors table for real-time tracking
CREATE TABLE real_time_visitors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  page_path TEXT NOT NULL,
  user_agent TEXT,
  device_info JSONB,
  geo_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_analytics_events_timestamp ON analytics_events (timestamp);
CREATE INDEX idx_analytics_events_session_id ON analytics_events (session_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events (event_name);
CREATE INDEX idx_analytics_events_page_path ON analytics_events (page_path);

CREATE INDEX idx_visitor_data_timestamp ON visitor_data (timestamp);
CREATE INDEX idx_visitor_data_session_id ON visitor_data (session_id);
CREATE INDEX idx_visitor_data_page_path ON visitor_data (page_path);

CREATE INDEX idx_session_data_start_time ON session_data (start_time);
CREATE INDEX idx_session_data_duration ON session_data (duration);

CREATE INDEX idx_performance_metrics_timestamp ON performance_metrics (timestamp);
CREATE INDEX idx_performance_metrics_session_id ON performance_metrics (session_id);
CREATE INDEX idx_performance_metrics_page_path ON performance_metrics (page_path);

CREATE INDEX idx_analytics_errors_timestamp ON analytics_errors (timestamp);
CREATE INDEX idx_analytics_errors_error_type ON analytics_errors (error_type);
CREATE INDEX idx_analytics_errors_session_id ON analytics_errors (session_id);

CREATE INDEX idx_ab_test_events_test_id ON ab_test_events (test_id);
CREATE INDEX idx_ab_test_events_timestamp ON ab_test_events (timestamp);

CREATE INDEX idx_real_time_visitors_last_seen ON real_time_visitors (last_seen);
CREATE INDEX idx_real_time_visitors_session_id ON real_time_visitors (session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_time_visitors ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert access (anonymous users can track)
CREATE POLICY "Allow public inserts on analytics_events" ON analytics_events
  FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow public inserts on visitor_data" ON visitor_data
  FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow public inserts on session_data" ON session_data
  FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow public upserts on session_data" ON session_data
  FOR UPDATE TO PUBLIC USING (true) WITH CHECK (true);

CREATE POLICY "Allow public inserts on performance_metrics" ON performance_metrics
  FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow public inserts on analytics_errors" ON analytics_errors
  FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow public inserts on ab_test_events" ON ab_test_events
  FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow public upserts on real_time_visitors" ON real_time_visitors
  FOR INSERT TO PUBLIC WITH CHECK (true);

CREATE POLICY "Allow public updates on real_time_visitors" ON real_time_visitors
  FOR UPDATE TO PUBLIC USING (true) WITH CHECK (true);

-- Create policies for read access (you can restrict this further)
-- For now, allowing public read access for dashboard functionality
-- In production, you may want to restrict this to authenticated admin users

CREATE POLICY "Allow public read access on analytics_events" ON analytics_events
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access on visitor_data" ON visitor_data
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access on session_data" ON session_data
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access on performance_metrics" ON performance_metrics
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access on analytics_errors" ON analytics_errors
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access on ab_test_events" ON ab_test_events
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access on real_time_visitors" ON real_time_visitors
  FOR SELECT TO PUBLIC USING (true);

-- Create functions for analytics aggregations
CREATE OR REPLACE FUNCTION get_dashboard_stats(days_back INTEGER DEFAULT 30)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_visits', (
      SELECT COUNT(*) FROM visitor_data 
      WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
    ),
    'total_events', (
      SELECT COUNT(*) FROM analytics_events 
      WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
    ),
    'total_sessions', (
      SELECT COUNT(*) FROM session_data 
      WHERE start_time >= NOW() - (days_back || ' days')::INTERVAL
    ),
    'avg_session_duration', (
      SELECT COALESCE(AVG(duration), 0) FROM session_data 
      WHERE start_time >= NOW() - (days_back || ' days')::INTERVAL
      AND duration IS NOT NULL
    ),
    'bounce_rate', (
      SELECT COALESCE(AVG(bounce_rate), 0) FROM session_data 
      WHERE start_time >= NOW() - (days_back || ' days')::INTERVAL
      AND bounce_rate IS NOT NULL
    ),
    'real_time_visitors', (
      SELECT COUNT(*) FROM real_time_visitors 
      WHERE last_seen >= NOW() - INTERVAL '5 minutes'
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get top pages
CREATE OR REPLACE FUNCTION get_top_pages(days_back INTEGER DEFAULT 30, limit_count INTEGER DEFAULT 10)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_agg(
    json_build_object(
      'page_path', page_path,
      'page_title', page_title,
      'count', count,
      'avg_time_on_page', avg_time_on_page
    )
  ) INTO result
  FROM (
    SELECT 
      page_path,
      page_title,
      COUNT(*) as count,
      AVG(EXTRACT(EPOCH FROM (
        COALESCE(
          LEAD(timestamp) OVER (PARTITION BY session_id ORDER BY timestamp),
          timestamp + INTERVAL '30 seconds'
        ) - timestamp
      ))) as avg_time_on_page
    FROM visitor_data 
    WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
    GROUP BY page_path, page_title
    ORDER BY count DESC
    LIMIT limit_count
  ) top_pages;
  
  RETURN COALESCE(result, '[]'::JSON);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get device breakdown
CREATE OR REPLACE FUNCTION get_device_breakdown(days_back INTEGER DEFAULT 30)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_agg(
    json_build_object(
      'device_type', device_type,
      'count', count,
      'percentage', percentage
    )
  ) INTO result
  FROM (
    SELECT 
      COALESCE(device_info->>'device_type', 'unknown') as device_type,
      COUNT(*) as count,
      ROUND((COUNT(*) * 100.0 / SUM(COUNT(*)) OVER ()), 2) as percentage
    FROM visitor_data 
    WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
    GROUP BY device_info->>'device_type'
    ORDER BY count DESC
  ) device_stats;
  
  RETURN COALESCE(result, '[]'::JSON);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to clean up old real-time visitor data
CREATE OR REPLACE FUNCTION cleanup_real_time_visitors()
RETURNS void AS $$
BEGIN
  DELETE FROM real_time_visitors 
  WHERE last_seen < NOW() - INTERVAL '10 minutes';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to update session_data automatically
CREATE OR REPLACE FUNCTION update_session_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update page views count
  INSERT INTO session_data (session_id, start_time, page_views, events)
  VALUES (NEW.session_id, NEW.timestamp, 1, 0)
  ON CONFLICT (session_id) 
  DO UPDATE SET 
    page_views = session_data.page_views + 1,
    updated_at = NOW();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for visitor_data
CREATE TRIGGER trigger_update_session_stats
  AFTER INSERT ON visitor_data
  FOR EACH ROW
  EXECUTE FUNCTION update_session_stats();

-- Create trigger to update event counts
CREATE OR REPLACE FUNCTION update_session_event_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE session_data 
  SET 
    events = events + 1,
    updated_at = NOW()
  WHERE session_id = NEW.session_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_session_event_count
  AFTER INSERT ON analytics_events
  FOR EACH ROW
  EXECUTE FUNCTION update_session_event_count();

-- Grant necessary permissions to anon role (for public access)
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT, SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon;

-- Create a scheduled job to clean up old real-time visitor data
-- Note: This requires the pg_cron extension which may not be available on all Supabase plans
-- You can alternatively run this manually or via a cron job from your application

-- SELECT cron.schedule(
--   'cleanup-real-time-visitors',
--   '*/5 * * * *',
--   'SELECT cleanup_real_time_visitors();'
-- );

-- Optional: Create materialized views for better dashboard performance
CREATE MATERIALIZED VIEW mv_daily_stats AS
SELECT 
  DATE_TRUNC('day', timestamp) as date,
  COUNT(*) as visits,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(DISTINCT SUBSTRING(ip_hash FROM 1 FOR 8)) as unique_visitors_approx
FROM visitor_data
WHERE timestamp >= NOW() - INTERVAL '1 year'
GROUP BY DATE_TRUNC('day', timestamp)
ORDER BY date;

-- Create index on materialized view
CREATE INDEX idx_mv_daily_stats_date ON mv_daily_stats (date);

-- Create a function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW mv_daily_stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample data for testing (optional - remove in production)
-- INSERT INTO visitor_data (page_path, page_title, referrer, user_agent, session_id, ip_hash, device_info)
-- VALUES 
--   ('/', 'Home - Portfolio', 'https://google.com', 'Mozilla/5.0...', 'session_123', 'hashed_ip_123', '{"device_type": "desktop", "browser_name": "Chrome"}'),
--   ('/projects', 'Projects - Portfolio', '/', 'Mozilla/5.0...', 'session_123', 'hashed_ip_123', '{"device_type": "desktop", "browser_name": "Chrome"}');

-- INSERT INTO analytics_events (event_name, event_data, session_id, page_path)
-- VALUES 
--   ('project_click', '{"project_name": "AI Recommender"}', 'session_123', '/projects'),
--   ('contact_form_submit', '{}', 'session_123', '/contact');

COMMENT ON TABLE analytics_events IS 'Stores all analytics events with flexible JSONB data';
COMMENT ON TABLE visitor_data IS 'Stores page view data with visitor information';
COMMENT ON TABLE session_data IS 'Aggregated session statistics';
COMMENT ON TABLE performance_metrics IS 'Web performance metrics for optimization';
COMMENT ON TABLE analytics_errors IS 'Error tracking for analytics system';
COMMENT ON TABLE ab_test_events IS 'A/B testing event data';
COMMENT ON TABLE real_time_visitors IS 'Real-time visitor tracking for live dashboard';

-- End of schema