-- Admin Portal Database Schema
-- Created for BSM Platform Admin Portal Tabs

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create Assets table for Asset Management
CREATE TABLE assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- server, software, hardware, network
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, maintenance, decommissioned
    description TEXT,
    location VARCHAR(255),
    assigned_to UUID REFERENCES users(id),
    vendor VARCHAR(255),
    model VARCHAR(255),
    serial_number VARCHAR(255) UNIQUE,
    purchase_date DATE,
    warranty_expiry DATE,
    maintenance_schedule JSONB,
    tags TEXT[],
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Create Tickets table for Ticket Management
CREATE TABLE tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open', -- open, in_progress, resolved, closed, cancelled
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, critical
    category VARCHAR(100), -- technical, billing, support, feature_request, bug
    subcategory VARCHAR(100),
    assigned_to UUID REFERENCES users(id),
    assigned_by UUID REFERENCES users(id),
    customer_id UUID REFERENCES accounts(id),
    due_date TIMESTAMP WITH TIME ZONE,
    resolution TEXT,
    resolution_date TIMESTAMP WITH TIME ZONE,
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    tags TEXT[],
    attachments JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Create Rules table for Rules Engine
CREATE TABLE rules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- automation, validation, business_logic, security
    condition_logic JSONB NOT NULL, -- Store rule conditions
    action_logic JSONB NOT NULL, -- Store rule actions
    priority INTEGER DEFAULT 100, -- Execution priority
    is_active BOOLEAN DEFAULT true,
    is_critical BOOLEAN DEFAULT false,
    execution_frequency VARCHAR(50) DEFAULT 'on_event', -- on_event, scheduled, continuous
    schedule_cron VARCHAR(100), -- Cron expression for scheduled rules
    last_executed TIMESTAMP WITH TIME ZONE,
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Create Workflows table for Workflow Engine  
CREATE TABLE workflows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    workflow_data JSONB NOT NULL, -- Store workflow configuration
    status VARCHAR(50) DEFAULT 'draft', -- draft, active, archived, template
    category VARCHAR(100), -- ticket_resolution, user_onboarding, approval_process
    version INTEGER DEFAULT 1,
    is_template BOOLEAN DEFAULT false,
    template_category VARCHAR(100),
    trigger_events TEXT[], -- event types that trigger this workflow
    conditions JSONB, -- Workflow trigger conditions
    steps JSONB NOT NULL, -- Workflow steps configuration
    variables JSONB, -- Workflow variables
    notifications JSONB, -- Notification settings
    autostart BOOLEAN DEFAULT false,
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    average_execution_time INTEGER, -- in milliseconds
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Create Analytics Reports table
CREATE TABLE analytics_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    report_type VARCHAR(100) NOT NULL, -- dashboard, scheduled_report, adhoc_query
    category VARCHAR(100), -- performance, usage, financial, operational
    query_data JSONB NOT NULL, -- Store report configuration
    schedule VARCHAR(100), -- Cron expression for scheduled reports
    visualization_config JSONB, -- Chart/graph configuration
    filters JSONB, -- Report filters
    custom_fields JSONB,
    recipient_emails TEXT[],
    status VARCHAR(50) DEFAULT 'active',
    last_generated TIMESTAMP WITH TIME ZONE,
    generation_count INTEGER DEFAULT 0,
    file_url TEXT,
    file_size INTEGER,
    is_public BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Create Accounts table for Account Management
CREATE TABLE accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) DEFAULT 'customer', -- customer, partner, vendor, supplier
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended, pending
    industry VARCHAR(100),
    size_category VARCHAR(50), -- small, medium, large, enterprise
    website VARCHAR(255),
    description TEXT,
    billing_address JSONB,
    shipping_address JSONB,
    contact_info JSONB NOT NULL, -- email, phone, fax
    billing_info JSONB, -- payment terms, currency, tax_id
    contract_details JSONB, -- start_date, end_date, contract_type
    primary_contact UUID REFERENCES users(id),
    secondary_contacts UUID[],
    account_manager UUID REFERENCES users(id),
    custom_fields JSONB,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Create Users table for User Management (enhanced existing)
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user', -- admin, manager, user, guest
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended, pending
    phone VARCHAR(20),
    avatar_url TEXT,
    department VARCHAR(100),
    position VARCHAR(100),
    manager_id UUID REFERENCES users(id),
    last_login TIMESTAMP WITH TIME ZONE,
    login_attempts INTEGER DEFAULT 0,
    password_changed_at TIMESTAMP WITH TIME ZONE,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    two_factor_enabled BOOLEAN DEFAULT false,
    permissions JSONB, -- Role-based permissions
    preferences JSONB, -- User preferences
    custom_fields JSONB,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Knowledge Base table
