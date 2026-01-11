# Render Deployment Configuration

## ✅ Code Changes Completed

All necessary code changes have been made. Your app is now ready for Render deployment.

## 🔧 Render Environment Variables Required

Go to **Render Dashboard → Your Web Service → Environment → Environment Variables** and add:

### MongoDB
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/mydrive?retryWrites=true&w=majority
```

### JWT Secret
```
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### AWS S3 Credentials
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=ap-south-1
```

## 🚀 Render Service Settings

### Build Command
```
npm install
```

### Start Command
```
npm start
```
*(This now runs `node app.js` for production)*

### Instance Type
- Free tier is sufficient for testing
- Upgrade to paid tier for production use

## ✅ What's Been Fixed

1. **✅ Removed dotenv completely** - No longer used; environment variables come from Render
2. **✅ Fixed server port** - Uses `process.env.PORT || 3000`
3. **✅ Fixed MongoDB connection** - Proper async pattern with connection caching and error handling
4. **✅ Updated package.json** - Production-ready start script using `node` instead of `nodemon`
5. **✅ Removed uploads folder serving** - All files are stored in S3, not local filesystem
6. **✅ Updated error messages** - Removed references to `.env` file
7. **✅ Added proper async server startup** - Database connects before server starts

## 🔍 Verify After Deployment

1. Check Render logs for: `"MongoDB connected"` and `"Server running on port XXXX"`
2. Visit your Render URL - should see the home page
3. Test user registration and login
4. Test file upload to S3
5. Verify files are stored in S3 and accessible via signed URLs

## 🐛 Common Issues

### Bad Gateway (502)
- Check PORT configuration (should be `process.env.PORT || 3000`)
- Verify server is actually listening (check logs)

### Database Connection Failed
- Verify `MONGO_URI` is correctly set in Render environment variables
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### AWS S3 Errors
- Verify all AWS credentials are set in Render
- Check S3 bucket permissions and CORS settings
- Ensure IAM user has S3 full access permissions

## 📝 Local Development

For local development, use:
```bash
npm run dev
```

This uses `nodemon` for auto-reloading.

For local development, you'll still need a `.env` file, but install dotenv as a dev dependency:
```bash
npm install --save-dev dotenv
```

Then in development, load it conditionally:
```javascript
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
```

## 🔒 Security Checklist

- [x] No credentials in code
- [x] .env file in .gitignore
- [x] All secrets in Render environment variables
- [x] S3 files set to private (using signed URLs)
- [x] JWT secret is strong and unique
- [ ] MongoDB Atlas IP whitelist configured
- [ ] AWS IAM user has minimal required permissions
