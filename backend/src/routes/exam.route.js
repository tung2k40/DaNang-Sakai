const express = require('express');
const { validate } = require('../middleware/validate.middleware');
const examValidator = require('../validations/exam.validation');
const examController = require('../controllers/exam.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.get('/', examController.getAll);

router.get('/mine', protect, examController.getMine);

router.get('/:id', examController.getById);

router.post(
    '/',
    protect,
    upload.single('file'),
    validate(examValidator.create),
    examController.create
);

router.delete('/:id', protect, examController.remove);

module.exports = router;
