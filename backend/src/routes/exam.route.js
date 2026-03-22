const express = require('express');
const { validate } = require('../middleware/validate');
const examValidator = require('../validations/exam.validation');
const examController = require('../controllers/exam.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', examController.getAll);

router.get('/:id', examController.getById);

router.post(
    '/',
    protect,
    validate(examValidator.create),
    examController.create
);

router.delete('/:id', protect, examController.remove);

module.exports = router;
