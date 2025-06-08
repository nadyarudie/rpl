// src/models/Transaction.js

export default class Transaction {
  /**
   * @param {Object} params
   * @param {number|string} params.id
   * @param {string} params.title
   * @param {string} params.date        — ISO string atau timestamp
   * @param {number} params.amount
   * @param {string} params.type        — 'income' atau 'expense'
   * @param {number|string} params.user_id
   */
  constructor({ id, title, date, amount, type, user_id }) {
    this.id = id;
    this.title = title;
    this.date = new Date(date);
    this.amount = amount;
    this.type = type;
    this.userId = user_id;           // sesuaikan penamaan di JS
  }
}
