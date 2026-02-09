import React, { useState, useEffect, useMemo } from 'react';
import { Subject, UserStats } from './types';
import { MOCK_EXERCISES, SUBJECT_THEMES } from './constants';
import SubjectCard from './SubjectCard';
import ExerciseCard from './ExerciseCard';
import { getStudyTip } from './geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserStats | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [studyTip, setStudyTip] = useState<string>('');
  const [isTipLoading, setIsTipLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('eduquest_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as UserStats;
        const today = new Date().toDateString();
        if (parsed.lastActiveDate !== today) {
          parsed.completedTodayIds = [];
          parsed.lastActiveDate = today;
        }
        setUser(parsed);
      } catch (e) { console.error("Erro ao carregar dados:", e); }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('eduquest_user', JSON.stringify(user));
  }, [user]);

  const handleEnter = () => {
    if (inputValue.trim().length < 2) return;
    setUser({
      name: inputValue.trim(),
      totalPoints: 0,
      dailyGoal: 3,
      completedTodayIds: [],
      lastActiveDate: new Date().toDateString()
    });
  };

  const completeExercise = (exerciseId: string) => {
    if (!user) return;
    const exercise = MOCK_EXERCISES.find(e => e.id === exerciseId);
    if (!exercise) return;
    setUser(prev => {
      if (!prev || prev.completedTodayIds.includes(exerciseId)) return prev;
      return {
        ...prev,
        totalPoints: prev.totalPoints + exercise.points,
        completedTodayIds: [...prev.completedTodayIds, exerciseId]
      };
    });
  };

  useEffect(() => {
    if (selectedSubject) {
      setStudyTip('');
      setIsTipLoading(true);
      getStudyTip(selectedSubject).then(tip => {
        setStudyTip(tip);
        setIsTipLoading(false);
      });
    }
  }, [selectedSubject]);

  const progress = useMemo(() => user ? Math.min((user.completedTodayIds.length / user.dailyGoal) * 100, 100) : 0, [user]);

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-float">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-4xl font-black text-slate-800 mb-2">EduQuest</h1>
        <p className="text-slate-500 mb-8 font-medium">Sua jornada de estudos gamificada!</p>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Digite seu nome..." 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEnter()}
            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all text-center font-semibold"
          />
          <button 
            onClick={handleEnter} 
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Estudante</p>
              <span className="font-bold text-slate-800">{user.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full font-black border border-amber-200 shadow-sm">
              ⭐ {user.totalPoints} XP
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full p-4 flex-1">
        {!selectedSubject ? (
          <>
            <div className="bg-indigo-600 rounded-3xl p-6 text-white mb-8 shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1">Progresso Diário</h3>
                <p className="text-sm opacity-80 mb-4">{user.completedTodayIds.length} de {user.dailyGoal} exercícios feitos</p>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-white transition-all duration-1000 ease-out" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                  {progress >= 100 ? 'Meta atingida! Você é fera! 🎉' : 'Mantenha o foco nos estudos!'}
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
              Matérias
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(Object.keys(SUBJECT_THEMES) as Subject[]).map(s => (
                <SubjectCard 
                  key={s} 
                  subject={s} 
                  theme={SUBJECT_THEMES[s]} 
                  count={MOCK_EXERCISES.filter(e => e.subject === s).length} 
                  onClick={setSelectedSubject} 
                />
              ))}
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setSelectedSubject(null)} 
                className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm active:scale-90"
              >
                ←
              </button>
              <h2 className="text-3xl font-black text-slate-800">{selectedSubject}</h2>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border-l-4 border-indigo-500 shadow-sm mb-8 flex items-start gap-4">
              <span className="text-2xl animate-bounce">💡</span>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dica do Tutor IA</p>
                <p className="text-slate-700 italic font-medium">
                  {isTipLoading ? 'Consultando os livros...' : studyTip}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_EXERCISES.filter(e => e.subject === selectedSubject).map(ex => (
                <ExerciseCard 
                  key={ex.id} 
                  exercise={ex} 
                  theme={SUBJECT_THEMES[selectedSubject]} 
                  isCompleted={user.completedTodayIds.includes(ex.id)} 
                  onComplete={completeExercise} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-6 px-4 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">EduQuest v2.0</p>
        <p className="text-slate-300 text-[10px]">Links atualizados para 2024 • Bons estudos!</p>
      </footer>
    </div>
  );
};

export default App;