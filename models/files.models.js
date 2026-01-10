const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path:{
        type: String,
        required: [true, 'path is required']
    },
    originalname: {
        type: String,
        required: [true, 'Originalname is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User is required']
    },
    // AWS S3 specific fields
    s3_key: {
        type: String,
        required: [true, 'S3 key is required']
    },
    url: {
        type: String,
        required: [true, 'File URL is required']
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    }
}, {
    timestamps: true
})

const file = mongoose.model('file', fileSchema)

module.exports = file;