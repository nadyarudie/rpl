import React, { useState, useEffect } from "react";

// Komponen utama
import AddTransactionModal from "@/components/Transaction/AddTransactionModal";
import BalanceCard from "@/components/Transaction/BalanceCard";
import SummaryCard from "@/components/Transaction/SummaryCard";
import ChartComponent from "@/components/Chart/ChartComponent";
import TransactionHistory from "@/components/Transaction/TransactionHistory";
import Header from "@/components/Header";

// Ikon
import { ArrowUpCircle, ArrowDownCircle, AlertTriangle } from "lucide-react";

// Utilitas & hooks
import { sum } from "@/lib/math/calculator";
import { getSummaryData } from "@/lib/summary/summary";
import useTransactions from "@/hooks/useTransaction";

export default function Dashboard() {
  const {
    transactions,
    error: apiError,
    setError: setApiError,
    addTransaction,
    removeTransaction,
  } = useTransactions();

  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: "Income",
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const balance = sum(filteredTransactions.map(tx => tx.amount));
  const income = sum(filteredTransactions.filter(t => t.amount > 0).map(t => t.amount));
  const expense = sum(filteredTransactions.filter(t => t.amount < 0).map(t => Math.abs(t.amount)));

  const handleAdd = async (e) => {
    e.preventDefault();
    const success = await addTransaction(form);
    if (success) {
      setShowModal(false);
      setForm({
        type: "Income",
        title: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
      setSelectedId(null);
    }
  };

  const handleDelete = (id) => {
    removeTransaction(id);
    setSelectedId(null);
  };

  const { highestIncome, highestExpense } = getSummaryData(filteredTransactions);

  const getIconForTransaction = (transaction) =>
    transaction.amount > 0 ? (
      <ArrowUpCircle className="text-green-500" size={20} />
    ) : (
      <ArrowDownCircle className="text-red-500" size={20} />
    );

  return (
    <div className="h-[100dvh] bg-slate-100 flex flex-col font-sans overflow-hidden">
      <Header />
      <main className="flex-grow p-4 lg:p-6 pb-20"> {/* ✅ tambahkan padding bawah */}
        {apiError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertTriangle size={20} className="mr-2" />
            {apiError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kiri: Balance dan History */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <BalanceCard balance={balance} income={income} expense={expense} />
            <div className="flex-grow min-h-[300px] lg:min-h-0">
              <TransactionHistory
                transactions={transactions}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                deleteTransaction={handleDelete}
                getIconForTransaction={getIconForTransaction}
                setShowModal={setShowModal}
                setFilteredTransactions={setFilteredTransactions}
              />
            </div>
          </div>

          {/* Kanan: Chart dan Ringkasan */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-1 text-slate-700">
                Pendapatan vs. Pengeluaran
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-sm text-slate-600">Pendapatan</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-sm text-slate-600">Pengeluaran</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ChartComponent transactions={filteredTransactions} />
              </div>
            </div>

            <SummaryCard
              highestIncome={highestIncome}
              highestExpense={highestExpense}
              filteredTransactions={filteredTransactions}
            />
          </div>
        </div>
      </main>

      {/* Modal Tambah */}
      {showModal && (
        <AddTransactionModal
          setShowModal={setShowModal}
          apiError={apiError}
          addTransaction={handleAdd}
          form={form}
          setForm={setForm}
        />
      )}
    </div>
  );
}
