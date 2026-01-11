📁 MyDrive – Cloud File Storage Application

MyDrive is a cloud-based file storage application inspired by Google Drive. It allows users to register, authenticate, upload files, manage their data, and securely store files on AWS S3 with metadata stored in MongoDB Atlas. The backend is deployed as a long-running Node.js service.

This project focuses on backend development, cloud integration, authentication, and deployment, not just UI.


🚀 Features


User registration and login (JWT-based authentication)
Secure file upload and storage using AWS S3
File metadata storage in MongoDB Atlas
User-specific file access
RESTful API architecture
Environment-based configuration for production
Deployed on Render (24×7 backend)

🛠️ Tech Stack
Backend

Node.js | Express.js | MongoDB (Mongoose ODM) | JWT Authentication | Multer (file handling) | Cloud & DevOps | AWS S3 (file storage) | MongoDB Atlas (managed database) | Render
Environment Variables for secrets management



🔐 Environment Variables

Create the following environment variables in your deployment platform (Render):

PORT=10000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mydrive
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=your_bucket_name


⚠️ Never commit these values to GitHub.

▶️ Running Locally
git clone https://github.com/shashankkanade25/MyDrive.git
cd MyDrive
npm install
npm start


The server will start on:
```
http://localhost:3000
```

☁️ Deployment

Backend deployed on Render as a Node.js web service
MongoDB hosted on MongoDB Atlas
File storage handled by AWS S3
Uses dynamic ports (process.env.PORT) for production compatibility


🧠 What This Project Demonstrates
Real-world backend architecture
Secure authentication and authorization
Cloud storage integration (AWS)
Production deployment troubleshooting
Handling environment-specific configs
Debugging real production issues (TLS, auth, networking)

<img width="2878" height="1611" alt="image" src="https://github.com/user-attachments/assets/a6fcd4f4-50a7-4eae-be71-d4c51bbaadb3" />


👤 Author

Shashank Kanade
Computer Science Student | Cloud & DevOps Enthusiast

GitHub: https://github.com/shashankkanade25
