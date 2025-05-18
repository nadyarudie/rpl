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