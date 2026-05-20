const mongoose = require('mongoose');

const documentChunkSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: true,
        },
        chunkIndex: {
            type: Number,
            required: true,
        },
        textContent: {
            type: String,
            required: true,
        },
        embedding: {
            type: [Number], // Array of numbers to store the vector
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('DocumentChunk', documentChunkSchema);
