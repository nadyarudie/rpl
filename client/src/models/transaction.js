// client/src/models/Transaction.js
class Transaction {
  constructor({ id, description, amount, type, date, category, userId }) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.type = type; // 'income' or 'expense'
    this.date = date; // Anda mungkin ingin mengonversi ini ke objek Date
    this.category = category;
    this.userId = userId;
  }

  // Contoh method yang relevan dengan transaksi
  isExpense() {
    return this.type === 'expense';
  }

  getFormattedAmount() {
    return `${this.isExpense() ? '-' : ''}Rp${this.amount.toLocaleString('id-ID')}`;
  }
}

export default Transaction;