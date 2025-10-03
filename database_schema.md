# BSM Platform Database Schema

## Architecture Overview

The BSM Platform uses a unified database schema that connects Admin and Customer portals seamlessly.

## Database Tables by Category

### 🔧 Admin Core Tables

#### Users Table (`users`)
- **Purpose**: Central user management for both admin and customer systems
- **Key Fields**: `id`, `email`, `full_name`, `role`, `status`
- **Connections**: Referenced by tickets, knowledge_base, chat_messages, workflows

#### Tickets Table (`tickets`)
- **Purpose**: Unified ticket management system
- **Key Fields**: `id`, `ticket_number`, `title`, `description`, `status`, `priority`, `category`
- **Connections**: 
  - `assigned_to` → `users.id`
  - `created_by` → `users.id`
  - Referenced by `chat_messages`

#### Knowledge Base (`knowledge_base`)
- **Purpose**: Help articles and documentation
- **Key Fields**: `id`, `title`, `content`, `category`, `status`, `author_id`
- **Connections**: `author_id` → `users.id`

#### Assets (`assets`)
- **Purpose**: Asset management and tracking
- **Key Fields**: `id`, `name`, `type`, `status`, `location`, `vendor`

#### Accounts (`accounts`)
- **Purpose**: Customer account management
- **Key Fields**: `id`, `name`, `type`, `status`, `industry`, `contact_info`

### 🛒 Customer Portal Tables

#### Customer Services (`customer_services`)
- **Purpose**: Service catalog for customers
- **Key Fields**: `id`, `name`, `category`, `description`, `price`, `duration_hours`, `status`
- **Connections**: Referenced by `customer_service_requests`

#### Customer Service Requests (`customer_service_requests`)
- **Purpose**: Customer service booking and tracking
- **Key Fields**: `id`, `customer_id`, `service_id`, `status`, `request_date`, `scheduled_date`
- **Connections**: 
  - `service_id` → `customer_services.id`
  - `rating_id` → `customer_ratings.id`

#### Customer Ratings (`customer_ratings`)
- **Purpose**: Customer feedback and ratings
- **Key Fields**: `id`, `customer_id`, `service_id`, `rating`, `review_text`, `categories`
- **Connections**: `service_id` → `customer_services.id`

## 🔗 Database Connections & Relationships

### Foreign Key Relationships

```sql
-- Customer Service Requests → Customer Services
customer_service_requests.service_id → customer_services.id

-- Customer Ratings → Customer Services  
customer_ratings.service_id → customer_services.id

-- Customer Service Requests → Customer Ratings (optional)
customer_service_requests.rating_id → customer_ratings.id

-- Tickets → Users (assignment)
tickets.assigned_to → users.id
tickets.created_by → users.id

-- Knowledge Base → Users (author)
knowledge_base.author_id → users.id

-- Chat Messages → Users & Tickets
chat_messages.sender_id → users.id
chat_messages.ticket_id → tickets.id

-- Workflows → Users (creator)
workflows.created_by → users.id
```

## 🎯 Admin Views (Bridging Tables)

### Unified Tickets View (`unified_tickets_view`)
- **Purpose**: Combines admin tickets + customer service requests into single view
- **Source**: `tickets` + `customer_service_requests` (via JOIN with `customer_services`)
- **Key Benefit**: Admin sees ALL tickets in one place

### Admin Customer Service Requests (`admin_customer_service_requests`)
- **Purpose**: Admin perspective of customer service requests
- **Source**: `customer_service_requests` + `customer_services`
- **Key Fields**: Includes service details, pricing, timing metrics

### Admin Customer Ratings (`admin_customer_ratings`)
- **Purpose**: Admin view of customer feedback
- **Source**: `customer_ratings` + `customer_services`
- **Key Fields**: Aggregated ratings, satisfaction metrics

### Admin Customer Summary (`admin_customer_summary`)
- **Purpose**: Overview metrics for admin dashboard
- **Source**: Aggregated data from all customer tables
- **Key Fields**: Total services, requests, ratings, revenue estimates

## 🔄 Data Flow Between Systems

```
Customer Portal Actions → Database Updates → Admin Portal Views

1. Customer creates service request
   ↓
   INSERT INTO customer_service_requests
   ↓  
   Admin sees in admin_customer_service_requests view
   ↓
   Creates ticket in unified_tickets_view

2. Customer submits rating
   ↓
   INSERT INTO customer_ratings
   ↓
   Admin sees aggregated data in admin_customer_ratings view
   ↓
   Updates admin dashboard metrics

3. Admin creates ticket
   ↓
   INSERT INTO tickets
   ↓
   Visible in unified_tickets_view alongside customer tickets
```

## 📊 Key Data Counts

- **Users**: Multiple roles (admin, customer, support)
- **Tickets**: 18+ total (admin + customer tickets)
- **Customer Services**: 16 available services
- **Service Requests**: 9 customer service requests
- **Ratings**: 6 customer ratings (avg 4.33/5)
- **Knowledge Base**: 25 help articles
- **Unified Tickets**: 27+ combined tickets

## 🌐 API Endpoints

### Admin APIs
- `/api/admin/customer-insights` - Cross-system data for admin dashboard
- `/api/admin/service-management` - Service catalog management
- `/api/admin/customer-feedback` - Customer ratings and feedback

### Customer APIs  
- `/api/customer/services` - Service catalog browsing
- `/api/customer/tickets` - Customer ticket management
- `/api/customer/ratings` - Rating submission

### Unified APIs
- `/api/test-supabase` - Database connection verification

## 🔍 Schema Verification Commands

```sql
-- Check all foreign key relationships
SELECT tc.table_name, tc.constraint_name, kcu.column_name, 
       ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';

-- Verify admin-customer connections
SELECT * FROM admin_customer_summary;
SELECT COUNT(*) FROM unified_tickets_view;
SELECT COUNT(*) FROM admin_customer_service_requests;
```

## 📝 Summary

The BSM Platform uses a **unified database architecture** where:

1. **Shared Base Tables**: `users`, `tickets` serve both admin and customer systems
2. **Customer-Specific Tables**: Focus on services, ratings, and requests
3. **Admin Views**: Provide cross-system insights and unified management
4. **Real-time Sync**: Changes in customer portal immediately appear in admin portal
5. **Single Source of Truth**: All data stored in one database with clear relationships

This architecture ensures seamless data flow between admin and customer portals while maintaining data integrity and providing comprehensive visibility across the entire platform.

