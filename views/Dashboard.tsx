
import React from 'react';
import { Subject, Recommendation } from '../types';

interface DashboardProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
  recommendations: Recommendation[];
  onRecAction: (rec: Recommendation) => void;
  isAnalyzing?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ subjects, onSelectSubject, recommendations, onRecAction, isAnalyzing }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-500 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-100">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-6 backdrop-blur-md">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
              SEMESTER GENAP • 2024/2025
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Siap Taklukkan <br/>Ujian Nasional? 🚀
            </h1>
            <p className="text-blue-50 text-lg mb-8 opacity-90">
              Dapatkan akses ke ribuan video materi, latihan soal adaptif, dan tryout nasional terakurat.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="bg-amber-400 text-blue-900 px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-amber-300 transform hover:-translate-y-1 transition-all">
                Mulai Tryout Gratis
              </button>
              <button className="bg-white/10 border border-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all">
                Cek Peringkat
              </button>
            </div>
          </div>
          <div className="hidden lg:block w-72 h-72 bg-white/10 rounded-full relative">
             <div className="absolute inset-4 bg-white/20 rounded-full flex items-center justify-center text-8xl">🎓</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </section>

      {/* Recommended for You */}
      {recommendations.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Rekomendasi Belajarmu 🪄</h2>
              <p className="text-slate-500 text-sm">AI telah menyiapkan materi berdasarkan hasil belajarmu</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group relative">
                <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${rec.type === 'PRACTICE' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                  {rec.type === 'PRACTICE' ? '📝' : '📖'}
                </div>
                <p className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest">{rec.targetTopic}</p>
                <h3 className="text-xl font-black text-slate-800 mb-2">{rec.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{rec.description}</p>
                <button 
                  onClick={() => onRecAction(rec)}
                  className="w-full bg-slate-50 text-blue-600 py-3.5 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all border border-blue-50"
                >
                  {rec.actionLabel}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Subjects Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-800">Materi Kelas 9 📚</h2>
          <button className="text-sm font-bold text-blue-600 hover:underline">Lihat Semua Materi →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {subjects.map((subject) => (
            <div 
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl ${subject.color} flex items-center justify-center text-3xl shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                {subject.icon}
              </div>
              <h3 className="text-center font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{subject.name}</h3>
              <div className="flex items-center justify-center gap-1 mb-4">
                 <span className="text-[10px] text-slate-400 font-bold uppercase">{subject.completedModules}/{subject.totalModules} BAB</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${subject.color} transition-all duration-1000`} 
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <p className="text-center text-[10px] font-black text-slate-400 mt-2">{subject.progress}% Selesai</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-slate-800 mb-2">Peringkat Tryout Nasional 🏆</h3>
            <p className="text-slate-500 mb-8 max-w-xs">Lihat posisimu dibandingkan dengan ribuan siswa lainnya di seluruh Indonesia.</p>
            <div className="space-y-4 mb-8">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-lg font-black text-blue-600 w-6">#{i}</span>
                    <div className="w-10 h-10 bg-white rounded-full border border-slate-200"></div>
                    <div className="flex-1"><p className="text-sm font-bold">Siswa Berprestasi {i}</p></div>
                    <p className="text-sm font-black text-slate-800">98.5</p>
                 </div>
               ))}
            </div>
            <button className="text-blue-600 font-black text-sm flex items-center gap-2">
              Lihat Leaderboard Lengkap <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
        </div>

        <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-100">
           <div>
             <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-md border border-white/20">🔥</div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs font-black tracking-widest uppercase">My Streak</p>
                  <p className="text-4xl font-black">7 HARI</p>
                </div>
             </div>
             <h3 className="text-2xl font-black mb-4 leading-tight">Misi Harian: <br/>Kuasai 2 Topik Lagi!</h3>
             <p className="text-blue-100 text-sm mb-8 opacity-80 leading-relaxed">Selesaikan misi ini untuk mendapatkan bonus 500 ProCoins dan lencana "Konsisten Belajar".</p>
           </div>
           <button className="w-full bg-white text-blue-600 py-5 rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
             Ambil Misi Sekarang
           </button>
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
