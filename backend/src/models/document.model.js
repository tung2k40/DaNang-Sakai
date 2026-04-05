const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ['PDF', 'Word', 'Excel', 'PowerPoint', 'Video'],
            required: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        grade: {
            type: String,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: String,
            default: '#',
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
