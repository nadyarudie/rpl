const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/transactionsController');

// GET /api/transactions
router.get('/', ctrl.getAll);

// POST /api/transactions
router.post('/', ctrl.create);  //  Simplified

// PUT /api/transactions/:id
router.put('/:id', ctrl.update); // Simplified

// DELETE /api/transactions/:id
router.delete('/:id', ctrl.remove);

module.exports = router;