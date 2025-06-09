// server/services/transactionService.js

const db = require('../config/database'); // Asumsikan ini adalah koneksi database Anda
const Transaction = require('../models/transaction'); // Impor model Transaction

class TransactionService {
  /**
   * Mengambil semua transaksi untuk user tertentu dari database dan mengembalikannya sebagai instance Transaction.
   * @param {number} userId - ID pengguna yang transaksinya ingin diambil.
   * @returns {Promise<Transaction[]>} - Promise yang menyelesaikan dengan array objek Transaction.
   */
  static async getTransactionsByUserId(userId) {
    try {
      // Query database untuk mengambil transaksi berdasarkan user_id
      const [rows] = await db.query('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [userId]);

      // Map setiap baris hasil ke instance model Transaction
      // Constructor model Transaction akan menangani konversi tipe data (misalnya date string ke Date object)
      return rows.map(row => new Transaction(row));
    } catch (error) {
      console.error('Error fetching transactions by user ID:', error);
      throw new Error('Failed to fetch transactions.');
    }
  }

  /**
   * Membuat transaksi baru di database dan mengembalikan instance Transaction yang telah dibuat.
   * @param {Object} transactionData - Data transaksi baru.
   * @param {string} transactionData.title - Judul transaksi.
   * @param {string} transactionData.date - Tanggal transaksi (string, akan dikonversi di model).
   * @param {number} transactionData.amount - Jumlah transaksi.
   * @param {string} transactionData.type - Tipe transaksi (e.g., 'income', 'expense').
   * @param {number} transactionData.userId - ID pengguna yang memiliki transaksi ini.
   * @returns {Promise<Transaction>} - Promise yang menyelesaikan dengan instance Transaction yang baru dibuat.
   */
  static async createTransaction(transactionData) {
    try {
      // Pastikan data yang masuk sesuai dengan yang diharapkan oleh model dan database
      const { title, date, amount, type, userId } = transactionData;

      // Catatan: Karena model Anda mengkonversi `date` menjadi `Date` object,
      // saat menyimpan ke DB, pastikan format `date` adalah yang bisa diterima DB (misal YYYY-MM-DD HH:MM:SS)
      // Jika model Anda menerima string 'date' dari DB, dan Anda memberikannya string saat membuat, itu akan baik-baik saja.
      // Jika DB mengharapkan Date object, Anda mungkin perlu mengkonversinya.

      const [result] = await db.query(
        'INSERT INTO transactions (title, date, amount, type, user_id) VALUES (?, ?, ?, ?, ?)',
        [title, date, amount, type, userId]
      );

      // Setelah berhasil disimpan, buat instance Transaction dengan data lengkap,
      // termasuk ID yang dihasilkan dari database.
      // Gunakan 'date' asli yang diterima atau tanggal dari DB jika ada timestamp default.
      const newTransaction = new Transaction({
        id: result.insertId, // ID yang dihasilkan oleh database
        title,
        date, // Gunakan string date asli atau ambil dari DB jika disisipkan
        amount,
        type,
        user_id: userId // Sesuaikan dengan nama kolom di model constructor
      });

      return newTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction.');
    }
  }

  /**
   * Menghapus transaksi dari database berdasarkan ID.
   * @param {number} transactionId - ID transaksi yang akan dihapus.
   * @param {number} userId - ID pengguna yang memiliki transaksi (untuk memastikan otorisasi).
   * @returns {Promise<boolean>} - Promise yang menyelesaikan true jika berhasil dihapus, false jika tidak ditemukan atau tidak berhak.
   */
  static async deleteTransaction(transactionId, userId) {
    try {
      // Hapus transaksi hanya jika user_id cocok (otorisasi)
      const [result] = await db.query('DELETE FROM transactions WHERE id = ? AND user_id = ?', [transactionId, userId]);

      // affectedRows > 0 berarti ada baris yang dihapus
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw new Error('Failed to delete transaction.');
    }
  }

  /**
   * Mengupdate transaksi di database.
   * @param {number} transactionId - ID transaksi yang akan diupdate.
   * @param {Object} updateData - Data yang akan diupdate pada transaksi.
   * @param {string} updateData.title
   * @param {string} updateData.date
   * @param {number} updateData.amount
   * @param {string} updateData.type
   * @param {number} userId - ID pengguna yang memiliki transaksi (untuk otorisasi).
   * @returns {Promise<Transaction|null>} - Promise yang menyelesaikan dengan instance Transaction yang diupdate, atau null jika tidak ditemukan.
   */
  static async updateTransaction(transactionId, updateData, userId) {
    try {
      const { title, date, amount, type } = updateData;

      const [result] = await db.query(
        'UPDATE transactions SET title = ?, date = ?, amount = ?, type = ? WHERE id = ? AND user_id = ?',
        [title, date, amount, type, transactionId, userId]
      );

      if (result.affectedRows === 0) {
        return null; // Transaksi tidak ditemukan atau user tidak berhak
      }

      // Setelah update, ambil kembali transaksi yang diupdate untuk mengembalikan instance model yang akurat
      // Atau, jika Anda yakin data input cocok, Anda bisa membuat instance baru:
      // const updatedTransaction = new Transaction({ id: transactionId, ...updateData, user_id: userId });
      // return updatedTransaction;

      // Lebih aman untuk mengambil data terbaru dari DB
      const [updatedRows] = await db.query('SELECT * FROM transactions WHERE id = ?', [transactionId]);
      if (updatedRows.length > 0) {
        return new Transaction(updatedRows[0]);
      }
      return null;

    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new Error('Failed to update transaction.');
    }
  }
}

module.exports = TransactionService;