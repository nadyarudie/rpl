// server/controllers/authController.js

const jwt = require('jsonwebtoken');
const userService = require('../services/userService'); // Impor userService

exports.register = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;

    // Validasi input
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format email tidak valid.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter.' });
    }

    // Cek apakah email atau username sudah ada melalui userService
    const existingUser = await userService.findUserByIdentity(username);
    if (!existingUser) {
      const existingUserByEmail = await userService.findUserByIdentity(email);
      if (existingUserByEmail) {
        return res.status(409).json({ message: 'Email/username sudah terpakai.' });
      }
    } else {
      return res.status(409).json({ message: 'Email/username sudah terpakai.' });
    }

    // Buat pengguna baru melalui userService (hashing sudah di service)
    const newUser = await userService.createUser({ name, email, username, password });

    // Jangan kirim password hashed kembali ke klien
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ message: 'Register berhasil!', user: userWithoutPassword });
  } catch (err) {
    if (err.message === 'Email atau username sudah terdaftar.') {
      return res.status(409).json({ message: err.message });
    }
    next(err);
  }
};

// LOGIN USER
exports.login = async (req, res, next) => {
  try {
    const { username, email, identity, password } = req.body;
    const loginIdentity = identity || username || email;

    if (!loginIdentity || !password) {
      return res.status(400).json({ message: "Username/email dan password wajib diisi." });
    }

    // Dapatkan user dari service
    const user = await userService.findUserByIdentity(loginIdentity);

    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan.' });
    }

    // Validasi password melalui service
    const isPasswordValid = await userService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'cashil_secret',
      { expiresIn: '7d' }
    );

    // Kirim respons dengan token dan informasi user (tanpa password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};