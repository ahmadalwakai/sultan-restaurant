-- Sultan Restaurant - Contact Messages
-- Customer inquiries

-- Message status enum
DO $$ BEGIN
  CREATE TYPE message_status AS ENUM ('NEW', 'READ', 'REPLIED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status message_status NOT NULL DEFAULT 'NEW',
  admin_notes TEXT,
  replied_at TIMESTAMP(3),
  replied_by UUID REFERENCES admins(id),
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages(created_at DESC);
