const express = require('express');
const cors = require('cors');
const transactionsRoutes = require('./routes/api/transactions');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRoutes);

app.use(errorHandler);

module.exports = app;