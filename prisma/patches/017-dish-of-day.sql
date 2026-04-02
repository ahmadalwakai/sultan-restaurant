-- Sultan Restaurant - Dish of the Day
-- Daily featured dish system

CREATE TABLE IF NOT EXISTS dish_of_day (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  discount_price DECIMAL(10, 2),
  reason TEXT,
  date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date)
);

CREATE INDEX IF NOT EXISTS idx_dish_of_day_date ON dish_of_day(date);
CREATE INDEX IF NOT EXISTS idx_dish_of_day_active ON dish_of_day(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_dish_of_day_menu_item ON dish_of_day(menu_item_id);
