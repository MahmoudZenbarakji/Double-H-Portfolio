# Vercel Production Fixes - Complete Guide

## 🔍 Why It Works Locally But Fails on Vercel

### Key Differences: Local vs Vercel Serverless

1. **Connection Persistence**
   - **Local**: Node.js process runs continuously, MongoDB connection stays alive
   - **Vercel**: Serverless functions are stateless, each invocation is isolated
   - **Fix**: Implemented connection caching using `global.mongoose`

2. **CORS Preflight Requests**
   - **Local**: Browser may cache CORS headers, fewer preflight requests
   - **Vercel**: Every request from different origin triggers preflight OPTIONS
   - **Fix**: Proper CORS configuration with all required headers

3. **Error Handling**
   - **Local**: Errors show full stack traces in console
   - **Vercel**: Errors must be caught and returned as JSON responses
   - **Fix**: Comprehensive error handlers for all error types

4. **Environment Variables**
   - **Local**: Loaded from `.env` file automatically
   - **Vercel**: Must be set in Vercel dashboard
   - **Fix**: Verified all env var names match code

5. **File Uploads**
   - **Local**: Can use disk storage (`/tmp` works)
   - **Vercel**: No persistent disk, must use Cloudinary directly
   - **Fix**: Already using Cloudinary (correct)

---

## ✅ Fixes Applied

### 1. **server.js** - Complete Overhaul

#### Issues Fixed:
- ❌ `app.options('*', cors())` - Causes `PathError` in newer Express
- ❌ `origin: '*'` - Insecure and doesn't work properly
- ❌ Missing error handlers for Multer and CORS
- ❌ 404 handler in wrong order

#### Changes:
```javascript
// ✅ Fixed CORS - Production safe, no wildcards
const corsOptions = {
  origin: (origin, callback) => {
    // Proper origin validation
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // ...
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [/* all required headers */],
  credentials: false,
  optionsSuccessStatus: 200,
  maxAge: 86400,
};

// ✅ Removed app.options('*') - cors middleware handles it automatically
app.use(cors(corsOptions));

// ✅ Added Multer error handling
if (err.name === 'MulterError') { /* handle file upload errors */ }

// ✅ Fixed middleware order: Error handler before 404 handler
```

### 2. **config/db.js** - Serverless MongoDB Connection

#### Issues Fixed:
- ❌ Too simple connection logic
- ❌ No error recovery
- ❌ No connection state verification
- ❌ Missing connection event handlers

#### Changes:
```javascript
// ✅ Proper serverless connection caching
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ✅ Connection options for serverless
const opts = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// ✅ Connection state verification
if (mongoose.connection.readyState !== 1) {
  throw new Error('MongoDB connection is not ready');
}

// ✅ Event handlers for reconnection
mongoose.connection.on('error', ...);
mongoose.connection.on('disconnected', ...);
mongoose.connection.on('reconnected', ...);
```

### 3. **vercel.json** - Serverless Routing

#### Changes:
- ✅ Added `NODE_ENV: "production"` to env
- ✅ Verified routing structure is correct

### 4. **Error Handling** - Comprehensive Coverage

#### Added Handlers For:
- ✅ CORS errors (403)
- ✅ Multer file upload errors (400)
- ✅ Database connection errors (503)
- ✅ General errors (500)
- ✅ 404 Not Found

---

## 🔧 Required Vercel Environment Variables

Set these in **Vercel Dashboard → Project Settings → Environment Variables**:

### Database
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Optional
```
NODE_ENV=production
```

---

## 📋 Deployment Checklist

### Before Deploying:
- [ ] All environment variables set in Vercel dashboard
- [ ] `vercel.json` is in Backend folder root
- [ ] `api/index.js` exists and exports app
- [ ] No `app.listen()` in server.js
- [ ] All routes use `module.exports = app`

### After Deploying:
- [ ] Test: `GET https://double-h-portfolio.vercel.app/api/v1/health`
- [ ] Test: `GET https://double-h-portfolio.vercel.app/api/v1/projects`
- [ ] Test: `GET https://double-h-portfolio.vercel.app/api/v1/partners`
- [ ] Test: `GET https://double-h-portfolio.vercel.app/api/v1/hero`
- [ ] Check Vercel function logs for errors

---

## 🐛 Common Issues & Solutions

### Issue: `FUNCTION_INVOCATION_FAILED`
**Cause**: Unhandled error in serverless function
**Solution**: All errors now properly caught and returned as JSON

### Issue: CORS errors
**Cause**: Missing or incorrect CORS configuration
**Solution**: Fixed CORS with proper origin validation and headers

### Issue: 500 errors on partners/hero
**Cause**: Mongoose documents not serialized properly
**Solution**: All controllers use `.toObject()` for safe serialization

### Issue: Database connection timeout
**Cause**: Connection not cached properly
**Solution**: Implemented global connection caching with proper error handling

---

## 📝 File Structure Verification

```
Backend/
├── api/
│   └── index.js          ✅ Exports app for Vercel
├── server.js             ✅ Fixed CORS, DB, error handling
├── config/
│   └── db.js            ✅ Serverless MongoDB connection
├── storage/
│   └── storage.js       ✅ Cloudinary configuration
├── Controllers/         ✅ All use .toObject()
├── Routes/              ✅ All routes properly configured
├── Models/              ✅ Serverless-safe model definitions
└── vercel.json          ✅ Correct routing configuration
```

---

## 🚀 Testing Commands

### Test Health Endpoint
```bash
curl https://double-h-portfolio.vercel.app/api/v1/health
```

### Test Projects (with CORS)
```bash
curl -H "Origin: https://double-h-portfolio-tvgh.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://double-h-portfolio.vercel.app/api/v1/projects
```

### Test Projects GET
```bash
curl https://double-h-portfolio.vercel.app/api/v1/projects
```

---

## ✅ Summary

All critical issues have been fixed:
1. ✅ CORS configuration - Production safe, no wildcards
2. ✅ MongoDB connection - Serverless-compatible with caching
3. ✅ Error handling - Comprehensive coverage
4. ✅ File uploads - Cloudinary working correctly
5. ✅ Middleware order - Correct sequence
6. ✅ Environment variables - Verified naming

The backend should now work correctly on Vercel serverless functions.
