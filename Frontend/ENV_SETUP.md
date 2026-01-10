# Frontend Environment Variables Setup

## Required Environment Variables for Vercel

Set these in your Vercel project settings (Settings → Environment Variables):

### Production Environment Variables:

```
VITE_API_BASE_URL=https://double-h-portfolio.vercel.app/api/v1
```

### Example .env files for local development:

Create a `.env.development` file in the Frontend directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Create a `.env.production` file in the Frontend directory:

```env
VITE_API_BASE_URL=https://double-h-portfolio.vercel.app/api/v1
```

## How to Set Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Click on **Environment Variables**
4. Add the variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://double-h-portfolio.vercel.app/api/v1`
   - **Environment**: Production, Preview, Development (select all)

## Important Notes:

- **VITE_API_BASE_URL**: Must point to your backend API
- Vite requires the `VITE_` prefix for environment variables
- After adding environment variables, you need to **redeploy** your Vercel project
- The frontend will automatically use the correct API URL based on the environment
