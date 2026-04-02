-- Sultan Restaurant - Performance Indexes
-- Additional indexes for query optimization

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_status_date 
  ON orders(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_user_status 
  ON orders(user_id, status) WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bookings_date_status 
  ON bookings(date, status);

CREATE INDEX IF NOT EXISTS idx_menu_items_category_available 
  ON menu_items(category_id, is_available) WHERE is_available = true;

-- Partial indexes for active records
CREATE INDEX IF NOT EXISTS idx_categories_active 
  ON categories(sort_order) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_offers_active_dates 
  ON offers(valid_from, valid_until) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_coupons_active_dates 
  ON coupons(valid_from, valid_until) WHERE is_active = true;

-- BRIN indexes for time-series data
CREATE INDEX IF NOT EXISTS idx_orders_created_brin 
  ON orders USING BRIN(created_at);

CREATE INDEX IF NOT EXISTS idx_email_logs_created_brin 
  ON email_logs USING BRIN(created_at);

-- Trigram indexes for fuzzy search (requires pg_trgm extension)
CREATE INDEX IF NOT EXISTS idx_menu_items_name_trgm 
  ON menu_items USING GIN(name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_customers_name_trgm 
  ON orders USING GIN(customer_name gin_trgm_ops);

-- Analyze tables after index creation
ANALYZE categories;
ANALYZE menu_items;
ANALYZE orders;
ANALYZE order_items;
ANALYZE bookings;
ANALYZE reviews;
ANALYZE offers;
ANALYZE coupons;
