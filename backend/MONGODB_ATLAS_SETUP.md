# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or use Google/GitHub authentication
3. Complete the registration process

## Step 2: Create a Free Cluster

1. After logging in, click **"Build a Database"** or **"Create"**
2. Choose **M0 FREE** tier (perfect for development)
   - Cloud Provider: AWS, Google Cloud, or Azure (any is fine)
   - Region: Choose closest to your location
   - Cluster Name: `mediflow-cluster` (or any name you prefer)
3. Click **"Create Cluster"** (takes 1-3 minutes to provision)

## Step 3: Configure Database Access

### Create Database User

1. In the left sidebar, click **"Database Access"** under Security
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Set credentials:
   - Username: `mediflow_admin` (or your preferred username)
   - Password: Click **"Autogenerate Secure Password"** and COPY IT
   - Or create your own strong password
5. Under **"Database User Privileges"**, select:
   - **"Read and write to any database"** (or "Atlas admin" for full access)
6. Click **"Add User"**

**⚠️ IMPORTANT:** Save your password securely - you'll need it for the connection string!

## Step 4: Configure Network Access

### Whitelist IP Addresses

1. In the left sidebar, click **"Network Access"** under Security
2. Click **"Add IP Address"**
3. For **development**, choose one of:
   - **Option A (Recommended for dev):** Click **"Allow Access from Anywhere"**
     - This adds `0.0.0.0/0` - allows connections from any IP
     - ⚠️ For production, use specific IP addresses instead!
   - **Option B:** Click **"Add Current IP Address"** to only allow your machine
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Choose:
   - Driver: **Node.js**
   - Version: **5.5 or later**
5. **COPY** the connection string - it looks like:
   ```
   mongodb+srv://mediflow_admin:<password>@mediflow-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Configure Your Backend

1. Open `backend/.env` file
2. Replace `<password>` in the connection string with your actual password
3. Add the database name (`mediflow`) before the query parameters:

```env
# BEFORE (from Atlas)
MONGODB_URI=mongodb+srv://mediflow_admin:<password>@mediflow-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority

# AFTER (updated with your password and database name)
MONGODB_URI=mongodb+srv://mediflow_admin:YourActualPassword123@mediflow-cluster.xxxxx.mongodb.net/mediflow?retryWrites=true&w=majority
```

**Complete `.env` file should look like:**

```env
PORT=5000
MONGODB_URI=mongodb+srv://mediflow_admin:YourActualPassword123@mediflow-cluster.xxxxx.mongodb.net/mediflow?retryWrites=true&w=majority
CLERK_PUBLISHABLE_KEY=pk_test_b24tZ2F6ZWxsZS00MDUzLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_QKQA7PuG2Do4JpgQy6KIDpIfjdwoqAZSFeeJfaaEWy
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Step 7: Test Connection

```bash
# Navigate to backend folder
cd backend

# Start the server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully!
```

## Step 8: Verify Health Endpoint

Open your browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "MediFlow AI Backend is running",
  "timestamp": "2026-09-18T...",
  "environment": "development",
  "database": "connected"
}
```

## Troubleshooting

### Error: "MongoServerError: bad auth"
- **Cause:** Incorrect username or password
- **Fix:** Double-check credentials in `.env`, ensure password has no special characters that need URL encoding

### Error: "Could not connect to any servers"
- **Cause:** IP address not whitelisted
- **Fix:** Go to Network Access in Atlas and add `0.0.0.0/0` or your specific IP

### Error: "Authentication failed"
- **Cause:** Database user not created properly
- **Fix:** Recreate database user in Database Access section

### Special Characters in Password
If your password contains special characters like `@`, `#`, `$`, `%`, etc., they need to be URL-encoded:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `^` → `%5E`
- `&` → `%26`

Example:
- Password: `Pass@123#`
- Encoded: `Pass%40123%23`
- Connection string: `mongodb+srv://user:Pass%40123%23@cluster.mongodb.net/mediflow`

## Production Considerations (Future)

When deploying to production:

1. **Use specific IP whitelisting** instead of `0.0.0.0/0`
2. **Create separate database user** with read/write only (not admin)
3. **Use different connection strings** for dev/staging/prod environments
4. **Enable MongoDB Atlas monitoring** and alerts
5. **Set up automated backups** (available in paid tiers)
6. **Consider upgrading** from M0 (free tier) for better performance

## Next Steps

After MongoDB Atlas is connected:
1. ✅ Test user sync endpoint: `POST http://localhost:5000/api/users/sync`
2. ✅ Test auth middleware with Clerk tokens
3. ✅ Verify role-based access control
4. ✅ Begin Phase 2 feature development (appointments, queue, etc.)

## Support

- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/
- MongoDB Node.js Driver: https://www.mongodb.com/docs/drivers/node/
- Mongoose Docs: https://mongoosejs.com/docs/

---

**Need help?** Check the [MediFlow AI Backend README](./README.md) for architecture details.
