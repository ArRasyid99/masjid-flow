
import React, { useState, useMemo } from 'react';
import { ViewState, Transaction, Activity, Staff } from './types';
import Sidebar from './components/Sidebar';
import FinancialChart from './components/FinancialChart';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Data Mock
  const [transactions] = useState<Transaction[]>([
    { id: '1', tanggal: '2023-10-25', tipe: 'pemasukan', sumber_kategori: 'Infaq Jumat', nominal: 1500000, keterangan: 'Hasil kotak amal jumat' },
    { id: '2', tanggal: '2023-10-26', tipe: 'pengeluaran', sumber_kategori: 'Listrik', nominal: 450000, keterangan: 'Tagihan PLN Oktober' },
    { id: '3', tanggal: '2023-10-27', tipe: 'pemasukan', sumber_kategori: 'Donasi Pembangunan', nominal: 5000000, keterangan: 'Hamba Allah' },
  ]);

  const [activities] = useState<Activity[]>([
    { id: '1', nama: 'Kajian Rutin Maghrib', tanggal: '2023-10-30', waktu: '18:15', penanggungJawab: 'Ust. Abdullah', status: 'terjadwal' },
    { id: '2', nama: 'Gotong Royong Kebersihan', tanggal: '2023-11-01', waktu: '08:00', penanggungJawab: 'Bapak Ahmad', status: 'terjadwal' },
  ]);

  const [staff] = useState<Staff[]>([
    { id: '1', nama: 'H. Sulaiman', jabatan: 'Ketua DKM', kontak: '0812345678', role: 'admin' },
    { id: '2', nama: 'M. Rizky', jabatan: 'Bendahara', kontak: '0857891234', role: 'admin' },
    { id: '3', nama: 'Siti Aminah', jabatan: 'Sekretaris', kontak: '0899123456', role: 'viewer' },
  ]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      t.sumber_kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.keterangan.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm font-medium mb-1 uppercase tracking-wider">Total Kas Masjid</p>
            <h2 className="text-3xl font-bold">Rp 45.200.000</h2>
            <div className="mt-4 inline-flex items-center text-xs bg-emerald-500 px-2 py-1 rounded-full">
              <i className="fa-solid fa-arrow-trend-up mr-1"></i> +12% dari bulan lalu
            </div>
          </div>
          <i className="fa-solid fa-sack-dollar absolute -bottom-4 -right-4 text-emerald-500/30 text-8xl transition-transform group-hover:scale-110 duration-300"></i>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Pemasukan Bulan Ini</p>
            <h2 className="text-3xl font-bold text-slate-800">Rp 6.500.000</h2>
            <p className="text-emerald-500 text-xs mt-4 font-semibold">
              <i className="fa-solid fa-circle-check mr-1"></i> Target Terlampaui
            </p>
          </div>
          <i className="fa-solid fa-arrow-down-long absolute -bottom-4 -right-4 text-emerald-50 text-8xl"></i>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Pengeluaran Bulan Ini</p>
            <h2 className="text-3xl font-bold text-slate-800">Rp 1.250.000</h2>
            <p className="text-rose-500 text-xs mt-4 font-semibold">
              <i className="fa-solid fa-circle-info mr-1"></i> 15 Transaksi Aktif
            </p>
          </div>
          <i className="fa-solid fa-arrow-up-long absolute -bottom-4 -right-4 text-slate-50 text-8xl"></i>
        </div>
      </div>

      {/* Charts & Mini Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FinancialChart />
        
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Kegiatan Terdekat</h3>
            <button onClick={() => setView('kegiatan')} className="text-emerald-600 text-sm font-semibold hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {activities.map(act => (
              <div key={act.id} className="flex items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center border border-slate-200 mr-4">
                  <span className="text-[10px] text-rose-500 font-bold uppercase leading-none">{act.tanggal.split('-')[1]}</span>
                  <span className="text-lg font-bold leading-none">{act.tanggal.split('-')[2]}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 leading-tight">{act.nama}</h4>
                  <p className="text-xs text-slate-500">{act.waktu} • PJ: {act.penanggungJawab}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded-full">Terjadwal</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderKeuangan = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Manajemen Keuangan</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 transition-colors flex items-center">
            <i className="fa-solid fa-plus mr-2"></i> Tambah Transaksi
          </button>
          <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center">
            <i className="fa-solid fa-file-export mr-2"></i> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Cari transaksi (e.g., Donasi, Listrik)..." 
              className="w-full pl-11 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Kategori / Sumber</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{t.tanggal}</td>
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">{t.sumber_kategori}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      t.tipe === 'pemasukan' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {t.tipe}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-bold text-sm ${t.tipe === 'pemasukan' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.tipe === 'pemasukan' ? '+' : '-'} Rp {t.nominal.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 italic max-w-xs truncate">{t.keterangan}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-slate-400 hover:text-emerald-600"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="p-2 text-slate-400 hover:text-rose-600"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderKegiatan = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Kalender Kegiatan</h2>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 transition-all">
          Buat Agenda Baru
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm min-h-[500px]">
            {/* Simple Mock Calendar Header */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Oktober 2023</h3>
              <div className="flex space-x-2">
                <button className="p-2 border rounded-lg hover:bg-slate-50"><i className="fa-solid fa-chevron-left"></i></button>
                <button className="p-2 border rounded-lg hover:bg-slate-50"><i className="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-lg overflow-hidden">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500 uppercase">{day}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className={`bg-white h-24 p-2 relative hover:bg-emerald-50 transition-colors cursor-pointer border border-slate-50 ${i + 1 === 25 ? 'bg-emerald-50 ring-2 ring-inset ring-emerald-200' : ''}`}>
                  <span className="text-sm font-medium text-slate-400">{i + 1}</span>
                  {i + 1 === 25 && <div className="mt-1 p-1 bg-emerald-500 text-[8px] text-white rounded font-bold truncate">Syukuran Pembangunan</div>}
                  {i + 1 === 30 && <div className="mt-1 p-1 bg-blue-500 text-[8px] text-white rounded font-bold truncate">Kajian Maghrib</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-4">Detail Kegiatan Terpilih</h3>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 text-lg">Kajian Rutin Maghrib</h4>
              <p className="text-sm text-emerald-700 mt-1 mb-4">Bersama Ust. Abdullah</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <i className="fa-solid fa-calendar w-6 text-emerald-500"></i> Senin, 30 Okt 2023
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <i className="fa-solid fa-clock w-6 text-emerald-500"></i> 18:15 - Isya
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <i className="fa-solid fa-location-dot w-6 text-emerald-500"></i> Ruang Utama Masjid
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm">
                Edit Agenda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPengurus = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Struktur Pengurus</h2>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700">
          Tambah Pengurus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map(member => (
          <div key={member.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-user-tie text-3xl text-slate-400"></i>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                member.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {member.role}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">{member.nama}</h3>
            <p className="text-emerald-600 text-sm font-semibold">{member.jabatan}</p>
            
            <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
              <div className="flex items-center text-sm text-slate-500">
                <i className="fa-solid fa-phone w-6"></i> {member.kontak}
              </div>
              <div className="flex items-center text-sm text-slate-500">
                <i className="fa-solid fa-envelope w-6"></i> email@masjid.com
              </div>
            </div>
            
            <div className="mt-6 flex space-x-2">
              <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
                Edit Profil
              </button>
              <button className="px-4 py-2 bg-slate-50 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-50 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="ml-64 p-8 transition-all duration-300">
        {/* Top Navbar */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Assalamualaikum, <span className="text-emerald-600">Admin</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Sabtu, 28 Oktober 2023 | 13 Rabi'ul Akhir 1445 H</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-emerald-600 transition-colors">
              <i className="fa-solid fa-bell text-xl"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 bg-white p-2 pr-4 rounded-xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">
                AD
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-none">Admin Utama</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">Administrator</p>
              </div>
              <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-2"></i>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {view === 'dashboard' && renderDashboard()}
        {view === 'keuangan' && renderKeuangan()}
        {view === 'kegiatan' && renderKegiatan()}
        {view === 'pengurus' && renderPengurus()}
      </main>

      {/* Footer Info (Floating) */}
      <footer className="fixed bottom-6 right-8 pointer-events-none opacity-50">
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400">E-Masjid Management v1.0.4</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
