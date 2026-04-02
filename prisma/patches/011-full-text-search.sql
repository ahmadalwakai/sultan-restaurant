-- Sultan Restaurant - Full Text Search
-- Enable efficient text search across menu

-- Create text search configuration for menu
CREATE TEXT SEARCH CONFIGURATION IF NOT EXISTS menu_search (COPY = english);

-- Add search vector column to menu_items
ALTER TABLE menu_items 
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Update existing rows
UPDATE menu_items SET 
  search_vector = to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''));

-- Create GIN index for fast search
CREATE INDEX IF NOT EXISTS idx_menu_items_search 
  ON menu_items USING GIN(search_vector);

-- Trigger to auto-update search vector
CREATE OR REPLACE FUNCTION menu_items_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', coalesce(NEW.name, '') || ' ' || coalesce(NEW.description, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS menu_items_search_update ON menu_items;
CREATE TRIGGER menu_items_search_update
  BEFORE INSERT OR UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION menu_items_search_trigger();

-- Useful search function
CREATE OR REPLACE FUNCTION search_menu(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  category_id UUID,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    mi.id,
    mi.name,
    mi.description,
    mi.price,
    mi.category_id,
    ts_rank(mi.search_vector, plainto_tsquery('english', search_query)) AS rank
  FROM menu_items mi
  WHERE mi.search_vector @@ plainto_tsquery('english', search_query)
    AND mi.is_available = true
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;
