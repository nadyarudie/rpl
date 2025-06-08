import { useState, useEffect } from 'react';
import { fetchTransactions, createTransaction, deleteTransaction } from '../services/transactionService';

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const getTransactions = () => {
    fetchTransactions()
      .then(res => {
        const sorted = res.data.map(tx => ({
          ...tx,
          amount: Number(tx.amount)
        })).sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sorted);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching transactions:", err);
        setError("Gagal memuat transaksi. Pastikan server backend berjalan.");
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const addTransaction = async (form) => {
    setError(null);
    const payload = {
      title: form.title,
      date: form.date,
      amount: form.type === 'Income' ? parseFloat(form.amount) : -parseFloat(form.amount),
      type: form.type.toLowerCase(),
    };

    try {
      await createTransaction(payload);
      getTransactions();
      return true;
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Gagal menambah transaksi. Silakan coba lagi.");
      return false;
    }
  };

  const removeTransaction = async (id) => {
    setError(null);
    try {
      await deleteTransaction(id);
      getTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Gagal menghapus transaksi. Silakan coba lagi.");
    }
  };

  return {
    transactions,
    error,
    setError,
    getTransactions,
    addTransaction,
    removeTransaction,
  };
}
