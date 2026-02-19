
import React from 'react';
import { PerformanceAnalysis, PerformanceRecord } from '../types';

interface ResultAnalysisProps {
  record: PerformanceRecord;
  analysis: PerformanceAnalysis | null;
  onClose: () => void;
}

const ResultAnalysis: React.FC<ResultAnalysisProps> = ({ record, analysis, onClose }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Laporan Belajar 📊</h2>
            <p className="text-slate-500">Hasil {record.type} - {record.subjectName}</p>
          </div>
          <div className="bg-indigo-50 px-6 py-4 rounded-2xl text-center border border-indigo-100">
            <p className="text-xs text-indigo-600 font-bold uppercase mb-1">Skor Akhir</p>
            <p className="text-4xl font-black text-indigo-700">{Math.round((record.score / record.total) * 100)}</p>
          </div>
        </div>

        {!analysis ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-indigo-600 font-medium animate-pulse">Gemini sedang menganalisis pola belajarmu...</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
               <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                 <span className="text-xl">💡</span> Kesimpulan AI
               </h3>
               <p className="text-slate-600 leading-relaxed italic">"{analysis.summary}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h4 className="text-green-700 font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs">💪</span> 
                  Kekuatan Kamu
                </h4>
                <ul className="space-y-2">
                  {analysis.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <h4 className="text-orange-700 font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs">⚠️</span> 
                  Perlu Ditingkatkan
                </h4>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-orange-800 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-lg shadow-indigo-100 relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-4">Rencana Aksi Berikutnya 🎯</h3>
                 <p className="text-indigo-100 text-sm leading-relaxed mb-6">{analysis.actionPlan}</p>
                 <button 
                  onClick={onClose}
                  className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                 >
                   Kembali Belajar
                 </button>
               </div>
               <div className="absolute bottom-0 right-0 opacity-10 text-8xl -mb-8 -mr-8">🚀</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultAnalysis;
