
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Ringkasan' },
    { id: 'keuangan', icon: 'fa-wallet', label: 'Keuangan' },
    { id: 'kegiatan', icon: 'fa-calendar-check', label: 'Kegiatan' },
    { id: 'pengurus', icon: 'fa-users-gear', label: 'Pengurus' },
  ];

  return (
    <div className="w-64 bg-emerald-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
          <i className="fa-solid fa-mosque text-white text-xl"></i>
        </div>
        <span className="text-xl font-bold tracking-tight">E-Masjid</span>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id 
              ? 'bg-emerald-500 text-white shadow-lg' 
              : 'text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-emerald-800">
        <div className="bg-emerald-800/50 p-4 rounded-xl">
          <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider mb-1">Status Masjid</p>
          <p className="text-sm font-medium">Baiturrahman Al-Ikhlas</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
