import React, { useState } from 'react';
import { ListChecks, Plus } from 'lucide-react';
import { formatDate, formatRupiah } from '../lib/formattor';

const TransactionHistory = ({
  transactions,
  selectedId,
  setSelectedId,
  deleteTransaction,
  getIconForTransaction,
  setShowModal
}) => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const years = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))];

  const filtered = transactions.filter(tx => {
    const date = new Date(tx.date);
    const monthMatch = selectedMonth === 'all' || date.getMonth() === parseInt(selectedMonth);
    const yearMatch = selectedYear === 'all' || date.getFullYear() === parseInt(selectedYear);
    return monthMatch && yearMatch;
  });

  const grouped = filtered
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((acc, tx) => {
      const date = new Date(tx.date);
      const key = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
      if (!acc[key]) acc[key] = [];
      acc[key].push(tx);
      return acc;
    }, {});

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-lg flex flex-col h-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold text-slate-700">Histori Transaksi</h2>

        <div className="flex flex-wrap gap-2">
          <select
            className="border border-slate-300 rounded px-2 py-1 text-sm"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            <option value="all">Semua Bulan</option>
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>

          <select
            className="border border-slate-300 rounded px-2 py-1 text-sm"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option value="all">Semua Tahun</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-slate-500">
          <ListChecks size={48} className="text-slate-300 mb-3" />
          <p className="text-sm">Tidak ada transaksi untuk filter yang dipilih.</p>
        </div>
      ) : (
        <ul className="space-y-3 overflow-y-auto pr-2 max-h-96">
          {Object.entries(grouped).map(([monthYear, txList]) => (
            <React.Fragment key={monthYear}>
              <div className="flex items-center gap-2 mb-2 mt-4">
                <h3 className="text-sm font-semibold text-slate-600 uppercase">{monthYear}</h3>
                <div className="flex-1 border-t border-slate-200"></div>
              </div>
              {txList.map(tx => (
                <li
                  key={tx.id}
                  className={`px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors duration-150 cursor-pointer ${selectedId === tx.id ? 'bg-slate-100' : ''}`}
                  onClick={() => setSelectedId(tx.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getIconForTransaction(tx)}
                      <div className="ml-3">
                        <p className="font-semibold text-slate-800">{tx.title}</p>
                        <p className="text-xs text-slate-500">
                          {formatDate(tx.date, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className={`font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.amount > 0 ? '+' : '-'}{formatRupiah(Math.abs(tx.amount))}
                      </p>
                      {selectedId === tx.id && (
                        <div className="mt-1 flex gap-2 justify-end">
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteTransaction(tx.id); }}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Hapus
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                            className="text-xs text-slate-500 hover:text-slate-700 font-medium"
                          >
                            Batal
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-150"
        aria-label="Tambah Transaksi"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default TransactionHistory;
