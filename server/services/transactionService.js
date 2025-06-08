<<<<<<< HEAD
const pool = require('../config/database');
const Transaction = require('../models/transaction');
const { ValidationError } = require('../utils/errors');  //  Assuming you create this

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
            throw new ValidationError('Invalid transaction data', errors);  // Use ValidationError
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
            throw new ValidationError('Invalid transaction data', errors); // Use ValidationError
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
    } catch (error) {
        throw error;
    }
};

const validateTransactionData = (data) => {
    const errors = {};
    let valid = true;

    if (!data.title || data.title.trim() === '') {
        errors.title = 'Title is required';
        valid = false;
    }

    if (!data.date) {
        errors.date = 'Date is required';
        valid = false;
    } else {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
            errors.date = 'Date must be in YYYY-MM-DD format';
            valid = false;
        }
    }

    if (data.amount === undefined || data.amount === null) {
        errors.amount = 'Amount is required';
        valid = false;
    } else if (typeof data.amount !== 'number') {
        errors.amount = 'Amount must be a number';
        valid = false;
    }

    if (!data.type || !['income', 'expense'].includes(data.type.toLowerCase())) {
        errors.type = 'Type must be either "income" or "expense"';
        valid = false;
    }

    return { valid, errors };
};
=======
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ✅ Tambahkan interceptor agar Authorization: Bearer <token> otomatis
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Fungsi transaksi
export const fetchTransactions = () => API.get('/transactions');
export const createTransaction = (payload) => API.post('/transactions', payload);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
>>>>>>> f2e40f4 (Initial commit for cash project)
