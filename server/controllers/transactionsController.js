// server/controllers/transactionController.js

const transactionService = require('../services/transactionService'); // Impor transactionService

// Mengambil semua transaksi untuk user tertentu
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.id; // Asumsi req.user.id tersedia dari middleware autentikasi
    // Panggil service layer untuk mendapatkan transaksi
    const transactions = await transactionService.getTransactionsByUserId(userId);
    // Service sudah mengembalikan instance Transaction, langsung kirim
    res.json(transactions);
  } catch (err) {
    console.error('Error in getAll transactions controller:', err);
    // Teruskan error ke middleware error handling
    next(err);
  }
};

// Membuat transaksi baru
exports.create = async (req, res, next) => {
  try {
    const userId = req.user.id; // Asumsi req.user.id tersedia
    const { title, date, amount, type } = req.body;

    // TODO: Tambahkan validasi input di sini jika diperlukan
    // Contoh: if (!title || !date || !amount || !type) { return res.status(400).json({ message: 'Missing fields' }); }

    // Panggil service layer untuk membuat transaksi
    const newTransaction = await transactionService.createTransaction({
      title,
      date,
      amount,
      type,
      userId // Pastikan nama properti cocok dengan yang diharapkan oleh service
    });

    // Service sudah mengembalikan instance Transaction yang baru dibuat
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Error in create transaction controller:', err);
    // Teruskan error ke middleware error handling
    next(err);
  }
};

// Mengupdate transaksi yang ada
exports.update = async (req, res, next) => {
  try {
    const userId = req.user.id; // Asumsi req.user.id tersedia
    const { id } = req.params; // ID transaksi dari URL params
    const { title, date, amount, type } = req.body; // Data update dari request body

    // Panggil service layer untuk mengupdate transaksi
    const updatedTransaction = await transactionService.updateTransaction(
      parseInt(id), // Pastikan ID adalah integer
      { title, date, amount, type },
      userId // Untuk otorisasi di service
    );

    if (!updatedTransaction) {
      // Jika service mengembalikan null, berarti transaksi tidak ditemukan atau user tidak berhak
      return res.status(403).json({ error: 'Akses ditolak atau transaksi tidak ditemukan.' });
    }

    // Service sudah mengembalikan instance Transaction yang diupdate
    res.json(updatedTransaction);
  } catch (err) {
    console.error('Error in update transaction controller:', err);
    // Teruskan error ke middleware error handling
    next(err);
  }
};

// Menghapus transaksi
exports.remove = async (req, res, next) => {
  try {
    const userId = req.user.id; // Asumsi req.user.id tersedia
    const { id } = req.params; // ID transaksi dari URL params

    // Panggil service layer untuk menghapus transaksi
    const success = await transactionService.deleteTransaction(parseInt(id), userId);

    if (!success) {
      // Jika service mengembalikan false, berarti transaksi tidak ditemukan atau user tidak berhak
      return res.status(403).json({ error: 'Akses ditolak atau transaksi tidak ditemukan.' });
    }

    res.json({ success: true, message: 'Transaksi berhasil dihapus.' });
  } catch (err) {
    console.error('Error in remove transaction controller:', err);
    // Teruskan error ke middleware error handling
    next(err);
  }
};