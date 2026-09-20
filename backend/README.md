# MediFlow AI - Backend API

> **Phase 2**: Backend Foundation with Supabase (PostgreSQL), Express, and Clerk Authentication

AI-powered hospital queue and patient workflow coordination platform - Backend REST API

## 🏗️ Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL) with `@supabase/supabase-js`
- **Authentication:** Clerk (`@clerk/express`)
- **Environment:** dotenv
- **CORS:** cors middleware

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js           # Supabase client & health ping
│   ├── db/
│   │   └── schema.sql            # PostgreSQL database schema
│   ├── controllers/
│   │   ├── healthController.js   # Health check endpoint
│   │   └── userController.js     # User profile and sync
│   ├── routes/
│   │   ├── healthRoutes.js       # Health API routes
│   │   └── userRoutes.js         # User API routes
│   ├── middleware/
│   │   ├── authMiddleware.js     # Clerk token verification & user lookup
│   │   └── errorMiddleware.js    # Error handling & Postgres error mappings
│   ├── services/                 # Business logic (future)
│   ├── utils/                    # Helper functions (future)
│   └── server.js                 # Main server entry point
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ installed
- **Supabase project** (cloud or local)
- Clerk account for authentication

### Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up database schema:**
   - Open your [Supabase Dashboard](https://supabase.com/dashboard)
   - Go to the **SQL Editor**
   - Execute the SQL statements from [`src/db/schema.sql`](./src/db/schema.sql)

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Required environment variables:
- `PORT` - Server port (default: 5000)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SECRET_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) - Supabase service role key
- `SUPABASE_PUBLISHABLE_KEY` - Supabase publishable/anon key
- `CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)

4. **Start the development server:**
```bash
npm run dev
```

You should see:
```
═══════════════════════════════════════════════════════════
🚀 MediFlow AI Backend Server
═══════════════════════════════════════════════════════════
📡 Server running on port 5000
🌍 Environment: development
🗄️  Database:    Supabase (PostgreSQL)
🔗 Health Check: http://localhost:5000/api/health
═══════════════════════════════════════════════════════════
```

## 📡 API Endpoints

### Health Check

**GET** `/api/health`
- **Access:** Public
- **Description:** Verify server and Supabase database status

**Response:**
```json
{
  "success": true,
  "message": "MediFlow AI backend is running",
  "timestamp": "2026-09-20T17:12:44.000Z",
  "status": {
    "server": "online",
    "database": "connected"
  },
  "version": "2.0.0",
  "environment": "development"
}
```

### User Management

**POST** `/api/users/sync`
- **Access:** Public / Frontend
- **Description:** Sync authenticated Clerk user profile into Supabase `users` table
- **Body:** `{ "clerkId": "...", "email": "...", "name": "...", "role": "patient" }`

**GET** `/api/users/me`
- **Access:** Private (requires Clerk authentication Bearer token)
- **Description:** Get profile of authenticated user

**PUT** `/api/users/me`
- **Access:** Private (requires Clerk authentication)
- **Description:** Update authenticated user profile (`name`, `phone`)

## 🔐 Authentication System

1. **Frontend** authenticates user with Clerk.
2. **Frontend** calls `/api/users/sync` to persist user in Supabase.
3. **Subsequent API requests** send Clerk session token in `Authorization: Bearer <token>`.
4. **Backend** verifies session via `@clerk/express` middleware and attaches DB record to `req.user`.

## 🗄️ Database Schema (`public.users`)

- `id` (UUID, Primary Key)
- `clerk_user_id` (TEXT, Unique, Indexed)
- `full_name` (TEXT)
- `email` (TEXT, Unique)
- `phone` (TEXT)
- `role` (TEXT: `patient`, `doctor`, `staff`, `admin`)
- `status` (TEXT: `active`, `inactive`, `suspended`)
- `avatar_url` (TEXT)
- `metadata` (JSONB)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)
