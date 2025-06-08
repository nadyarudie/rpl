const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// REGISTER USER
exports.register = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;

    // Validasi input
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    // Validasi email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format email tidak valid.' });
    }

    // Validasi password minimal 6 karakter
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter.' });
    }

    // Cek apakah email atau username sudah ada
    const [exists] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    if (exists.length > 0) {
      return res.status(409).json({ message: 'Email/username sudah terpakai.' });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)',
      [name, email, username, hash]
    );
    res.status(201).json({ message: 'Register berhasil!' });
  } catch (err) {
    next(err);
  }
};

// LOGIN USER (bisa username/email/identity)
exports.login = async (req, res, next) => {
  try {
    const { username, email, identity, password } = req.body;
    const loginIdentity = identity || username || email;

    // Pastikan username/email dan password diisi
    if (!loginIdentity || !password) {
      return res.status(400).json({ message: "Username/email dan password wajib diisi." });
    }

    // Cek apakah username atau email terdaftar
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email=? OR username=?',
      [loginIdentity, loginIdentity]
    );
    if (users.length === 0) {
      return res.status(401).json({ message: 'User tidak ditemukan.' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'cashil_secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};
