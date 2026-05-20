const express = require('express');
const { validate } = require('../middleware/validate');
const documentValidator = require('../validations/document.validation');
const documentController = require('../controllers/document.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.get('/', documentController.getAll);

router.get('/mine', protect, documentController.getMine);

router.get('/admin/pending', protect, admin, documentController.getPending);
router.put('/admin/:id/status', protect, admin, documentController.updateStatus);
router.post('/admin/:id/ai-review', protect, admin, documentController.aiReview);

router.get('/:id', documentController.getById);

router.post(
    '/',
    protect,
    upload.single('file'),
    validate(documentValidator.create),
    documentController.create
);

router.delete('/:id', protect, documentController.remove);

module.exports = router;
