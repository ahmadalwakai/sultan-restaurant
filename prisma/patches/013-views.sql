-- Sultan Restaurant - Database Views
-- Commonly used query shortcuts

-- Active menu items with category info
CREATE OR REPLACE VIEW v_active_menu AS
SELECT 
  mi.id,
  mi.name,
  mi.slug,
  mi.description,
  mi.price,
  mi.image,
  mi.is_popular,
  mi.is_vegetarian,
  mi.is_vegan,
  mi.is_spicy,
  mi.spice_level,
  mi.allergens,
  c.id AS category_id,
  c.name AS category_name,
  c.slug AS category_slug
FROM menu_items mi
JOIN categories c ON mi.category_id = c.id
WHERE mi.is_available = true AND c.is_active = true
ORDER BY c.sort_order, mi.sort_order;

-- Today's orders summary
CREATE OR REPLACE VIEW v_today_orders AS
SELECT 
  o.id,
  o.order_number,
  o.customer_name,
  o.order_type,
  o.status,
  o.total,
  o.payment_status,
  o.created_at,
  COUNT(oi.id) AS item_count
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE DATE(o.created_at) = CURRENT_DATE
GROUP BY o.id
ORDER BY o.created_at DESC;

-- Pending bookings for today
CREATE OR REPLACE VIEW v_today_bookings AS
SELECT 
  id,
  booking_reference,
  customer_name,
  customer_phone,
  date,
  time,
  party_size,
  status,
  special_requests,
  table_number
FROM bookings
WHERE date = CURRENT_DATE
  AND status IN ('PENDING', 'CONFIRMED')
ORDER BY time;

-- Approved reviews
CREATE OR REPLACE VIEW v_approved_reviews AS
SELECT 
  id,
  customer_name,
  rating,
  title,
  comment,
  admin_response,
  is_featured,
  created_at
FROM reviews
WHERE status = 'APPROVED'
ORDER BY is_featured DESC, created_at DESC;

-- Dashboard statistics
CREATE OR REPLACE VIEW v_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE) AS orders_today,
  (SELECT COALESCE(SUM(total), 0) FROM orders WHERE DATE(created_at) = CURRENT_DATE AND payment_status = 'PAID') AS revenue_today,
  (SELECT COUNT(*) FROM bookings WHERE date = CURRENT_DATE AND status IN ('PENDING', 'CONFIRMED')) AS bookings_today,
  (SELECT COUNT(*) FROM contact_messages WHERE status = 'NEW') AS unread_messages,
  (SELECT COUNT(*) FROM reviews WHERE status = 'PENDING') AS pending_reviews;
