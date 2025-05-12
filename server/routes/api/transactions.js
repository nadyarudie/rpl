const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/transactionsController');
const { validateTransactionData } = require('../../middlewares/validationMiddleware');

// GET /api/transactions
router.get('/', ctrl.getAll);

// POST /api/transactions
router.post('/', (req, res, next) => {
    const { valid, errors } = validateTransactionData(req.body);
    if (!valid) {
        const error = new Error('Invalid transaction data');
        error.errors = errors;
        error.status = 400;
        return next(error);
    }
    next();
}, ctrl.create);

// PUT /api/transactions/:id
router.put('/:id', (req, res, next) => {
    const { valid, errors } = validateTransactionData(req.body);
    if (!valid) {
        const error = new Error('Invalid transaction data');
        error.errors = errors;
        error.status = 400;
        return next(error);
    }
    next();
}, ctrl.update);

// DELETE /api/transactions/:id
router.delete('/:id', ctrl.remove);

module.exports = router;