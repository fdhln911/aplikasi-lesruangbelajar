
import React, { useState } from 'react';
import { Question } from '../types';

interface PracticeProps {
  questions: Question[];
  onFinish: () => void;
}

const Practice: React.FC<PracticeProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
    }
  };

  if (showSummary) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 shadow-xl text-center animate-in zoom-in duration-500 border border-slate-100">
        <div className="text-6xl mb-6">🏆</div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Latihan Selesai!</h2>
        <p className="text-slate-500 mb-8">Kerja bagus, kamu sudah menyelesaikan semua soal.</p>
        
        <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">Skor Kamu</p>
            <p className="text-5xl font-black text-indigo-600">{(score / questions.length) * 100}</p>
            <p className="text-sm text-slate-500 mt-2">Menjawab {score} dari {questions.length} soal dengan benar</p>
        </div>

        <button 
          onClick={onFinish}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Lanjut Belajar
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-indigo-600">SOAL {currentIndex + 1}</span>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-400">{questions.length}</span>
        </div>
        <div className="w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-8">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let variant = "bg-white border-slate-200 hover:border-indigo-300";
            if (isAnswered) {
              if (idx === currentQuestion.correctAnswer) variant = "bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500";
              else if (selectedOption === idx) variant = "bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500";
              else variant = "bg-slate-50 border-slate-100 opacity-50";
            } else if (selectedOption === idx) {
              variant = "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-200 text-indigo-700";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 font-medium ${variant}`}
              >
                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold ${
                    selectedOption === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 animate-in fade-in slide-in-from-top-4">
          <p className="text-indigo-900 font-bold mb-2">💡 Penjelasan:</p>
          <p className="text-indigo-700 text-sm">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end pt-4">
        {!isAnswered ? (
          <button 
            disabled={selectedOption === null}
            onClick={handleCheck}
            className={`px-10 py-4 rounded-2xl font-bold transition-all shadow-lg ${
              selectedOption !== null 
                ? 'bg-indigo-600 text-white shadow-indigo-100' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            Cek Jawaban
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="px-10 py-4 rounded-2xl bg-indigo-900 text-white font-bold shadow-lg shadow-indigo-100"
          >
            {currentIndex === questions.length - 1 ? 'Lihat Hasil' : 'Soal Selanjutnya →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Practice;
