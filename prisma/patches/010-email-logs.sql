-- Sultan Restaurant - Email Logs
-- Track all sent emails

-- Email status enum
DO $$ BEGIN
  CREATE TYPE email_status AS ENUM ('PENDING', 'SENT', 'FAILED', 'BOUNCED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Email Logs
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Recipients
  to_email VARCHAR(255) NOT NULL,
  to_name VARCHAR(255),
  from_email VARCHAR(255),
  reply_to VARCHAR(255),
  
  -- Content
  subject VARCHAR(500) NOT NULL,
  template VARCHAR(100),
  body_preview TEXT,
  
  -- Status
  status email_status NOT NULL DEFAULT 'PENDING',
  error_message TEXT,
  
  -- Provider info
  provider VARCHAR(50),
  provider_message_id VARCHAR(255),
  
  -- Timing
  sent_at TIMESTAMP(3),
  opened_at TIMESTAMP(3),
  clicked_at TIMESTAMP(3),
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_to ON email_logs(to_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_created ON email_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_template ON email_logs(template);
