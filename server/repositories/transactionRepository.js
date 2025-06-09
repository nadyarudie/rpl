// server/services/transactionService.js

const Transaction = require('../models/transaction'); // Tetap impor model Transaction
const TransactionRepository = require('../repositories/transactionRepository'); // Impor TransactionRepository yang baru

class TransactionService {
  /**
   * Mengambil semua transaksi untuk user tertentu dari database dan mengembalikannya sebagai instance Transaction.
   * @param {number} userId - ID pengguna yang transaksinya ingin diambil.
   * @returns {Promise<Transaction[]>} - Promise yang menyelesaikan dengan array objek Transaction.
   */
  static async getTransactionsByUserId(userId) {
    try {
      // Panggil repository untuk mendapatkan data mentah dari DB
      const transactionRows = await TransactionRepository.findByUserId(userId);

      // Map setiap baris data mentah ke instance Model Transaction
      return transactionRows.map(row => new Transaction(row));
    } catch (error) {
      console.error('Error in TransactionService.getTransactionsByUserId:', error);
      throw new Error('Failed to fetch transactions.');
    }
  }

  /**
   * Membuat transaksi baru di database dan mengembalikan instance Transaction yang telah dibuat.
   * @param {Object} transactionData - Data transaksi baru.
   * @param {string} transactionData.title
   * @param {string} transactionData.date
   * @param {number} transactionData.amount
   * @param {string} transactionData.type
   * @param {number} transactionData.userId
   * @returns {Promise<Transaction>} - Promise yang menyelesaikan dengan instance Transaction yang baru dibuat.
   */
  static async createTransaction(transactionData) {
    try {
      // Panggil repository untuk menyimpan data ke DB
      const createdTransactionData = await TransactionRepository.create(transactionData);

      // Map data yang dikembalikan oleh repository ke instance Model Transaction
      const newTransaction = new Transaction(createdTransactionData);
      
      return newTransaction;
    } catch (error) {
      console.error('Error in TransactionService.createTransaction:', error);
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
      // Panggil repository untuk menghapus transaksi
      const success = await TransactionRepository.delete(transactionId, userId);
      return success;
    } catch (error) {
      console.error('Error in TransactionService.deleteTransaction:', error);
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
      // Panggil repository untuk mengupdate transaksi
      const success = await TransactionRepository.update(transactionId, updateData, userId);

      if (!success) {
        return null; // Transaksi tidak ditemukan atau user tidak berhak
      }

      // Setelah update, ambil kembali data terbaru dari repository
      // Anda mungkin perlu menambahkan method getById di repository jika belum ada
      const updatedTransactionData = await TransactionRepository.findByIdAndUserId(transactionId, userId);
      
      if (updatedTransactionData) {
        return new Transaction(updatedTransactionData); // Map ke instance Model Transaction
      }
      return null;

    } catch (error) {
      console.error('Error in TransactionService.updateTransaction:', error);
      throw new Error('Failed to update transaction.');
    }
  }
}

module.exports = TransactionService;