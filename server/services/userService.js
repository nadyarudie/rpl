// server/services/userService.js

const User = require('../models/user'); // Tetap impor model User
const UserRepository = require('../repositories/userRepository'); // Impor UserRepository yang baru
const bcrypt = require('bcryptjs'); // Tetap di sini untuk hashing dan perbandingan password

class UserService {
  /**
   * Mencari pengguna berdasarkan username atau email.
   * Mengembalikan instance User atau null.
   * @param {string} identity - Username atau email pengguna.
   * @returns {Promise<User|null>} - Instance User jika ditemukan, null jika tidak.
   */
  static async findUserByIdentity(identity) {
    try {
      // Panggil repository untuk mendapatkan data mentah dari DB
      const userData = await UserRepository.findByIdentity(identity);
      
      // Map data mentah dari repository ke instance Model User
      return userData ? new User(userData) : null;
    } catch (error) {
      console.error('Error in UserService.findUserByIdentity:', error);
      throw new Error('Failed to find user.');
    }
  }

  /**
   * Membuat pengguna baru di database setelah menghash password.
   * Mengembalikan instance User yang baru dibuat.
   * @param {Object} userData - Data pengguna untuk registrasi.
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.username
   * @param {string} userData.password - Kata sandi plain text.
   * @returns {Promise<User>} - Instance User yang baru dibuat.
   */
  static async createUser(userData) {
    try {
      const { name, email, username, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing password di service

      // Panggil repository untuk menyimpan data ke DB
      const createdUserData = await UserRepository.create({
        name,
        email,
        username,
        hashedPassword // Kirim password yang sudah di-hash ke repository
      });

      // Map data yang dikembalikan oleh repository ke instance Model User
      // Perhatikan bahwa `createdUserData` dari repository sudah memiliki `id` dari DB
      const newUser = new User({
        id: createdUserData.id,
        name: createdUserData.name,
        email: createdUserData.email,
        username: createdUserData.username,
        password: createdUserData.hashedPassword, // Gunakan password yang sudah di-hash
        created_at: new Date().toISOString() // Atau Anda bisa ambil dari `createdUserData` jika repository mengembalikannya
      });

      return newUser;
    } catch (error) {
      console.error('Error in UserService.createUser:', error);
      // Tangani error duplikasi jika email/username sudah ada (ini bisa datang dari repository)
      if (error.message && error.message.includes('ER_DUP_ENTRY')) { // Menangkap pesan error spesifik dari repository
        throw new Error('Email atau username sudah terdaftar.');
      }
      throw new Error('Gagal mendaftarkan pengguna.');
    }
  }

  /**
   * Memvalidasi password pengguna.
   * @param {string} plainPassword - Password plain text dari input pengguna.
   * @param {string} hashedPassword - Password hashed dari database/model.
   * @returns {Promise<boolean>} - True jika cocok, false jika tidak.
   */
  static async validatePassword(plainPassword, hashedPassword) {
    // Logika perbandingan password tetap di service, karena ini adalah logika validasi, bukan interaksi DB
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserService;