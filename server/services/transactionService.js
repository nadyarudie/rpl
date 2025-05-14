const pool = require('../config/database');
const Transaction = require('../models/transaction');
const { validateTransactionData } = require('../middlewares/validationMiddleware');

exports.getAllTransactions = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM transactions ORDER BY id DESC');
        // Ubah setiap row menjadi instance dari model Transaction
        return rows.map(row => new Transaction(row));
    } catch (error) {
        throw error;
    }
};

exports.createTransaction = async (transactionData) => {
    try {
        const { valid, errors } = validateTransactionData(transactionData);
        if (!valid) {
            const error = new Error('Invalid transaction data');
            error.errors = errors;
            error.status = 400;
            throw error;
        }

        const { title, date, amount, type } = transactionData;
        const [result] = await pool.execute(
            'INSERT INTO transactions (title, date, amount, type) VALUES (?, ?, ?, ?)',
            [title, date, amount, type]
        );

        const [[newTx]] = await pool.query('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
        return new Transaction(newTx); // ← pakai model di sini
    } catch (error) {
        throw error;
    }
};

exports.updateTransaction = async (id, transactionData) => {
    try {
        const { valid, errors } = validateTransactionData(transactionData);
        if (!valid) {
            const error = new Error('Invalid transaction data');
            error.errors = errors;
            error.status = 400;
            throw error;
        }

        const { title, date, amount, type } = transactionData;
        await pool.execute(
            'UPDATE transactions SET title=?, date=?, amount=?, type=? WHERE id=?',
            [title, date, amount, type, id]
        );

        const [[updatedTx]] = await pool.query('SELECT * FROM transactions WHERE id = ?', [id]);
        return new Transaction(updatedTx); // ← pakai model di sini
    } catch (error) {
        throw error;
    }
};

exports.deleteTransaction = async (id) => {
    try {
        await pool.execute('DELETE FROM transactions WHERE id = ?', [id]);
        return { success: true };
    } catch (error) {
        throw error;
    }
};
