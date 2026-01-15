# Deployment Fixes Summary

## What Was Wrong:

1. **Backend 404 Errors:**
   - `vercel.json` was pointing to wrong file (`index.js` instead of `server.js`)
   - Express app wasn't exported correctly for Vercel serverless
   - No proper serverless function entry point

2. **CORS Errors:**
   - CORS configuration had wrong origins
   - Missing proper origin validation
   - Not allowing the correct frontend domain

3. **Frontend API Configuration:**
   - Hardcoded API URLs in multiple places
   - Wrong port in axios configuration (`:3000` on Vercel)
   - Inconsistent environment variable usage

## What Was Fixed:

### Backend (Express.js):

1. **Created `/api/index.js`** - Vercel serverless entry point
2. **Updated `server.js`**:
   - Exports app for Vercel serverless
   - Fixed CORS to allow `https://double-h-portfolio-tvgh.vercel.app`
   - Added health check endpoint
   - Added root endpoint with API info
   - Conditional server start (only if not on Vercel)

3. **Updated `vercel.json`**:
   - Points to correct serverless function (`api/index.js`)
   - Proper routing for all API requests

### Frontend (React):

1. **Updated `api.js`**:
   - Uses environment variables properly
   - Fallback to correct URLs based on environment
   - Removed hardcoded URLs

2. **Updated `axios.js`**:
   - Fixed baseURL to use environment variables
   - Removed incorrect port (`:3000`)
   - Added timeout and proper headers

3. **Updated `imageUrl.js`**:
   - Fixed to use environment variables
   - Proper URL construction

## Deployment Steps:

### Backend Deployment:

1. **Set Environment Variables in Vercel:**
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   ```

2. **Deploy to Vercel:**
   - Push code to your repository
   - Vercel will automatically detect and deploy
   - Make sure `vercel.json` is in the Backend directory

3. **Verify Deployment:**
   - Visit: `https://double-h-portfolio.vercel.app/api/v1/health`
   - Should return: `{"success": true, "message": "API is running"}`

### Frontend Deployment:

1. **Set Environment Variables in Vercel:**
   ```
   VITE_API_BASE_URL=https://double-h-portfolio.vercel.app/api/v1
   ```

2. **Deploy to Vercel:**
   - Push code to your repository
   - Vercel will automatically detect and deploy
   - Make sure to redeploy after adding environment variables

3. **Verify Deployment:**
   - Visit your frontend URL
   - Check browser console for API calls
   - Should see successful requests to backend

## Testing:

### Test Backend:
```bash
# Health check
curl https://double-h-portfolio.vercel.app/api/v1/health

# Get projects
curl https://double-h-portfolio.vercel.app/api/v1/projects

# Get partners
curl https://double-h-portfolio.vercel.app/api/v1/partners

# Get hero images
curl https://double-h-portfolio.vercel.app/api/v1/hero
```

### Test Frontend:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit your frontend URL
4. Check for:
   - No 404 errors
   - No CORS errors
   - Successful API responses (200 OK)

## Troubleshooting:

### If you still get 404:
- Check that `vercel.json` is in the Backend root directory
- Verify the file structure matches what Vercel expects
- Check Vercel deployment logs

### If you still get CORS errors:
- Verify the frontend URL in CORS configuration matches exactly
- Check that environment variables are set correctly
- Make sure you redeployed after changes

### If API calls fail:
- Check browser console for exact error messages
- Verify `VITE_API_BASE_URL` is set in Vercel
- Make sure frontend was redeployed after adding env vars
