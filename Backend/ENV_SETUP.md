# Backend Environment Variables Setup

## Required Environment Variables for Vercel

Set these in your Vercel project settings (Settings → Environment Variables):

### Production Environment Variables:

```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_strong_random_jwt_secret_key_here
NODE_ENV=production
```

### Example .env file for local development:

Create a `.env` file in the Backend directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=3000
NODE_ENV=development
```

## How to Set Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Click on **Environment Variables**
4. Add each variable:
   - **Key**: `MONGO_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Production, Preview, Development (select all)
5. Repeat for `JWT_SECRET` and `NODE_ENV`

## Important Notes:

- **MONGO_URI**: Your MongoDB Atlas connection string
- **JWT_SECRET**: Use a strong random string (at least 32 characters)
- **NODE_ENV**: Set to `production` for Vercel
- Vercel automatically sets `VERCEL=1` and `PORT` - you don't need to set these
