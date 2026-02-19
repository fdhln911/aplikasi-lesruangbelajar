
import React, { useState } from 'react';
import { Subject, Chapter } from '../types';

interface CourseDetailProps {
  subject: Subject;
  onStartLesson: (chapter: string, module: string) => void;
  onStartTryout: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ subject, onStartLesson, onStartTryout }) => {
  const syllabus: Chapter[] = [
    {
      id: 'c1',
      title: 'Bab 1: Persamaan & Pertidaksamaan Linear',
      modules: [
        { id: 'm1', title: 'Konsep Dasar Variabel', duration: '12m', type: 'VIDEO' },
        { id: 'm2', title: 'Persamaan Linear Satu Variabel', duration: '15m', type: 'VIDEO' },
        { id: 'm3', title: 'Kuis Bab 1', duration: '10 Soal', type: 'QUIZ' },
      ]
    },
    {
      id: 'c2',
      title: 'Bab 2: Sistem Persamaan Dua Variabel',
      modules: [
        { id: 'm4', title: 'Metode Substitusi', duration: '18m', type: 'VIDEO' },
        { id: 'm5', title: 'Metode Eliminasi', duration: '20m', type: 'VIDEO' },
        { id: 'm6', title: 'Penerapan SPLDV', duration: '25m', type: 'VIDEO', isLocked: true },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
      {/* Subject Header */}
      <div className={`${subject.color} rounded-[2.5rem] p-12 text-white shadow-xl relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center text-5xl backdrop-blur-md border border-white/20 shadow-inner">
              {subject.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black mb-4">{subject.name}</h1>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="bg-black/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                  {subject.completedModules} / {subject.totalModules} Bab Selesai
                </div>
                <div className="w-48 bg-white/20 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full" style={{ width: `${subject.progress}%` }}></div>
                </div>
                <span className="text-sm font-black">{subject.progress}%</span>
              </div>
            </div>
            <div className="text-right flex flex-col gap-3">
               <button 
                onClick={onStartTryout}
                className="bg-amber-400 text-blue-900 px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-amber-300 transition-all flex items-center gap-2"
               >
                 🚀 Tryout Nasional
               </button>
               <p className="text-xs font-bold opacity-80">Aktif sampai 31 Juni 2025</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full -mb-48 -mr-48 blur-2xl"></div>
      </div>

      {/* Syllabus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
           <h2 className="text-2xl font-black text-slate-800">Kurikulum Pembelajaran</h2>
           {syllabus.map((chapter) => (
             <div key={chapter.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="font-black text-slate-800">{chapter.title}</h3>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{chapter.modules.length} Materi</span>
                </div>
                <div className="divide-y divide-slate-50">
                   {chapter.modules.map((module) => (
                     <div 
                      key={module.id} 
                      onClick={() => !module.isLocked && onStartLesson(chapter.title, module.title)}
                      className={`px-8 py-6 flex items-center justify-between group transition-all ${module.isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50/50'}`}
                     >
                        <div className="flex items-center gap-6">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                             module.isLocked ? 'bg-slate-100 text-slate-400' : 
                             module.type === 'VIDEO' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                           }`}>
                             {module.isLocked ? '🔒' : module.type === 'VIDEO' ? '▶️' : '📝'}
                           </div>
                           <div>
                              <h4 className={`font-black ${module.isLocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-blue-600'}`}>{module.title}</h4>
                              <p className="text-xs text-slate-400 font-bold">{module.duration} • {module.type}</p>
                           </div>
                        </div>
                        {!module.isLocked && (
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 font-black text-sm">
                            Mulai Belajar →
                          </span>
                        )}
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>

        {/* Side Stats */}
        <div className="space-y-8">
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-28">
              <h3 className="text-xl font-black text-slate-800 mb-6">Pencapaian Kamu 🏅</h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl">✨</div>
                    <div>
                       <p className="text-sm font-black text-slate-800">Master Aljabar</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">DIKLAIM 2 HARI LALU</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl opacity-40">🔥</div>
                    <div>
                       <p className="text-sm font-black text-slate-400">Si Paling Rajin</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">SELESAIKAN 5 BAB LAGI</p>
                    </div>
                 </div>
              </div>
              <div className="mt-10 pt-8 border-t border-slate-100">
                 <p className="text-xs text-slate-500 italic">"Pendidikan adalah senjata paling mematikan di dunia."</p>
                 <p className="text-[10px] font-black text-blue-600 mt-2">— Nelson Mandela</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
