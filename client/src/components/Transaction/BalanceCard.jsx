import React from 'react';
import { formatRupiah } from '@/lib'; // ✅ benar, karena sudah diekspor lewat lib/index.js
import Lottie from 'lottie-react';
import moneyAnimation from '@/assets/money-falling.json';

const BalanceCard = ({ balance, income, expense }) => {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-xl relative overflow-hidden">
            {/* Lottie Money Falling Animation */}
            <Lottie
                animationData={moneyAnimation}
                loop={true}
                style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '-15%',
                    width: '200%',
                    height: '150%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: 0.60,
                }}
            />

            <div className="flex items-center mb-4 relative z-10">
                <span className="mr-2 text-3xl">💰</span>
                <h2 className="text-xl font-semibold">Saldo Total</h2>
            </div>
            <p className="text-4xl font-bold mb-2 relative z-10">{formatRupiah(balance)}</p>
            <div className="flex justify-between text-blue-100 mt-4 relative z-10">
                <div>
                    <p className="text-sm opacity-80">Pendapatan</p>
                    <p className="text-lg font-semibold">{formatRupiah(income)}</p>
                </div>
                <div>
                    <p className="text-sm opacity-80">Pengeluaran</p>
                    <p className="text-lg font-semibold">{formatRupiah(expense)}</p>
                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
