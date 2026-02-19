
import React from 'react';
import { AppState } from '../types';

interface SidebarProps {
  activeState: AppState;
  onNavigate: (state: AppState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeState, onNavigate }) => {
  const menuItems = [
    { id: AppState.DASHBOARD, label: 'Beranda', icon: '🏠' },
    { id: AppState.COURSE_DETAIL, label: 'Materi Saya', icon: '📚' },
    { id: AppState.TRYOUT, label: 'Tryout', icon: '🏆' },
    { id: 'CHAT', label: 'Tanya Robot', icon: '🤖' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200">
      <div className="p-8">
        <div className="bg-blue-50 rounded-[2rem] p-6 text-center border border-blue-100 group cursor-pointer hover:bg-blue-100 transition-all">
           <div className="w-16 h-16 bg-blue-600 rounded-[1.25rem] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200">RP</div>
           <p className="font-black text-slate-800">RuangPro</p>
           <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Siswa Terverifikasi</p>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => typeof item.id === 'string' ? {} : onNavigate(item.id as AppState)}
            className={`w-full flex items-center px-6 py-4 rounded-2xl transition-all duration-300 ${
              activeState === item.id 
                ? 'bg-blue-600 text-white font-black shadow-xl shadow-blue-100 scale-105' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600 font-bold'
            }`}
          >
            <span className="text-xl mr-4">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-100">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-3">Upgrade ke Pro</p>
            <p className="text-lg font-black mb-6 leading-snug">Dapatkan akses ke 50.000+ Video Materi!</p>
            <button className="w-full bg-amber-400 text-blue-900 py-3.5 rounded-xl text-xs font-black shadow-lg hover:bg-amber-300 transition-all">
              Beli Paket Belajar
            </button>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
