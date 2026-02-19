
import React from 'react';
import { AppState } from '../types';

interface NavbarProps {
    onNavigate: (state: AppState) => void;
    coins: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, coins }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center space-x-8">
        <div 
          className="text-2xl font-black text-blue-600 cursor-pointer flex items-center gap-2" 
          onClick={() => onNavigate(AppState.DASHBOARD)}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs">RP</div>
          RuangPro
        </div>
        
        <div className="relative hidden lg:block">
          <input 
            type="text" 
            placeholder="Mau belajar apa hari ini?" 
            className="w-96 bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all"
          />
          <span className="absolute right-4 top-3 text-slate-400">🔍</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
          <span className="text-xl mr-2">🪙</span>
          <span className="text-sm font-bold text-amber-700">{coins.toLocaleString()} Coins</span>
        </div>

        <button className="p-2.5 text-slate-400 hover:text-blue-600 transition-colors relative bg-slate-50 rounded-xl">
          <span className="text-xl">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-10 w-px bg-slate-200 mx-2"></div>

        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">Budi Santoso</p>
            <div className="flex items-center gap-1">
               <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">LEVEL 12</span>
               <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">9 SMP • IPS</p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/user/100" 
              alt="Profile" 
              className="w-11 h-11 rounded-xl border-2 border-white shadow-sm group-hover:border-blue-400 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
