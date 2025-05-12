const transactionService = require('../services/transactionService');

exports.getAll = async (req, res, next) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const newTransaction = await transactionService.createTransaction(req.body);
        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const updatedTransaction = await transactionService.updateTransaction(req.params.id, req.body);
        res.json(updatedTransaction);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await transactionService.deleteTransaction(req.params.id);
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};