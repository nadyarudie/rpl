// client/src/models/Transaction.js
class Transaction {
  constructor({ id, description, amount, type, date, category, userId }) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.type = type; // 'income' or 'expense'
    this.date = date; 
    this.userId = userId;
  }
}
export default Transaction;