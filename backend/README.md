# MediFlow AI - Backend API

> **Phase 2**: Backend Foundation with MongoDB, Express, and Clerk Authentication

AI-powered hospital queue and patient workflow coordination platform - Backend REST API

## 🏗️ Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Clerk
- **Environment:** dotenv
- **CORS:** cors middleware

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   └── User.js               # User model (Clerk-synced)
│   ├── controllers/
│   │   ├── healthController.js   # Health check endpoint
│   │   └── userController.js     # User management
│   ├── routes/
│   │   ├── healthRoutes.js       # Health API routes
│   │   └── userRoutes.js         # User API routes
│   ├── middleware/
│   │   ├── authMiddleware.js     # Clerk authentication
│   │   └── errorMiddleware.js    # Error handling
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
- **MongoDB Atlas account** (free tier) - [See Setup Guide](./MONGODB_ATLAS_SETUP.md)
- Clerk account for authentication (already configured)

### Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up MongoDB Atlas:**

   📋 **[Follow the complete MongoDB Atlas setup guide](./MONGODB_ATLAS_SETUP.md)**
   
   Quick summary:
   - Create free M0 cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create database user with password
   - Whitelist IP address (use `0.0.0.0/0` for development)
   - Copy connection string

3. **Set up environment variables:**
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual values
```

Required environment variables:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - **MongoDB Atlas connection string** (see setup guide above)
- `CLERK_SECRET_KEY` - Clerk secret key (already configured)
- `CLERK_PUBLISHABLE_KEY` - Clerk publishable key (already configured)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)

Example `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mediflow?retryWrites=true&w=majority
CLERK_PUBLISHABLE_KEY=pk_test_b24tZ2F6ZWxsZS00MDUzLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_QKQA7PuG2Do4JpgQy6KIDpIfjdwoqAZSFeeJfaaEWy
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

4. **Start the development server:**
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully!
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server with nodemon (auto-reload)
npm start        # Start production server
```

## 📡 API Endpoints

### Health Check

**GET** `/api/health`
- **Access:** Public
- **Description:** Check server and database status

**Response:**
```json
{
  "success": true,
  "message": "MediFlow AI backend is running",
  "timestamp": "2026-09-18T10:30:00.000Z",
  "status": {
    "server": "online",
    "database": "connected"
  },
  "version": "2.0.0",
  "environment": "development"
}
```

### User Management

**GET** `/api/users/me`
- **Access:** Private (requires Clerk authentication)
- **Description:** Get current authenticated user profile

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "clerkId": "user_...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "patient",
    "status": "active",
    "createdAt": "2026-09-18T10:00:00.000Z",
    "updatedAt": "2026-09-18T10:00:00.000Z"
  }
}
```

**PUT** `/api/users/me`
- **Access:** Private
- **Description:** Update current user profile

**POST** `/api/users/sync`
- **Access:** Public (called from frontend after Clerk auth)
- **Description:** Sync user from Clerk to MongoDB

## 🔐 Authentication System

### How It Works

1. **Frontend** authenticates user with Clerk
2. **Frontend** calls `/api/users/sync` to create/update MongoDB record
3. **Subsequent requests** include Clerk session token
4. **Backend** verifies token using `@clerk/express` middleware
5. **Backend** fetches user from MongoDB and attaches to `req.user`

### Middleware Usage

```javascript
import { requireAuth, authorizeRoles } from './middleware/authMiddleware.js';

// Require authentication
router.get('/protected', requireAuth, controller);

// Require specific role
router.get('/admin', requireAuth, authorizeRoles('admin'), controller);

// Multiple allowed roles
router.get('/medical', requireAuth, authorizeRoles('doctor', 'staff'), controller);
```

### Available Roles

- `patient` - Default role for patients
- `doctor` - Medical doctors and physicians
- `staff` - Hospital administrative staff
- `admin` - System administrators

## 🗄️ Database Models

### Current Models (Phase 2)

