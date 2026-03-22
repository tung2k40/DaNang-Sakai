const mongoose = require('mongoose');
const { ENV } = require('../src/lib/env');

const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) throw new Error('MONGO_URI is not defined');

        const cnn = await mongoose.connect(MONGO_URI);
        console.log('MONGODB CONNECTED:', cnn.connection.host);
    } catch (error) {
        console.error('\n❌ Error connection to MONGODB:', error.message);
        throw error; // Ném lỗi ra ngoài thay vì process.exit để console kịp in ra
    }
}

module.exports = {
    connectDB
};