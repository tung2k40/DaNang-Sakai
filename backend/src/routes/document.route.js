const express = require('express');
const { validate } = require('../middleware/validate');
const documentValidator = require('../validations/document.validation');
const documentController = require('../controllers/document.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', documentController.getAll);

router.get('/:id', documentController.getById);

router.post(
    '/',
    protect,
    validate(documentValidator.create),
    documentController.create
);

router.delete('/:id', protect, documentController.remove);

module.exports = router;
