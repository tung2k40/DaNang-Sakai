const express = require('express');
const authRoutes = require('./auth.route');
const documentRoutes = require('./document.route');
const examRoutes = require('./exam.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/documents', documentRoutes);
router.use('/exams', examRoutes);

module.exports = router;