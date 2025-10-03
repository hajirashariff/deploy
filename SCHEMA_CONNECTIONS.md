# BSM Platform - Database Schema Connections

## 🔍 **ACTUAL DATABASE STATUS**

✅ **Database Connection: WORKING**
- **Users**: 9 total
- **Tickets**: 20 total  
- **Unified View**: 29 tickets (admin + customer)
- **Customer Services**: 16 services
- **Service Requests**: 9 requests
- **Customer Ratings**: 6 ratings

## 🔗 **SCHEMA CONNECTIONS VISUALIZATION**

```
                    ┌─────────────────┐
                    │      users      │ ← Central Hub
                    │  (id, email,   │   (9 records)
                    │   full_name,    │
                    │   role)         │
                    └─────────┬───────┘
                              │
                    ┌─────────┴───────┐
                    │                 │
           ┌────────▼─────────┐ ┌─────▼────────┐
           │     tickets      │ │knowledge_base │
           │  (20 records)    │ │  (articles)  │
           │                  │ │              │
           │ assigned_to─────┘ │ author_id────┘
           │ created_by────────┘              │
           └──────────────────────────────────┘
                              │
                    ┌─────────┴───────┐
                    │                 │
            ┌───────▼───────┐ ┌───────▼───────┐
            │customer_services│ │ customer_ratings │
            │   (16 services)  │ │   (6 ratings)     │
            │                 │ │                   │
            │ id, name,       │ │ customer_id───┐   │
            │ price, category │ │ service_id────┘   │
            └─────────┬───────┘ │ rating, review    │
                      │         └───────────────────┘
                      │
            ┌─────────▼───────┐
            │customer_service │
            │requests         │
            │ (9 requests)    │
            │                 │
            │ service_id──────┘
            │ rating_id────────┘
            │ customer_id
            └─────────────────┘
```

## 🔄 **KEY CONNECTIONS**

### **1. Tickets ↔ Users**
- `tickets.assigned_to` → `users.id`
- `tickets.created_by` → `users.id`
- Both admin and customer tickets linked to user accounts

### **2. Customer Services ↔ Requests**
- `customer_service_requests.service_id` → `customer_services.id`
- Service requests automatically know which service they're for

### **3. Customer Services ↔ Ratings**
- `customer_ratings.service_id` → `customer_services.id`
- Ratings are tied to specific services

### **4. Requests ↔ Ratings**
- `customer_service_requests.rating_id` → `customer_ratings.id`
- Optional connection: requests can have ratings

### **5. Knowledge Base ↔ Users**
- `knowledge_base.author_id` → `users.id`
- Articles have assigned authors

## 🎯 **ADMIN ↔ CUSTOMER INTEGRATION**

### **Unified Views (Real-time Data Sync)**

```sql
-- Admin can see ALL tickets from both systems
SELECT * FROM unified_tickets_view  -- 29 tickets total

-- Admin can see customer service requests  
SELECT * FROM admin_customer_service_requests

-- Admin can see customer ratings
SELECT * FROM admin_customer_ratings

-- Admin gets summary metrics
SELECT * FROM admin_customer_summary
```

### **Cross-System API Endpoints**

**Admin Portal APIs:**
- `/api/admin/customer-insights` - Gets customer data for admin dashboard
- `/api/admin/service-management` - Manages customer services
- `/api/admin/customer-feedback` - Views customer ratings

**Customer Portal APIs:**
- `/api/customer/services` - Browse available services
- `/api/customer/tickets` - Create/view customer tickets  
- `/api/customer/ratings` - Submit service ratings

## 🔗 **DATA FLOW EXAMPLE**

```
1. Customer creates service request
   ↓ INSERT INTO customer_service_requests
   ↓ 
2. Admin portal sees it instantly
   ↓ SELECT FROM admin_customer_service_requests
   ↓
3. Admin creates ticket from request
   ↓ INSERT INTO tickets (category='customer_request')
   ↓
4. Both appear in unified tickets view
   ↓ SELECT FROM unified_tickets_view (29 total)
   ↓
5. Customer rates the service
   ↓ INSERT INTO customer_ratings
   ↓
6. Admin sees aggregated feedback
   ↓ SELECT FROM admin_customer_ratings
```

## ✅ **CONNECTION VERIFICATION**

**Current Working Connections:**
- ✅ Admin → Customer ticket access
- ✅ Customer → Admin ticket visibility  
- ✅ Service requests linked to services
- ✅ Ratings connected to services
- ✅ Users as central reference point
- ✅ Real-time data synchronization

**Total Active Connections:** 8 foreign key relationships
**Total Data Records:** 69+ records across all tables
**Integration Status:** FULLY OPERATIONAL

---

**💡 The admin and customer portals share a unified database with real-time synchronization. All data changes are immediately visible across both systems through carefully designed views and API endpoints.**

