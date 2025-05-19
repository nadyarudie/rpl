import React from 'react';
import { Wallet } from 'lucide-react';

export default function Header() {
    return (
        <header
            className="
                bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700
                px-6 py-3
                text-white flex items-center gap-3
                shadow-lg
                mb-2
                w-full
                "
        >
            <Wallet size={26} className="text-white drop-shadow" />
            <div className="flex flex-col sm:flex-row sm:items-end gap-0 sm:gap-2">
                <span className="font-semibold text-[1.4rem] sm:text-2xl tracking-tight font-sans drop-shadow">
                    Cashil
                </span>
                <span className="text-sm sm:text-base font-light font-sans opacity-85 italic whitespace-nowrap tracking-wide ml-0 sm:ml-2 pb-[1px]">
                    Track your money, stay chill.
                </span>
            </div>
        </header>
    );
}
