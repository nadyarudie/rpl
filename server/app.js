const express = require('express');
const cors = require('cors');
const transactions = require('./routes/api/transactions');
const authRoutes = require('./routes/api/auth'); // ✅ Tambahkan ini
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Gunakan authRoutes sebelum middleware login
app.use('/api/auth', authRoutes); // ✅ Tambahkan ini untuk endpoint /api/auth/login dan /register

app.use(authMiddleware); // ← Ini masih digunakan untuk transaksi

app.use('/api/transactions', transactions);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler);

module.exports = app;
