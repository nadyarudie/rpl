import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatRupiah } from '../lib/formattor';

const SummaryCard = ({ highestIncome, highestExpense }) => {
    // Daftar tips keuangan
    const tips = [
        'Catat setiap transaksi kecil agar tidak terlewat.',
        'Simpan setidaknya 10% dari pendapatan Anda setiap minggu.',
        'Bandingkan pengeluaran minggu ini dengan minggu lalu.',
        'Atur reminder untuk membayar tagihan tepat waktu.',
        'Tinjau kembali anggaran bulanan Anda di akhir pekan.',
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between h-full">
            <h2 className="text-xl font-semibold mb-4 text-slate-700">Ringkasan</h2>
            <div className="space-y-4 flex-1">
                <div className="flex items-start justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                        <TrendingUp size={24} className="mr-3 text-green-600" />
                        <div>
                            <p className="text-sm font-medium text-slate-700">Pendapatan Tertinggi</p>
                            <p className="text-xs text-slate-500">
                                {highestIncome.description} ({highestIncome.date})
                            </p>
                        </div>
                    </div>
                    <p className="font-semibold text-green-600 text-right">
                        {formatRupiah(highestIncome.amount)}
                    </p>
                </div>
                <div className="flex items-start justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                        <TrendingDown size={24} className="mr-3 text-red-600" />
                        <div>
                            <p className="text-sm font-medium text-slate-700">Pengeluaran Tertinggi</p>
                            <p className="text-xs text-slate-500">
                                {highestExpense.description} ({highestExpense.date})
                            </p>
                        </div>
                    </div>
                    <p className="font-semibold text-red-600 text-right">
                        {formatRupiah(highestExpense.amount)}
                    </p>
                </div>
            </div>

            {/* Tips keuangan */}
            <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs italic text-slate-500">💡 Tip: {randomTip}</p>
            </div>
        </div>
    );
};

export default SummaryCard;