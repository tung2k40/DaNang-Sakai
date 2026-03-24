const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { // We will hash it in the auth service or presave
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 300 // Automatically delete this document after 5 minutes (300 seconds)
    }
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);
