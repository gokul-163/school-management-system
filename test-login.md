# Login Troubleshooting Guide

## Quick Test Steps

### 1. Check Backend Server
Make sure your backend server is running:
```bash
cd server
npm run dev
```
You should see: `🚀 API running on http://localhost:4000`

### 2. Check Frontend Server
Make sure your frontend server is running:
```bash
cd web
npm run dev
```
You should see: `Ready - started server on 0.0.0.0:3000`

### 3. Test API Endpoints
Test the backend API directly:

**Register Admin:**
```bash
curl -X POST http://localhost:4000/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"admin123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### 4. Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try to login and check for any error messages

### 5. Check Network Tab
1. Open browser developer tools (F12)
2. Go to Network tab
3. Try to login and check the request/response

## Common Issues & Solutions

### Issue 1: "Network error"
- **Cause**: Backend server not running
- **Solution**: Start the backend server with `npm run dev` in the server directory

### Issue 2: "User not found"
- **Cause**: No admin account exists
- **Solution**: First register an admin account using the "Register Admin" option

### Issue 3: "Invalid credentials"
- **Cause**: Wrong email/password
- **Solution**: Use the default credentials: admin@example.com / admin123

### Issue 4: CORS errors
- **Cause**: Frontend and backend ports don't match
- **Solution**: Check that frontend is on port 3000 and backend is on port 4000

### Issue 5: Token not stored
- **Cause**: Cookie settings issue
- **Solution**: Check browser console for cookie-related errors

## Environment Variables Check

Make sure you have these files:

**server/.env:**
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/school_management
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

**web/.env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Database Check

Make sure MongoDB is running:
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

If MongoDB is not running, start it:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

## Reset Everything

If nothing works, try resetting:

1. **Clear browser data**: Clear cookies and local storage
2. **Restart servers**: Stop and restart both frontend and backend
3. **Reset database**: Delete and recreate the database
4. **Reinstall dependencies**: 
   ```bash
   cd server && npm install
   cd ../web && npm install
   ```

## Success Indicators

When login works correctly, you should see:
1. No error messages in browser console
2. Successful API response with token
3. Redirect to dashboard page
4. Token stored in browser cookies
5. All dashboard data loading properly
