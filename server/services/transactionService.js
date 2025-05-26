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
