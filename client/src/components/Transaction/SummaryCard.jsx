import React from 'react';
import { TrendingUp, TrendingDown, FileDown } from 'lucide-react';
import { formatRupiah } from '@/lib';
import { exportToPDF } from '@/lib/export/exportUtils';

// Komponen Reusable untuk Item Ringkasan
function SummaryItem({ icon, title, value, description, color = 'green' }) {
  const bgClass = color === 'green' ? 'bg-green-50' : color === 'red' ? 'bg-red-50' : '';
  const textColor = color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-600' : '';

  return (
    <div className={`flex items-start justify-between p-3 rounded-lg ${bgClass}`}>
      <div className="flex items-center">
        {icon}
        <div>
          <p className="text-sm font-medium text-slate-700">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <p className={`font-semibold text-right ${textColor}`}>
        {formatRupiah(value)}
      </p>
    </div>
  );
}

// Tips motivasional
const TIPS = [
  'Catat setiap transaksi kecil agar tidak terlewat.',
  'Simpan setidaknya 10% dari pendapatan Anda setiap minggu.',
  'Bandingkan pengeluaran minggu ini dengan minggu lalu.',
  'Atur reminder untuk membayar tagihan tepat waktu.',
  'Tinjau kembali anggaran bulanan Anda di akhir pekan.',
];

const SummaryCard = ({ highestIncome, highestExpense, filteredTransactions }) => {
  const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-700">Ringkasan</h2>
        <button
          onClick={() => exportToPDF(filteredTransactions)}
          className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow transition"
        >
          <FileDown size={16} />
          Export PDF
        </button>
      </div>

      {/* Isi */}
      <div className="space-y-4 flex-1">
        <SummaryItem
          icon={<TrendingUp size={24} className="mr-3 text-green-600" />}
          title="Pendapatan Tertinggi"
          value={highestIncome.amount}
          description={`${highestIncome.description} (${highestIncome.date})`}
          color="green"
        />
        <SummaryItem
          icon={<TrendingDown size={24} className="mr-3 text-red-600" />}
          title="Pengeluaran Tertinggi"
          value={highestExpense.amount}
          description={`${highestExpense.description} (${highestExpense.date})`}
          color="red"
        />
      </div>

      {/* Tips */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-xs italic text-slate-500">💡 Tip: {randomTip}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
