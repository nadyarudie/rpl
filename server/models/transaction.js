// server/models/transaction.js

class Transaction {
  /**
   * @param {Object} params
   * @param {number} params.id
   * @param {string} params.title
   * @param {string} params.date        — string dari DB
   * @param {number} params.amount
   * @param {string} params.type
   * @param {number} params.user_id
   */
  constructor({ id, title, date, amount, type, user_id }) {
    this.id = id;
    this.title = title;
    this.date = new Date(date);
    this.amount = amount;
    this.type = type;
    this.userId = user_id;
  }
}

module.exports = Transaction;
class Transaction {
  constructor({ id, title, date, amount, type }) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.amount = amount;
    this.type = type;
  }
}

module.exports = Transaction;