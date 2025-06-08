import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const processChartData = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    const dailyDataReducer = transactions.reduce((acc, tx) => {
        let date;
        try {
            const dateObj = new Date(tx.date);
            if (isNaN(dateObj.getTime())) return acc;

            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            date = `${year}-${month}-${day}`;
        } catch (error) {
            return acc;
        }

        if (!acc[date]) {
            acc[date] = { income: 0, expenses: 0 };
        }

        if (tx.amount > 0) {
            acc[date].income += tx.amount;
        } else {
            acc[date].expenses += Math.abs(tx.amount);
        }
        return acc;
    }, {});

    const chartData = Object.keys(dailyDataReducer)
        .map(date => {
            let formattedDate = "Invalid Date";
            try {
                const localDateForDisplay = new Date(date);
                if (isNaN(localDateForDisplay.getTime())) return { name: "Invalid Date", income: 0, expenses: 0, fullDate: date };
                formattedDate = localDateForDisplay.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
                return {
                    name: formattedDate,
                    income: dailyDataReducer[date].income,
                    expenses: dailyDataReducer[date].expenses,
                    fullDate: date,
                };
            } catch (error) {
                return { name: "Invalid Date", income: 0, expenses: 0, fullDate: date };
            }
        })
        .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

    return chartData;
};

const ChartComponent = ({ transactions }) => {
    const chartDisplayData = processChartData(transactions);

    if (chartDisplayData.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-500 p-4 text-center">
                Data transaksi tidak cukup untuk menampilkan grafik.
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={chartDisplayData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                    axisLine={{ stroke: '#D1D5DB' }}
                    tickLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis
                    tickFormatter={(value) => `Rp${value.toLocaleString('id-ID')}`}
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                    axisLine={{ stroke: '#D1D5DB' }}
                    tickLine={{ stroke: '#D1D5DB' }}
                    width={50}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', padding: '8px 12px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: 6, fontSize: 13 }}
                    itemStyle={{ color: '#374151', fontSize: 12 }}
                    formatter={(value, name) => [`Rp${value.toLocaleString('id-ID')}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Line type="monotone" dataKey="income" name="Pendapatan" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 1, stroke: '#FFFFFF' }} activeDot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#FFFFFF' }} />
                <Line type="monotone" dataKey="expenses" name="Pengeluaran" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 1, stroke: '#FFFFFF' }} activeDot={{ r: 6, fill: '#8B5CF6', strokeWidth: 2, stroke: '#FFFFFF' }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ChartComponent;