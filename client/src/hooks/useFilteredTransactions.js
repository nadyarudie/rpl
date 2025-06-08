import { useState, useMemo } from "react";

export default function useFilteredTransactions(transactions) {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const years = useMemo(() => {
    const allYears = transactions.map(tx => new Date(tx.date).getFullYear());
    return [...new Set(allYears)];
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter(tx => {
      const date = new Date(tx.date);
      const matchMonth = selectedMonth === 'all' || date.getMonth() === parseInt(selectedMonth);
      const matchYear = selectedYear === 'all' || date.getFullYear() === parseInt(selectedYear);
      return matchMonth && matchYear;
    });
  }, [transactions, selectedMonth, selectedYear]);

  return {
    filtered,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    years
  };
}
