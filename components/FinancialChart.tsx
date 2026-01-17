
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', pemasukan: 4500000, pengeluaran: 3200000 },
  { name: 'Feb', pemasukan: 5200000, pengeluaran: 3800000 },
  { name: 'Mar', pemasukan: 7800000, pengeluaran: 4500000 },
  { name: 'Apr', pemasukan: 6100000, pengeluaran: 4100000 },
  { name: 'Mei', pemasukan: 5500000, pengeluaran: 3900000 },
  { name: 'Jun', pemasukan: 8900000, pengeluaran: 5200000 },
];

const FinancialChart: React.FC = () => {
  return (
    <div className="h-[350px] w-full bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
        <i className="fa-solid fa-chart-line text-emerald-500 mr-2"></i>
        Tren Keuangan (6 Bulan Terakhir)
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
            formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
          />
          <Legend verticalAlign="top" height={36}/>
          <Bar dataKey="pemasukan" fill="#10b981" radius={[6, 6, 0, 0]} name="Pemasukan" />
          <Bar dataKey="pengeluaran" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Pengeluaran" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;
