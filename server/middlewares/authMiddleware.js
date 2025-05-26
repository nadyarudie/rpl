const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔒 Auth Header:', authHeader); // 👈 Tambahkan ini

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cashil_secret');
    console.log('✅ Token valid:', decoded); // 👈 Tambahkan ini
    req.user = {
      id: decoded.id,
      username: decoded.username,
    };
    next();
  } catch (err) {
    console.error('❌ Token invalid:', err);
    return res.status(403).json({ error: 'Token tidak valid' });
  }
};