#### User Model
- `clerkId` - Unique Clerk user ID (indexed)
- `name` - User's full name
- `email` - Email address (unique, indexed)
- `phone` - Phone number (optional)
- `role` - User role (enum: patient, doctor, staff, admin)
- `status` - Account status (enum: active, inactive, suspended)
- `metadata` - Additional custom data
- `createdAt` - Auto-generated timestamp
- `updatedAt` - Auto-generated timestamp

### Future Models (Phase 3+)

The following models will be implemented in future phases:

- **Patient** - Extended patient profiles (medical history, insurance)
- **Doctor** - Doctor profiles (specialization, schedule, departments)
- **Staff** - Staff member profiles (department, role)
- **Department** - Hospital departments
- **Appointment** - Appointment scheduling
- **Queue** - Queue management system
- **Consultation** - Doctor-patient consultations
- **LabTest** - Laboratory test orders
- **LabResult** - Laboratory test results
- **Prescription** - Medical prescriptions
- **PharmacyOrder** - Pharmacy order tracking
- **Notification** - System notifications
- **AgentAction** - AI agent action logs

### Database Relationships (Future)

```
User
├── Patient (1:1)
├── Doctor (1:1)
└── Staff (1:1)

Department
├── Doctors (1:N)
├── Staff (1:N)
└── Appointments (1:N)

Patient
├── Appointments (1:N)
├── Queues (1:N)
├── Consultations (1:N)
├── LabTests (1:N)
├── Prescriptions (1:N)
└── Notifications (1:N)

Appointment → Queue (1:1)
Queue → Consultation (1:1)
Consultation → LabTests (1:N)
Consultation → Prescriptions (1:N)
LabTest → LabResult (1:1)
Prescription → PharmacyOrder (1:1)
```

## 🧪 Testing

### Test Health Endpoint

```bash
# Using curl
curl http://localhost:5000/api/health

# Using httpie
http http://localhost:5000/api/health

# Using browser
# Navigate to: http://localhost:5000/api/health
```

### Test Protected Endpoint

```bash
# Without authentication (should return 401)
curl http://localhost:5000/api/users/me

# With Clerk session token (add Authorization header)
curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
     http://localhost:5000/api/users/me
```

## 🔒 Security

- ✅ No custom password management (handled by Clerk)
- ✅ Environment variables for sensitive data
- ✅ CORS configured for specific origin
- ✅ MongoDB credentials not exposed
- ✅ Input validation on models
- ✅ Error messages sanitized in production
- ✅ Role-based access control

## 📈 What's Implemented (Phase 2)

- ✅ Express server with ES modules
- ✅ MongoDB connection with Mongoose
- ✅ User model with Clerk sync
- ✅ Clerk authentication middleware
- ✅ Role-based authorization
- ✅ Health check API
- ✅ User profile API
- ✅ Centralized error handling
- ✅ CORS configuration
- ✅ Environment variable management
- ✅ Development logging

## 🚧 Not Yet Implemented

**Will be added in Phase 3+:**

- ❌ Patient/Doctor/Staff profile models
- ❌ Appointment system
- ❌ Queue management engine
- ❌ Real-time Socket.IO
- ❌ AI Agent integration
- ❌ Laboratory management
- ❌ Pharmacy integration
- ❌ Notification system
- ❌ Email/SMS services
- ❌ File uploads
- ❌ Report generation
- ❌ Analytics and metrics

## 🛠️ Development

### Code Style

- ES Modules (`import`/`export`)
- Async/await for asynchronous operations
- Consistent error handling
- Descriptive variable names
- Modular architecture (MVC pattern)

### Best Practices

- Separate concerns (routes, controllers, models)
- Reusable middleware
- Environment-based configuration
- Graceful error handling
- Database connection pooling
- Request logging in development

## 📦 Dependencies

```json
{
  "express": "^4.21.2",          // Web framework
  "mongoose": "^8.9.5",          // MongoDB ODM
  "dotenv": "^16.4.7",           // Environment variables
  "cors": "^2.8.5",              // CORS middleware
  "@clerk/express": "^1.3.38"    // Clerk authentication
}
```

## 🔗 Related Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Clerk Documentation](https://clerk.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

## 📝 License

ISC

---

**MediFlow AI** - Transforming hospital workflow coordination with AI
