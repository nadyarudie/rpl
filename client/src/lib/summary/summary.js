import { formatDate } from '../formatting/formattor';

/**
 * Mengambil data ringkasan dari transaksi: pendapatan dan pengeluaran tertinggi.
 */
export function getSummaryData(transactions) {
  let highestIncome = { amount: 0, date: '-', description: 'N/A' };
  let highestExpense = { amount: 0, date: '-', description: 'N/A' };

  transactions.forEach(tx => {
    if (tx.amount > 0 && tx.amount > highestIncome.amount) {
      highestIncome = {
        amount: tx.amount,
        date: formatDate(tx.date, { year: 'numeric', month: 'short', day: 'numeric' }),
        description: tx.title
      };
    } else if (tx.amount < 0 && Math.abs(tx.amount) > highestExpense.amount) {
      highestExpense = {
        amount: Math.abs(tx.amount),
        date: formatDate(tx.date, { year: 'numeric', month: 'short', day: 'numeric' }),
        description: tx.title
      };
    }
  });

  return { highestIncome, highestExpense };
}
