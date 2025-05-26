const pool = require('../config/database');

exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, date, amount, type } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO transactions (title, date, amount, type, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, date, amount, type, userId]
    );
    const [[newTx]] = await pool.query(
      'SELECT * FROM transactions WHERE id = ?',
      [result.insertId]
    );
    res.status(201).json(newTx);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, date, amount, type } = req.body;

    const [[tx]] = await pool.query('SELECT * FROM transactions WHERE id = ?', [id]);
    if (!tx || tx.user_id !== userId) {
      return res.status(403).json({ error: 'Akses ditolak' });
    }

    await pool.execute(
      'UPDATE transactions SET title=?, date=?, amount=?, type=? WHERE id=?',
      [title, date, amount, type, id]
    );
    const [[updatedTx]] = await pool.query(
      'SELECT * FROM transactions WHERE id = ?',
      [id]
    );
    res.json(updatedTx);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const [[tx]] = await pool.query('SELECT * FROM transactions WHERE id = ?', [id]);
    if (!tx || tx.user_id !== userId) {
      return res.status(403).json({ error: 'Akses ditolak' });
    }

    await pool.execute(
      'DELETE FROM transactions WHERE id = ?',
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
