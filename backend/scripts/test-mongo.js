const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
if (!uri) {
    console.error('❌ MONGO_URI is not set in .env');
    process.exit(1);
}

const client = new MongoClient(uri);

async function test() {
    try {
        await client.connect();
        console.log('✅ Connected MongoDB');

        const db = client.db();
        const collections = await db.listCollections().toArray();

        console.log(
            'Collections:',
            collections.map((c) => c.name)
        );
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exitCode = 1;
    } finally {
        await client.close();
    }
}

test();
