-- Sultan Restaurant - Site Settings
-- Configuration and settings tables

-- Site Settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'string',
  category VARCHAR(100) DEFAULT 'general',
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Opening Hours
CREATE TABLE IF NOT EXISTS opening_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  is_closed BOOLEAN DEFAULT false,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(day_of_week)
);

-- SEO Settings
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_identifier VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  keywords TEXT[],
  og_image TEXT,
  canonical_url TEXT,
  no_index BOOLEAN DEFAULT false,
  structured_data JSONB,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON site_settings(category);
CREATE INDEX IF NOT EXISTS idx_seo_page ON seo_settings(page_identifier);
