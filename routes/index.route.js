const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')
const fileModel = require('../models/files.models')
const authMiddleware = require('../middlewares/authe')
const { GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = require('../config/aws');

router.get('/', (req, res) => {
    res.redirect('/home');
})

router.get('/home',authMiddleware,async(req,res) => {
    const userFiles = await fileModel.find({
        user:req.user.userId
    }).sort({ createdAt: -1 }) // Sort by newest first
    
    // Generate signed URLs for each file
    const filesWithSignedUrls = await Promise.all(userFiles.map(async (file) => {
        if (file.s3_key) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: file.s3_key
            });
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            return { ...file.toObject(), signedUrl };
        }
        return file.toObject();
    }));
    
    res.render('home', { files: filesWithSignedUrls });
})

router.post('/upload',authMiddleware,upload.single('file'), async (req,res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        
        const newFile = await fileModel.create({
            path: req.file.location, // S3 URL
            originalname: req.file.originalname,
            user: req.user.userId,
            s3_key: req.file.key, // S3 object key
            url: req.file.location,
            mimetype: req.file.mimetype,
            size: req.file.size
        })
        
        console.log('File uploaded to S3:', newFile.originalname);
        res.redirect('/home?upload=success');
    } catch (error) {
        console.error('Upload error:', error);
        res.redirect('/home?upload=error');
    }
})

router.get('/file/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        // Generate signed URL for viewing
        if (file.s3_key) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: file.s3_key
            });
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            file.signedUrl = signedUrl;
        }

        res.render('file', { file });
    } catch (error) {
        console.error('File view error:', error);
        res.status(500).send('Error viewing file: ' + error.message);
    }
})

// API endpoint to get signed URL for file viewing
router.get('/api/file-url/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        if (file.s3_key) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: file.s3_key
            });
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            return res.json({ url: signedUrl });
        } else {
            return res.status(404).json({ error: 'File not found in storage' });
        }
    } catch (error) {
        console.error('Get file URL error:', error);
        res.status(500).json({ error: error.message });
    }
})

router.get('/download/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        // Generate signed URL for S3 download
        if (file.s3_key) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: file.s3_key,
                ResponseContentDisposition: `attachment; filename="${encodeURIComponent(file.originalname)}"`
            });
            
            // Generate signed URL valid for 1 hour
            const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            return res.redirect(downloadUrl);
        } else {
            return res.status(404).send('File not found in storage');
        }
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).send('Error downloading file: ' + error.message);
    }
})

router.post('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        // Delete file from S3
        if (file.s3_key) {
            try {
                const command = new DeleteObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: file.s3_key
                });
                await s3Client.send(command);
                console.log('File deleted from S3:', file.originalname);
            } catch (s3Error) {
                console.error('S3 delete error:', s3Error);
                // Continue with database deletion even if S3 delete fails
            }
        }

        // Delete from database
        await fileModel.deleteOne({ _id: req.params.id });

        res.redirect('/home?delete=success');
    } catch (error) {
        console.error('Delete error:', error);
        res.redirect('/home?delete=error');
    }
})

module.exports = router;
