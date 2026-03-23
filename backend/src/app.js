const express = require('express');
const http = require('http');
const path = require('path');

process.on('uncaughtException', (err) => {
    console.error('🔥 UNCAUGHT EXCEPTION:', err);
    setTimeout(() => process.exit(1), 500);
});

process.on('unhandledRejection', (err) => {
    console.error('🔥 UNHANDLED REJECTION:', err);
    setTimeout(() => process.exit(1), 500);
});
const { ENV } = require('./lib/env');
const { connectDB } = require('../config/db.config');
const mainRouter = require('./routes/index');
const cors = require('../config/cors.config');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = ENV.PORT || 3000;

app.use(cors);
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Phục vụ các file tĩnh trong thư mục uploads thông qua proxy /api/v1
app.use('/api/v1/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/api/v1', mainRouter);

app.use('/api/v1', (req, res) => {
    res.status(200).json('DaNangScholar xin chào!');
})

const startServer = async () => {
    try {
        await connectDB();

        http.createServer(app).listen(PORT, () => {
            console.log('Server is running!');
            console.log(`BASE URL: http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        console.error('\n❌ Server failed to start:', error);
        setTimeout(() => process.exit(1), 500);
    }
};

startServer();