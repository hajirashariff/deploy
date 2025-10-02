-- Complete sample data for BSM Platform
-- Copy and run this entire script in Supabase SQL Editor

-- Insert users first
INSERT INTO users (email, full_name, role, status) VALUES
('admin@bsmplatform.com', 'BSM Admin', 'admin', 'active'),
('support@bsmplatform.com', 'Support Agent', 'user', 'active'),
('manager@bsmplatform.com', 'Account Manager', 'manager', 'active');

-- Insert tickets
INSERT INTO tickets (ticket_number, title, description, status, priority, category) VALUES
('TKT-001234', 'Login Issues', 'Customer unable to access account dashboard - getting authentication error when trying to sign in', 'open', 'high', 'technical'),
('TKT-001233', 'Password Reset', 'User needs assistance with password recovery process - forgot password', 'in_progress', 'medium', 'account'),
('TKT-001232', 'Feature Request', 'Request to implement dark mode feature across the platform', 'resolved', 'low', 'enhancement'),
('TKT-001231', 'Billing Inquiry', 'Customer questioning monthly subscription charges - wants to understand pricing structure', 'open', 'medium', 'billing'),
('TKT-001230', 'System Performance', 'Application running slower than usual during peak hours (2-4 PM)', 'investigating', 'high', 'technical'),
('TKT-001229', 'Email Integration', 'Need help setting up email notifications for ticket updates', 'pending', 'medium', 'integration'),
('TKT-001228', 'User Account Lockout', 'Account locked due to multiple failed login attempts', 'resolved', 'medium', 'account');

-- Insert assets
INSERT INTO assets (name, type, status, description, location, vendor, serial_number, purchase_date) VALUES
('Company Server - Dell PowerEdge R750', 'server', 'active', 'Primary production server for web applications and database', 'Data Center A - Rack 12', 'Dell', 'SRV-202301001', '2023-01-15'),
('Office Laptop - MacBook Pro 16"', 'hardware', 'active', 'MacBook Pro for software development team - React development', 'Office Floor 2 - Dev Team', 'Apple', 'LAP-202306001', '2023-06-10'),
('Microsoft Office 365 License', 'software', 'active', 'Annual subscription for 50 users - includes Teams, SharePoint', 'Cloud Service', 'Microsoft', 'LIC-MS365-2023', '2023-03-01'),
('Network Switch Cisco Catalyst', 'network', 'active', 'Core network switch for office connectivity and VLAN management', 'IT Closet - Floor 1', 'Cisco', 'NET-CISCO-001', '2023-02-14'),
('Development Database Server', 'server', 'maintenance', 'MySQL database server for testing and development environments', 'Data Center B - Rack 5', 'Dell', 'SRV-DB-2023', '2023-04-20'),
('Wireless Access Points', 'network', 'active', 'Multiple WiFi access points for office wireless connectivity', 'Office - Various Floors', 'Ubiquiti', 'WAP-UNIFI-001', '2023-03-10'),
('Backup Storage Array', 'storage', 'active', 'Network attached storage for backups and file sharing', 'Data Center A - Rack 8', 'Synology', 'STOR-SYN-001', '2023-01-30'),
('Security Cameras', 'hardware', 'active', 'IP security camera system for office surveillance', 'Office Perimeter', 'Hikvision', 'CAM-HIK-001', '2023-05-05');

-- Insert accounts
INSERT INTO accounts (name, type, status, industry, contact_info) VALUES
('TechCorp Solutions', 'customer', 'active', 'Technology', '{"email": "contact@techcorp.com", "phone": "+1-555-0101", "address": "123 Tech Street, Silicon Valley"}'),
('Global Manufacturing Inc', 'customer', 'active', 'Manufacturing', '{"email": "info@globalmanuf.com", "phone": "+1-555-0102", "address": "456 Industrial Ave, Chicago"}'),
('StartupXYZ', 'customer', 'pending', 'Software', '{"email": "hello@startupxyz.com", "phone": "+1-555-0103", "address": "789 Startup Blvd, Austin"}'),
('Enterprise Partners', 'partner', 'active', 'Consulting', '{"email": "partnership@entpartners.com", "phone": "+1-555-0104", "address": "321 Business District, New York"}');

-- Insert knowledge base articles
INSERT INTO knowledge_base (title, content, excerpt, article_type, category, status, author_id) VALUES
('How to Reset Your Password', 'This comprehensive guide walks you through the step-by-step process of resetting your account password...', 'Learn how to reset your account password using the self-service portal.', 'tutorial', 'account_management', 'published', (SELECT id FROM users WHERE email = 'admin@bsmplatform.com')),
('System Maintenance Schedule', 'Our regular maintenance windows and what to expect during planned outages...', 'Information about our regular system maintenance windows and planned downtime.', 'article', 'system_info', 'published', (SELECT id FROM users WHERE email = 'admin@bsmplatform.com')),
('Troubleshooting Login Issues', 'Common login problems and their solutions...', 'Solutions for common login issues and authentication problems.', 'troubleshooting', 'technical_support', 'published', (SELECT id FROM users WHERE email = 'admin@bsmplatform.com')),
('Setting Up Email Notifications', 'Configure email notifications for ticket updates and system alerts...', 'Step-by-step guide to setting up email notifications.', 'guide', 'configuration', 'published', (SELECT id FROM users WHERE email = 'support@bsmplatform.com'));

