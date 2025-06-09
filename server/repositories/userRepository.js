// server/repositories/userRepository.js

const db = require('../config/database'); // Sesuaikan path jika berbeda

class UserRepository {
  /**
   * Mencari satu pengguna berdasarkan ID.
   * @param {number} id - ID pengguna.
   * @returns {Promise<Object|null>} Objek data pengguna mentah dari DB, atau null jika tidak ditemukan.
   */
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error in UserRepository.findById:', error);
      throw new Error('Failed to find user by ID.');
    }
  }

  /**
   * Mencari satu pengguna berdasarkan username atau email.
   * @param {string} identity - Username atau email pengguna.
   * @returns {Promise<Object|null>} Objek data pengguna mentah dari DB, atau null jika tidak ditemukan.
   */
  static async findByIdentity(identity) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ? OR username = ?',
        [identity, identity]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error in UserRepository.findByIdentity:', error);
      throw new Error('Failed to find user by identity.');
    }
  }

  /**
   * Membuat pengguna baru di database.
   * @param {Object} userData - Data pengguna untuk disimpan.
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.username
   * @param {string} userData.hashedPassword - Password yang sudah di-hash.
   * @returns {Promise<Object>} Data pengguna yang disisipkan (termasuk ID yang dihasilkan).
   */
  static async create(userData) {
    try {
      const { name, email, username, hashedPassword } = userData;
      const [result] = await db.query(
        'INSERT INTO users (name, email, username, password, created_at) VALUES (?, ?, ?, ?, NOW())',
        [name, email, username, hashedPassword]
      );
      return { id: result.insertId, ...userData, password: hashedPassword }; // Mengembalikan data yang disisipkan
    } catch (error) {
      console.error('Error in UserRepository.create:', error);
      throw error; // Biarkan service atau controller menangani error duplikasi
    }
  }

  /**
   * Mengupdate data pengguna.
   * @param {number} id - ID pengguna yang akan diupdate.
   * @param {Object} updateData - Data yang akan diupdate.
   * @returns {Promise<boolean>} True jika update berhasil, false jika tidak ada baris yang terpengaruh.
   */
  static async update(id, updateData) {
    try {
      const { name, email, username, hashedPassword } = updateData;
      const fields = [];
      const values = [];

      if (name) { fields.push('name = ?'); values.push(name); }
      if (email) { fields.push('email = ?'); values.push(email); }
      if (username) { fields.push('username = ?'); values.push(username); }
      if (hashedPassword) { fields.push('password = ?'); values.push(hashedPassword); }

      if (fields.length === 0) {
        return false; // Tidak ada yang diupdate
      }

      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      values.push(id);

      const [result] = await db.query(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in UserRepository.update:', error);
      throw error;
    }
  }

  /**
   * Menghapus pengguna dari database.
   * @param {number} id - ID pengguna yang akan dihapus.
   * @returns {Promise<boolean>} True jika penghapusan berhasil, false jika tidak ada baris yang terpengaruh.
   */
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in UserRepository.delete:', error);
      throw new Error('Failed to delete user.');
    }
  }
}

module.exports = UserRepository;