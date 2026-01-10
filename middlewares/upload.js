const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Client = require("../config/aws");
const path = require("path");

const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  acl: 'private', // Files are private by default
  metadata: function (req, file, cb) {
    cb(null, { 
      fieldName: file.fieldname,
      uploadedBy: req.user ? req.user.userId : 'unknown'
    });
  },
  key: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, 'mydrive_files/' + uniqueSuffix + '-' + sanitizedName);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept all file types
    cb(null, true);
  }
});

module.exports = upload;

