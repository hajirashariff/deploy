-- Sample data for testing admin portal functionality
-- Copy and run this in Supabase SQL Editor

-- Insert sample assets
INSERT INTO assets (name, type, status, description, location, vendor, serial_number, purchase_date) VALUES
('Company Server - Dell PowerEdge R750', 'server', 'active', 'Primary production server for web applications', 'Data Center A - Rack 12', 'Dell', 'SRV-202301001', '2023-01-15'),
('Office Laptop - MacBook Pro 16"', 'hardware', 'active', 'MacBook Pro for software development team', 'Office Floor 2 - Dev Team', 'Apple', 'LAP-202306001', '2023-06-10'),
('Microsoft Office 365 License', 'software', 'active', 'Annual subscription for 50 users', 'Cloud Service', 'Microsoft', 'LIC-MS365-2023', '2023-03-01'),
('Network Switch Cisco Catalyst', 'network', 'active', 'Core network switch for office connectivity', 'IT Closet - Floor 1', 'Cisco', 'NET-CISCO-001', '2023-02-14'),
('Development Database Server', 'server', 'maintenance', 'MySQL database server for testing', 'Data Center B - Rack 5', 'Dell', 'SRV-DB-2023', '2023-04-20');

-- Insert sample tickets
INSERT INTO tickets (ticket_number, title, description, status, priority, category, assigned_to, customer_id) VALUES
('TKT-001234', 'Login Issues', 'Customer unable to access account dashboard - getting authentication error', 'open', 'high', 'technical', null, null),
('TKT-001233', 'Password Reset', 'User needs assistance with password recovery process', 'in_progress', 'medium', 'account', null, null),
('TKT-001232', 'Feature Request', 'Request to implement dark mode feature across the platform', 'resolved', 'low', 'enhancement', null, null),
('TKT-001231', 'Billing Inquiry', 'Customer questioning monthly subscription charges', 'open', 'medium', 'billing', null, null),
('TKT-001230', 'System Performance', 'Application running slower than usual during peak hours', 'investigating', 'high', 'technical', null, null);

-- Insert sample rules
INSERT INTO rules (name, description, category, condition_logic, action_logic, is_active) VALUES
('Auto-assign high priority tickets', 'Automatically assign high priority tickets to senior support staff', 'automation', '{"priority": "high"}', '{"assign_to": "senior_support", "notify": true}', true),
('Escalate overdue tickets', 'Move tickets to escalated status after 24 hours without response', 'automation', '{"hours_since_created": 24, "status": "open"}', '{"status": "escalated", "priority": "critical"}', true),
('Close resolved tickets', 'Automatically close tickets marked as resolved after 48 hours', 'automation', '{"status": "resolved", "hours_since_resolved": 48}', '{"status": "closed"}', false);

-- Insert sample workflows
INSERT INTO workflows (name, description, category, workflow_data, status, steps) VALUES
('New User Onboarding', 'Automated workflow for new user account setup and initial configuration', 'user_onboarding', '{"trigger": "new_user_registration"}', 'active', '{"steps": ["create_account", "send_welcome_email", "assign_permissions", "setup_dashboard"]}'),
('Ticket Resolution Process', 'Standard workflow for resolving support tickets efficiently', 'ticket_resolution', '{"trigger": "ticket_created"}', 'active', '{"steps": ["assign_ticket", "investigate_issue", "provide_solution", "close_ticket"]}'),
('Asset Maintenance Reminder', 'Workflow to schedule and track asset maintenance schedules', 'asset_maintenance', '{"trigger": "maintenance_due"}', 'active', '{"steps": ["check_downtime", "schedule_maintenance", "execute_task", "update_records"]}');

-- Insert sample knowledge base articles
INSERT INTO knowledge_base (title, content, excerpt, article_type, category, status, author_id) VALUES
('How to Reset Your Password', 'This guide walks you through the step-by-step process of resetting your account password...', 'Learn how to reset your account password using the self-service portal.', 'tutorial', 'account_management', 'published', null),
('System Maintenance Schedule', 'Regular maintenance windows and what to expect during planned outages...', 'Information about our regular system maintenance windows and planned downtime.', 'article', 'system_info', 'published', null),
('Troubleshooting Login Issues', 'Common login problems and their solutions...', 'Solutions for common login issues and authentication problems.', 'troubleshooting', 'technical_support', 'published', null);

-- Insert sample integrations
INSERT INTO integrations (name, integration_type, service_name, status, configuration, service_name) VALUES
('Slack Notifications', 'webhook', 'Slack', 'active', '{"channels": ["#support", "#alerts"], "username": "BSM Bot"}', 'Slack'),
('Microsoft Teams', 'api', 'Microsoft Teams', 'active', '{"webhook_url": "https://hooks.teams.com/...", "notifications": ["tickets", "alerts"]}', 'Teams'),
('Email Service', 'api', 'SendGrid', 'active', '{"api_key": "encrypted_key", "from_email": "support@bsmplatform.com"}', 'SendGrid');

-- Update settings with more comprehensive configuration
UPDATE settings SET setting_value = '"BSM Administrative Portal"' WHERE category = 'system' AND setting_key = 'app_name';

INSERT INTO settings (category, setting_key, setting_value, data_type) VALUES
('system', 'company_name', '"Business Service Management Platform"', 'string'),
('system', 'support_email', '"support@bsmplatform.com"', 'string'),
('system', 'maintenance_mode', 'false', 'boolean'),
('notifications', 'slack_enabled', 'true', 'boolean'),
('notifications', 'email_enabled', 'true', 'boolean'),
('notifications', 'teams_enabled', 'true', 'boolean'),
('security', 'session_timeout', '3600', 'number'),
('security', 'max_login_attempts', '5', 'number'),
('features', 'dark_mode_enabled', 'true', 'boolean'),
('features', 'analytics_enabled', 'true', 'boolean');
