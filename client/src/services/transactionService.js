import API from '@/lib/apiClient';

export const fetchTransactions = () => API.get('/transactions');
export const createTransaction = (payload) => API.post('/transactions', payload);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
