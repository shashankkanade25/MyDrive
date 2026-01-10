# MyDrive - AWS S3 Cloud Storage

A file storage application using AWS S3 for cloud storage.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. AWS S3 Setup

1. Create an AWS account at https://aws.amazon.com/
2. Create an S3 bucket:
   - Go to S3 console
   - Click "Create bucket"
   - Choose a unique bucket name
   - Select a region (e.g., us-east-1)
   - Uncheck "Block all public access" if you want public file access
   - Click "Create bucket"

3. Create IAM credentials:
   - Go to IAM console
   - Click "Users" → "Add user"
   - Enable "Programmatic access"
   - Attach policy: `AmazonS3FullAccess`
   - Save the Access Key ID and Secret Access Key

4. Configure CORS on your S3 bucket (for file previews):
   - Go to your bucket → Permissions → CORS
   - Add this configuration:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name

PORT=3000
```

### 4. Run the Application

```bash
npm start
```

The application will run on `http://localhost:3000`

## Features

- ✅ File upload to AWS S3
- ✅ File download with signed URLs
- ✅ File preview (images, videos, PDFs)
- ✅ File deletion from S3
- ✅ User authentication
- ✅ Secure file storage

## Migration from Cloudinary/Firebase

This project has been migrated from Cloudinary/Firebase to AWS S3. Old Cloudinary/Firebase dependencies have been removed.

## File Size Limit

Default: 10MB per file (configurable in `middlewares/upload.js`)

## Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- AWS SDK v3
- Multer + Multer-S3
- EJS templating
- JWT authentication
