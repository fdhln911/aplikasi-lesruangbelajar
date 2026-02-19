
import React, { useState, useEffect } from 'react';
import { AppState, Subject, Question, PerformanceRecord, Recommendation, PerformanceAnalysis } from './types';
import Dashboard from './views/Dashboard';
import CourseDetail from './views/CourseDetail';
import LessonVideo from './views/LessonVideo';
import Practice from './views/Practice';
import Tryout from './views/Tryout';
import ResultAnalysis from './views/ResultAnalysis';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import VoiceTutor from './components/VoiceTutor';
import { generateQuestions, getRecommendations, analyzePerformance } from './services/geminiService';

const MOCK_SUBJECTS: Subject[] = [
  { id: 'mat', name: 'Matematika', icon: '📐', color: 'bg-blue-500', progress: 65, totalModules: 12, completedModules: 8 },
  { id: 'ipa', name: 'IPA Terpadu', icon: '🔬', color: 'bg-emerald-500', progress: 40, totalModules: 15, completedModules: 6 },
  { id: 'ips', name: 'IPS Terpadu', icon: '🌍', color: 'bg-orange-500', progress: 85, totalModules: 10, completedModules: 8 },
  { id: 'ing', name: 'Bahasa Inggris', icon: '🇬🇧', color: 'bg-purple-500', progress: 20, totalModules: 20, completedModules: 4 },
  { id: 'ind', name: 'Bahasa Indonesia', icon: '🇮🇩', color: 'bg-rose-500', progress: 50, totalModules: 8, completedModules: 4 },
];

const App: React.FC = () => {
  const [activeState, setActiveState] = useState<AppState>(AppState.DASHBOARD);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeLesson, setActiveLesson] = useState<{chapter: string, topic: string} | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState(2500);
  
  // Performance States
  const [history, setHistory] = useState<PerformanceRecord[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [latestRecord, setLatestRecord] = useState<PerformanceRecord | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setActiveState(AppState.COURSE_DETAIL);
  };

  const handleStartLesson = (chapter: string, topic: string) => {
    setActiveLesson({ chapter, topic });
    setActiveState(AppState.LESSON_VIDEO);
  };

  const startPractice = async (topic: string) => {
    setIsLoading(true);
    const qs = await generateQuestions(topic, 5);
    setQuestions(qs);
    setIsLoading(false);
    setActiveState(AppState.PRACTICE);
  };

  const startTryout = async () => {
    setIsLoading(true);
    const qs = await generateQuestions(`Ujian Akhir Semester Gabungan ${selectedSubject?.name || 'Umum'}`, 10);
    setQuestions(qs);
    setIsLoading(false);
    setActiveState(AppState.TRYOUT);
  };

  const saveRecord = async (recordData: Omit<PerformanceRecord, 'timestamp' | 'subjectId' | 'subjectName'>) => {
    const newRecord: PerformanceRecord = {
      ...recordData,
      subjectId: selectedSubject?.id || 'gen',
      subjectName: selectedSubject?.name || 'Umum',
      timestamp: Date.now()
    };
    
    setHistory(prev => [newRecord, ...prev].slice(0, 20));
    setLatestRecord(newRecord);
    setCoins(prev => prev + (recordData.score * 100)); // Dapatkan koin berdasarkan skor
    setActiveState(AppState.RESULTS);
    
    setCurrentAnalysis(null);
    const analysis = await analyzePerformance([newRecord, ...history]);
    setCurrentAnalysis(analysis);
  };

  useEffect(() => {
    if (history.length > 0) {
      const updateRecs = async () => {
        setIsAnalyzing(true);
        const recs = await getRecommendations(history);
        setRecommendations(recs);
        setIsAnalyzing(false);
      };
      updateRecs();
    }
  }, [history]);

  const navigateTo = (state: AppState) => {
    setActiveState(state);
    if (state === AppState.DASHBOARD) {
        setSelectedSubject(null);
        setActiveLesson(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-sky-50/50">
      <Sidebar activeState={activeState} onNavigate={navigateTo} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar onNavigate={navigateTo} coins={coins} />
        
        <div className="flex-1 overflow-auto p-4 md:p-10">
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-[2rem] animate-spin mb-6"></div>
                <p className="text-blue-600 font-black animate-pulse text-lg uppercase tracking-widest">Memuat Ruang Belajar...</p>
              </div>
            </div>
          )}

          {activeState === AppState.DASHBOARD && (
            <Dashboard 
              subjects={MOCK_SUBJECTS} 
              onSelectSubject={handleSelectSubject} 
              recommendations={recommendations}
              onRecAction={(rec) => startPractice(rec.targetTopic)}
              isAnalyzing={isAnalyzing}
            />
          )}

          {activeState === AppState.COURSE_DETAIL && selectedSubject && (
            <CourseDetail 
              subject={selectedSubject} 
              onStartLesson={handleStartLesson}
              onStartTryout={startTryout}
            />
          )}

          {activeState === AppState.LESSON_VIDEO && activeLesson && (
            <LessonVideo 
              chapter={activeLesson.chapter}
              topic={activeLesson.topic}
              onBack={() => setActiveState(AppState.COURSE_DETAIL)}
              onFinish={() => startPractice(activeLesson.topic)}
            />
          )}

          {activeState === AppState.PRACTICE && (
            <Practice 
              questions={questions} 
              onFinish={(score) => {
                saveRecord({ topic: activeLesson?.topic || 'Latihan', score, total: questions.length, type: 'PRACTICE' });
              }} 
            />
          )}

          {activeState === AppState.TRYOUT && (
            <Tryout 
              questions={questions} 
              onFinish={(score) => {
                saveRecord({ topic: 'Tryout Nasional', score, total: questions.length, type: 'TRYOUT' });
              }} 
            />
          )}

          {activeState === AppState.RESULTS && latestRecord && (
            <ResultAnalysis 
              record={latestRecord}
              analysis={currentAnalysis}
              onClose={() => navigateTo(AppState.DASHBOARD)}
            />
          )}
        </div>
      </main>

      <VoiceTutor />
    </div>
  );
};

export default App;
