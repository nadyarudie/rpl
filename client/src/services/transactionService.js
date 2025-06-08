// client/src/services/transactionService.js
import API from '@/lib/apiClient';

export const fetchTransactions = () => API.get('/transactions'); // Pastikan tidak ada '/api' di sini
export const createTransaction = (payload) => API.post('/transactions', payload); // Pastikan tidak ada '/api' di sini
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`); // Pastikan tidak ada '/api' di sini
