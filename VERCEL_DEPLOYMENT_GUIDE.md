# Vercel Deployment Guide - Complete Fix

## Overview

This guide fixes all issues with deploying the Express backend and React frontend separately on Vercel.

## Problems Fixed

### 1. Backend 404 Errors ✅
- **Problem**: `vercel.json` pointed to wrong file, Express app not exported for serverless
- **Solution**: Created `/api/index.js` entry point, updated `vercel.json`, exported app correctly

### 2. CORS Errors ✅
- **Problem**: Wrong CORS origins, missing proper validation
- **Solution**: Fixed CORS to allow `https://double-h-portfolio-tvgh.vercel.app` with proper origin validation

### 3. Frontend API Configuration ✅
- **Problem**: Hardcoded URLs, wrong ports, inconsistent env vars
- **Solution**: All API calls now use `VITE_API_BASE_URL` environment variable

## File Changes

### Backend Files Changed:

1. **`/api/index.js`** (NEW)
   - Vercel serverless function entry point
   - Exports the Express app

2. **`server.js`** (UPDATED)
   - Exports app for Vercel
   - Fixed CORS configuration
   - Added health check endpoint
   - Conditional server start (only local)

3. **`vercel.json`** (UPDATED)
   - Points to correct serverless function
   - Proper routing configuration

4. **`config/db.js`** (UPDATED)
   - Optimized for serverless (connection caching)
   - Prevents connection issues in serverless environment

### Frontend Files Changed:

1. **`src/dashboard/config/api.js`** (UPDATED)
   - Uses `VITE_API_BASE_URL` environment variable
   - Proper fallbacks for dev/prod

2. **`src/dashboard/utils/axios.js`** (UPDATED)
   - Fixed baseURL to use env vars
   - Removed incorrect port

3. **`src/dashboard/utils/imageUrl.js`** (UPDATED)
   - Uses environment variables
   - Proper URL construction

## Deployment Steps

### Step 1: Backend Deployment

1. **Set Environment Variables in Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Select your backend project
   - Settings → Environment Variables
   - Add these variables:

   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   JWT_SECRET=your_strong_random_secret_key_here
   NODE_ENV=production
   ```

2. **Deploy:**
   - Push code to your repository
   - Vercel will auto-deploy
   - Or trigger manual deployment

3. **Verify Backend:**
   ```bash
   # Test health endpoint
   curl https://double-h-portfolio.vercel.app/api/v1/health
   
   # Should return:
   # {"success":true,"message":"API is running","timestamp":"..."}
   ```

### Step 2: Frontend Deployment

1. **Set Environment Variables in Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Select your frontend project
   - Settings → Environment Variables
   - Add this variable:

   ```
   VITE_API_BASE_URL=https://double-h-portfolio.vercel.app/api/v1
   ```

2. **Deploy:**
   - Push code to your repository
   - Vercel will auto-deploy
   - **IMPORTANT**: Redeploy after adding environment variables

3. **Verify Frontend:**
   - Visit: https://double-h-portfolio-tvgh.vercel.app
   - Open browser DevTools (F12)
   - Check Network tab for API calls
   - Should see successful requests (200 OK)

## Testing Checklist

### Backend Tests:

- [ ] `GET https://double-h-portfolio.vercel.app/api/v1/health` → 200 OK
- [ ] `GET https://double-h-portfolio.vercel.app/api/v1/projects` → 200 OK
- [ ] `GET https://double-h-portfolio.vercel.app/api/v1/partners` → 200 OK
- [ ] `GET https://double-h-portfolio.vercel.app/api/v1/hero` → 200 OK
- [ ] No 404 errors in browser

### Frontend Tests:

- [ ] Visit frontend URL
- [ ] Open DevTools Console
- [ ] No CORS errors
- [ ] No 404 errors in Network tab
- [ ] API calls return 200 OK
- [ ] Data loads correctly (projects, partners, hero images)

## Environment Variables Reference

### Backend (Vercel Environment Variables):

| Variable | Value | Required |
|----------|-------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Random secret key (32+ chars) | Yes |
| `NODE_ENV` | `production` | Yes |

### Frontend (Vercel Environment Variables):

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_BASE_URL` | `https://double-h-portfolio.vercel.app/api/v1` | Yes |

## Local Development Setup

### Backend `.env` file:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your_local_jwt_secret
PORT=3000
NODE_ENV=development
```

### Frontend `.env.development` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Troubleshooting

### Backend returns 404:

1. Check `vercel.json` is in Backend root
2. Verify `/api/index.js` exists
3. Check Vercel deployment logs
4. Ensure `server.js` exports the app

### CORS errors:

1. Verify frontend URL in `server.js` CORS config
2. Check environment variables are set
3. Redeploy backend after CORS changes

### Frontend can't connect to API:

1. Verify `VITE_API_BASE_URL` is set in Vercel
2. Check it matches your backend URL exactly
3. Redeploy frontend after adding env vars
4. Check browser console for exact error

### Database connection issues:

1. Verify `MONGO_URI` is set correctly
2. Check MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)
3. Verify connection string format

## Important Notes

1. **Separate Deployments**: Backend and frontend are separate Vercel projects
2. **Environment Variables**: Must be set in Vercel dashboard, not in code
3. **Redeploy Required**: After adding env vars, you must redeploy
4. **CORS**: Only allows `https://double-h-portfolio-tvgh.vercel.app`
5. **Database**: Connection is cached for serverless performance

## Support

If issues persist:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure both projects are deployed successfully