CREATE TABLE knowledge_base (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT, -- Short description/summary
    article_type VARCHAR(100) DEFAULT 'article', -- article, faq, tutorial, guide
    category VARCHAR(100),
    subcategory VARCHAR(100),
    tags TEXT[],
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    visibility VARCHAR(50) DEFAULT 'public', -- public, private, restricted
    featured BOOLEAN DEFAULT false,
    author_id UUID REFERENCES users(id) NOT NULL,
    reviewer_id UUID REFERENCES users(id),
    review_date TIMESTAMP WITH TIME ZONE,
    published_date TIMESTAMP WITH TIME ZONE,
    viewed_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    not_helpful_count INTEGER DEFAULT 0,
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    attachments JSONB,
    metadata JSONB,
    seo_data JSONB, -- SEO metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- Create Integrations table
CREATE TABLE integrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    integration_type VARCHAR(100) NOT NULL, -- api, webhook, sftp, email, dashboard
    service_name VARCHAR(100) NOT NULL, -- slack, teams, zapier, shopify, etc.
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, error, needs_setup
    configuration JSONB NOT NULL, -- Store encrypted configuration
    credentials JSONB, -- Store encrypted credentials
    webhook_url TEXT,
    api_endpoints JSONB,
    sync_settings JSONB,
    authentication_method VARCHAR(100), -- api_key, oauth, basic_auth, bearer_token
    rate_limit INTEGER, -- requests per minute
    last_sync TIMESTAMP WITH TIME ZONE,
    sync_frequency VARCHAR(100), -- real_time, hourly, daily, weekly
    error_count INTEGER DEFAULT 0,
    last_error TEXT,
    last_error_at TIMESTAMP WITH TIME ZONE,
    health_status VARCHAR(50) DEFAULT 'healthy', -- healthy, degraded, error
    monitoring_config JSONB,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Create Settings table
CREATE TABLE settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- system, user_preferences, integrations, notifications
    setting_key VARCHAR(255) NOT NULL,
    setting_value JSONB NOT NULL,
    data_type VARCHAR(50) NOT NULL, -- string, number, boolean, array, object
    description TEXT,
    is_system_setting BOOLEAN DEFAULT false,
    is_encrypted BOOLEAN DEFAULT false,
    validation_rules JSONB,
    default_value JSONB,
    options JSONB, -- Available options for select/dropdown settings
    depends_on TEXT[], -- Other settings this depends on
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_as TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    UNIQUE(category, setting_key)
);

-- Create indexes for better performance
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_assigned_to ON assets(assigned_to);
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_assets_created_at ON assets(created_at);

CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_tickets_customer_id ON tickets(customer_id);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_tickets_ticket_number ON tickets(ticket_number);

CREATE INDEX idx_rules_category ON rules(category);
CREATE INDEX idx_rules_is_active ON rules(is_active);
CREATE INDEX idx_rules_priority ON rules(priority);

CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflows_category ON workflows(category);
CREATE INDEX idx_workflows_is_template ON workflows(is_template);

CREATE INDEX idx_reports_type ON analytics_reports(report_type);
CREATE INDEX idx_reports_category ON analytics_reports(category);
CREATE INDEX idx_reports_status ON analytics_reports(status);

CREATE INDEX idx_accounts_type ON accounts(type);
CREATE INDEX idx_accounts_status ON accounts(status);
CREATE INDEX idx_accounts_primary_contact ON accounts(primary_contact);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_department ON users(department);
CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_kb_category ON knowledge_base(category);
CREATE INDEX idx_kb_status ON knowledge_base(status);
CREATE INDEX idx_kb_featured ON knowledge_base(featured);
CREATE INDEX idx_kb_author_id ON knowledge_base(author_id);

CREATE INDEX idx_integrations_type ON integrations(integration_type!");
CREATE INDEX idx_integrations_status ON integrations(status);
CREATE INDEX idx_integrations_service_name ON integrations(service_name);

CREATE INDEX idx_settings_category ON settings(category);

-- Create updated_at triggers for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_rules_updated_at BEFORE UPDATE ON rules FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON analytics_reports FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_kb_updated_at BEFORE UPDATE ON knowledge_base FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security (RLS) for sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (you can refine these based on your security requirements)

-- Users can only see their own data unless they are admin
CREATE POLICY users_select_policy ON users 
    FOR SELECT USING (
        auth.uid() = id OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Accounts - only admins can see all accounts, others see only their own
CREATE POLICY accounts_select_policy ON accounts
    FOR SELECT USING (
        EXISTS (SELECT ~ FROM users WHERE id = auth.uid() AND role = 'admin') OR
        primary_contact = auth.uid()
    )};

-- Analytics reports - based on visibility settings
CREATE POLICY reports_select_policy ON analytics_reports
    FOR SELECT USING (
        is_public = true OR 
        EXISTS (SELECT ~ FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager')) OR
        created_by = auth.uid()
    );

-- Insert sample data for testing
INSERT INTO users (email, full_name, role, status) VALUES
    ('admin@bsmplatform.com', 'BSM Admin', 'admin', 'active'),
    ('manager@bsmplatform.com', 'Account Manager', 'manager', 'active'),
    ('support@bsmplatform.com', 'Support User', 'user', 'active');

INSERT INTO accounts (name, type, status, contact_info) VALUES
    ('Demo Enterprise', 'customer', 'active', '{"email": "contact@demo-enterprise.com", "phone": "+1-555-0123"}'),
    ('Partner Corp', 'partner', 'active', '{"email": "info@partner-corp.com", "phone": "+1-555-0124"}');

INSERT INTO settings (category, setting_key, setting_value, data_type, is_system_setting) VALUES
    ('system', 'app_name', '"BSM Platform"', 'string', true),
    ('system', 'max_file_size', '10485760', 'number', true),
    ('notifications', 'email_enabled', 'true', 'boolean', false),
    ('notifications', 'default_language', '"en"', 'string', false);

COMMIT;
