const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Validate environment variables
if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error('AWS_ACCESS_KEY_ID is not set in .env file');
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_SECRET_ACCESS_KEY is not set in .env file');
}
if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error('AWS_S3_BUCKET_NAME is not set in .env file');
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID.trim(),
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY.trim()
    }
});

console.log('✓ AWS S3 Client initialized');
console.log('  Region:', process.env.AWS_REGION || 'ap-south-1');
console.log('  Bucket:', process.env.AWS_S3_BUCKET_NAME);

module.exports = s3Client;
