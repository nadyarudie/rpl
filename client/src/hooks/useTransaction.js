import { useState, useEffect } from 'react';
import { fetchTransactions, createTransaction, deleteTransaction } from '../services/transactionService'; // Import yang benar

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  const getTransactions = () => {
    fetchTransactions() // Memanggil fungsi service
      .then(res => {
        const sorted = res.data.map(tx => ({
          ...tx,
          amount: Number(tx.amount)
        })).sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sorted);
        setError(null); // Reset error jika berhasil
      })
      .catch(err => {
        console.error("Error fetching transactions:", err);
        // Mengatur pesan error yang bisa ditampilkan di UI
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
      await createTransaction(payload); // Memanggil fungsi service
      getTransactions(); // Refresh data setelah menambah
      return true;
    } catch (err) {
      console.error("Error adding transaction:", err);
      // Mengatur pesan error yang bisa ditampilkan di UI
      setError("Gagal menambah transaksi. Silakan coba lagi.");
      return false;
    }
  };

  const removeTransaction = async (id) => {
    setError(null);
    try {
      await deleteTransaction(id); // Memanggil fungsi service
      getTransactions(); // Refresh data setelah menghapus
    } catch (err) {
      console.error("Error deleting transaction:", err);
      // Mengatur pesan error yang bisa ditampilkan di UI
      setError("Gagal menghapus transaksi. Silakan coba lagi.");
    }
  };

  return {
    transactions,
    error, // Mengembalikan state error
    setError, // Mengembalikan setter error (jika ada kebutuhan untuk mengubah error dari luar hook)
    getTransactions,
    addTransaction,
    removeTransaction,
  };
}