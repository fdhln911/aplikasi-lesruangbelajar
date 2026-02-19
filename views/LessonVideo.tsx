
import React, { useState } from 'react';

interface LessonVideoProps {
  chapter: string;
  topic: string;
  onFinish: () => void;
  onBack: () => void;
}

const LessonVideo: React.FC<LessonVideoProps> = ({ chapter, topic, onFinish, onBack }) => {
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'NOTES'>('CONTENT');

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-right duration-500 pb-20">
      <div className="flex items-center justify-between">
         <button onClick={onBack} className="flex items-center gap-2 font-black text-slate-500 hover:text-blue-600 transition-colors">
            ← Kembali ke Syllabus
         </button>
         <div className="text-right">
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{chapter}</p>
            <h2 className="text-xl font-black text-slate-800">{topic}</h2>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
           {/* Mock Video Player */}
           <div className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative group border-4 border-slate-800">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer">
                   ▶️
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                 <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 h-full w-1/3"></div>
                 </div>
                 <div className="flex items-center justify-between text-white text-sm font-bold">
                    <span>12:45 / 25:00</span>
                    <div className="flex gap-4">
                       <span>⚙️</span>
                       <span>📺</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-800 mb-6">Deskripsi Materi</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                Dalam sesi ini, kita akan mempelajari bagaimana cara menerapkan konsep variabel dalam kehidupan sehari-hari. 
                Siswa diharapkan mampu mengidentifikasi komponen-komponen utama dalam sebuah persamaan linear sederhana.
              </p>
              <div className="flex gap-4">
                 <div className="bg-blue-50 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <span className="text-2xl">📥</span>
                    <div>
                       <p className="text-sm font-black text-blue-700">Rangkuman Materi</p>
                       <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">PDF • 2.4 MB</p>
                    </div>
                 </div>
                 <div className="bg-amber-50 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                       <p className="text-sm font-black text-amber-700">Tanya Tutor AI</p>
                       <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">AKTIF SEKARANG</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-[600px] flex flex-col">
              <div className="flex border-b border-slate-100">
                 <button 
                  onClick={() => setActiveTab('CONTENT')}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-widest ${activeTab === 'CONTENT' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                   Daftar Sesi
                 </button>
                 <button 
                  onClick={() => setActiveTab('NOTES')}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-widest ${activeTab === 'NOTES' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                   Catatanku
                 </button>
              </div>
              
              <div className="flex-1 overflow-auto p-6">
                 {activeTab === 'CONTENT' ? (
                    <div className="space-y-4">
                       {[1,2,3,4,5].map(i => (
                          <div key={i} className={`p-4 rounded-2xl border flex gap-4 items-center transition-all ${i === 1 ? 'border-blue-600 bg-blue-50' : 'border-slate-50 hover:bg-slate-50 cursor-pointer'}`}>
                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${i === 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{i}</div>
                             <div>
                                <p className={`text-xs font-bold ${i === 1 ? 'text-blue-700' : 'text-slate-700'}`}>Segmen {i}: Perkenalan Konsep</p>
                                <p className="text-[10px] text-slate-400 font-bold">04:30</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 ) : (
                    <div className="space-y-4">
                       <textarea 
                        placeholder="Tulis catatan pentingmu di sini..." 
                        className="w-full h-80 bg-slate-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                       />
                       <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-xs">Simpan Catatan</button>
                    </div>
                 )}
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                 <button 
                  onClick={onFinish}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                 >
                   <span>✅</span> Selesaikan & Lanjut Kuis
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LessonVideo;
