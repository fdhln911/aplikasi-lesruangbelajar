
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface TryoutProps {
  questions: Question[];
  onFinish: () => void;
}

const Tryout: React.FC<TryoutProps> = ({ questions, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (qId: string, idx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left: Question Area */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Soal No. {currentIndex + 1}</h2>
            <div className={`px-4 py-2 rounded-xl font-mono font-bold text-lg ${timeLeft < 300 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              {currentQuestion.text}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(currentQuestion.id, idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    answers[currentQuestion.id] === idx 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="mr-3 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <button 
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(i => i - 1)}
              className="px-6 py-2 text-slate-500 font-bold hover:text-indigo-600 disabled:opacity-30"
            >
              ← Sebelumnya
            </button>
            <button 
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(i => i + 1)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Berikutnya →
            </button>
          </div>
        </div>
      </div>

      {/* Right: Question Navigation Grid */}
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Navigasi Soal</h3>
          <div className="grid grid-cols-5 gap-3 mb-8">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                  currentIndex === idx 
                    ? 'ring-2 ring-indigo-600 ring-offset-2' 
                    : ''
                } ${
                  answers[q.id] !== undefined 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-50 text-slate-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={onFinish}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition-all"
          >
            Selesaikan Tryout
          </button>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100">
          <p className="text-yellow-800 text-xs font-bold mb-2 italic">⚠️ Tips Penting</p>
          <p className="text-yellow-700 text-[10px] leading-relaxed">
            Pastikan koneksi internet stabil. Jika waktu habis, jawaban yang sudah terpilih akan terkirim otomatis. Semangat!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tryout;