-- Insert rules
INSERT INTO rules (name, description, category, condition_logic, action_logic, is_active) VALUES
('Auto-assign high priority tickets', 'Automatically assign high priority tickets to senior support staff', 'automation', '{"priority": "high"}', '{"assign_to": "senior_support", "notify": true}', true),
('Escalate overdue tickets', 'Move tickets to escalated status after 24 hours without response', 'automation', '{"hours_since_created": 24, "status": "open"}', '{"status": "escalated", "priority": "critical"}', true),
('Close resolved tickets', 'Automatically close tickets marked as resolved after 48 hours', 'automation', '{"status": "resolved", "hours_since_resolved": 48}', '{"status": "closed"}', false),
('Notify on critical issues', 'Send immediate notifications for critical system issues', 'notification', '{"priority": "critical"}', '{"alert": ["email", "slack"], "immediate": true}', true);

-- Insert workflows
INSERT INTO workflows (name, description, category, workflow_data, status, steps) VALUES
('New User Onboarding', 'Automated workflow for new user account setup and initial configuration', 'user_onboarding', '{"trigger": "new_user_registration"}', 'active', '{"steps": ["create_account", "send_welcome_email", "assign_permissions", "setup_dashboard"]}'),
('Ticket Resolution Process', 'Standard workflow for resolving support tickets efficiently', 'ticket_resolution', '{"trigger": "ticket_created"}', 'active', '{"steps": ["assign_ticket", "investigate_issue", "provide_solution", "close_ticket"]}'),
('Asset Maintenance Reminder', 'Workflow to schedule and track asset maintenance', 'asset_maintenance', '{"trigger": "maintenance_due"}', 'active', '{"steps": ["check_downtime", "schedule_maintenance", "execute_task", "update_records"]}'),
('Account Verification Process', 'Automated workflow for verifying new customer accounts', 'account_verification', '{"trigger": "account_created"}', 'active', '{"steps": ["verify_domain", "check_references", "approve_account", "setup_billing"]}');

-- Insert integrations
INSERT INTO integrations (name, integration_type, service_name, status, configuration) VALUES
('Slack Notifications', 'webhook', 'Slack', 'active', '{"channels": ["#support", "#alerts"], "username": "BSM Bot", "icon": "robot_face"}'),
('Microsoft Teams Integration', 'api', 'Microsoft Teams', 'active', '{"webhook_url": "encrypted_url", "notifications": ["tickets", "alerts"], "bot_name": "BSM Support"}'),
('Email Service - SendGrid', 'api', 'SendGrid', 'active', '{"api_key": "encrypted_key", "from_email": "support@bsmplatform.com", "templates": ["ticket_created", "ticket_resolved"]}'),
('CRM Integration - Salesforce', 'api', 'Salesforce', 'pending', '{"client_id": "encrypted_id", "instance_url": "company.salesforce.com", "sync_contacts": true}');

-- Update existing settings and add more
INSERT INTO settings (category, setting_key, setting_value, data_type) VALUES
('system', 'company_logo_url', '"https://example.com/logo.png"', 'string'),
('system', 'support_hours', '"24/7"', 'string'),
('system', 'max_file_upload_size', '10485760', 'number'),
('notifications', 'slack_webhook_url', '"https://hooks.slack.com/..."', 'string'),
('notifications', 'email_template', '"modern_blue"', 'string'),
('security', 'password_min_length', '8', 'number'),
('security', 'login_timeout_minutes', '30', 'number'),
('features', 'advanced_analytics', 'true', 'boolean'),
('features', 'custom_branding', 'false', 'boolean'),
('ui', 'default_theme', '"light"', 'string'),
('ui', 'sidebar_collapsed', 'false', 'boolean');

-- Show summary
SELECT 
  'Summary' as info,
  (SELECT COUNT(*) FROM users) as user_count,
  (SELECT COUNT(*) FROM tickets) as ticket_count,
  (SELECT COUNT(*) FROM assets) as asset_count,
  (SELECT COUNT(*) FROM accounts) as account_count,
  (SELECT COUNT(*) FROM knowledge_base) as kb_count,
  (SELECT COUNT(*) FROM rules) as rule_count,
  (SELECT COUNT(*) FROM workflows) as workflow_count,
  (SELECT COUNT(*) FROM integrations) as integration_count,
  (SELECT COUNT(*) FROM settings) as setting_count;
