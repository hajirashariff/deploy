-- Fix Tickets Table - Add missing columns
-- Run this in Supabase SQL Editor

-- First, let's see what columns exist
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'tickets';

-- Add the missing ticket_number column
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS ticket_number VARCHAR(50) UNIQUE;

-- Update existing records with ticket numbers (if any exist)
UPDATE tickets 
SET ticket_number = 'TKT-' || LPAD(id::text, 6, '0') 
WHERE ticket_number IS NULL;

-- Now you can insert with ticket_number
-- Insert sample tickets with proper columns
INSERT INTO tickets (ticket_number, title, description, status, priority, category) VALUES
('TKT-001234', 'Login Issues', 'Customer unable to access account dashboard - getting authentication error', 'open', 'high', 'technical'),
('TKT-001233', 'Password Reset', 'User needs assistance with password recovery process', 'in_progress', 'medium', 'account'),
('TKT-001232', 'Feature Request', 'Request to implement dark mode feature across the platform', 'resolved', 'low', 'enhancement');
