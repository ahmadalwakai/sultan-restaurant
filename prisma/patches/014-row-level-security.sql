-- Sultan Restaurant - Row Level Security
-- Secure data access patterns (optional, for advanced deployments)

-- Note: RLS is disabled by default in this application
-- Enable if deploying with direct database access or multi-tenant setup

-- Example RLS policies (commented out by default)

/*
-- Enable RLS on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Customers can only see their own orders
CREATE POLICY orders_customer_policy ON orders
  FOR SELECT
  USING (user_id = current_setting('app.current_user_id')::uuid);

-- Admins can see all orders
CREATE POLICY orders_admin_policy ON orders
  FOR ALL
  USING (current_setting('app.is_admin')::boolean = true);

-- Enable RLS on bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Customers can only see their own bookings
CREATE POLICY bookings_customer_policy ON bookings
  FOR SELECT
  USING (user_id = current_setting('app.current_user_id')::uuid);

-- Admins can manage all bookings
CREATE POLICY bookings_admin_policy ON bookings
  FOR ALL
  USING (current_setting('app.is_admin')::boolean = true);
*/

-- Utility function to set application context
CREATE OR REPLACE FUNCTION set_app_context(user_id UUID, is_admin BOOLEAN)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_user_id', user_id::text, true);
  PERFORM set_config('app.is_admin', is_admin::text, true);
END;
$$ LANGUAGE plpgsql;

-- Grant SELECT on public data
GRANT SELECT ON v_active_menu TO PUBLIC;
GRANT SELECT ON v_approved_reviews TO PUBLIC;
