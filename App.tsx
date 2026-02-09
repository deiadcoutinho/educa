import React, { useState, useEffect } from 'react';
import { UserStats, Exercise, SubjectTheme } from './types';
import { INITIAL_EXERCISES, INITIAL_SUBJECTS } from './constants';
import SubjectCard from './components/SubjectCard';
import ExerciseCard from './components/ExerciseCard';
import { getStudyTip } from './geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserStats | null>(null);
  const [subjects, setSubjects] = useState<SubjectTheme[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [studyTip, setStudyTip] = useState<string>('');
  const [isTipLoading, setIsTipLoading] = useState(false);
  const [loginName, setLoginName] = useState('');

  const [newSubj, setNewSubj] = useState({ name: '', icon: '📖', color: 'bg-blue-500' });
  const [newEx, setNewEx] = useState<Omit<Exercise, 'id'>>({
    title: '', description: '', url: '', subject: '', difficulty: 'Médio', points: 10
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('eduquest_user');
    const savedSubjects = localStorage.getItem('eduquest_subjects');
    const savedExercises = localStorage.getItem('eduquest_exercises');

    if (savedUser) setUser(JSON.parse(savedUser));
    setSubjects(savedSubjects ? JSON.parse(savedSubjects) : INITIAL_SUBJECTS);
    setExercises(savedExercises ? JSON.parse(savedExercises) : INITIAL_EXERCISES);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('eduquest_user', JSON.stringify(user));
    if (subjects.length > 0) localStorage.setItem('eduquest_subjects', JSON.stringify(subjects));
    if (exercises.length > 0) localStorage.setItem('eduquest_exercises', JSON.stringify(exercises));
  }, [user, subjects, exercises]);

  const handleLogin = () => {
    if (loginName.trim().length < 2) return;
    setUser({
      name: loginName.trim(),
      totalPoints: 0,
      dailyGoal: 3,
      completedTodayIds: [],
      lastActiveDate: new Date().toDateString()
    });
  };

  const addSubject = () => {
    if (!newSubj.name) return alert("Dê um nome à matéria!");
    const colorKey = newSubj.color.split('-')[1];
    const theme: SubjectTheme = {
      ...newSubj,
      gradient: `from-${colorKey}-500 to-${colorKey}-600`
    };
    setSubjects([...subjects, theme]);
    setNewSubj({ name: '', icon: '📖', color: 'bg-blue-500' });
  };

  const removeSubject = (name: string) => {
    if (confirm(`Excluir "${name}"? Isso apagará todos os exercícios desta matéria.`)) {
      setSubjects(subjects.filter(s => s.name !== name));
      setExercises(exercises.filter(e => e.subject !== name));
      if (selectedSubject === name) setSelectedSubject(null);
    }
  };

  const addExercise = () => {
    if (!newEx.title || !newEx.url || !newEx.subject) return alert("Preencha os campos obrigatórios!");
    const exercise: Exercise = { ...newEx, id: Date.now().toString() };
    setExercises([...exercises, exercise]);
    setNewEx({ ...newEx, title: '', description: '', url: '' });
  };

  const removeExercise = (id: string) => {
    if (confirm("Deseja remover este exercício?")) {
      setExercises(exercises.filter(e => e.id !== id));
    }
  };

  const completeExercise = (id: string) => {
    if (!user) return;
    const ex = exercises.find(e => e.id === id);
    if (!ex || user.completedTodayIds.includes(id)) return;
    setUser({
      ...user,
      totalPoints: user.totalPoints + ex.points,
      completedTodayIds: [...user.completedTodayIds, id]
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

  const progress = user ? Math.min((user.completedTodayIds.length / user.dailyGoal) * 100, 100) : 0;

  if (!user) return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <h1 className="text-4xl font-black text-slate-800 mb-6 tracking-tight">EduQuest 🚀</h1>
        <input 
          type="text" placeholder="Qual o seu nome?" value={loginName}
          onChange={e => setLoginName(e.target.value)}
          className="w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl mb-4 text-center font-bold text-lg focus:border-indigo-500 outline-none transition-all"
        />
        <button onClick={handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transform active:scale-95 transition-all">
          Entrar no Portal
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b p-4 sticky top-0 z-50 shadow-sm flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Estudante</p>
            <span className="font-bold text-slate-800">{user.name}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full font-black text-xs flex items-center gap-2 border border-amber-100">
            ⭐ {user.totalPoints} XP
          </div>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all shadow-sm ${
              isAdmin ? 'bg-rose-500 text-white' : 'bg-slate-800 text-white'
            }`}
          >
            {isAdmin ? 'Sair do Painel' : 'Painel Professor 👨‍🏫'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {isAdmin ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <h2 className="text-3xl font-black text-slate-800">Gestão de Conteúdo 🛠️</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white p-6 rounded-3xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">📚 Matérias</h3>
                <div className="space-y-4">
                  <input placeholder="Nome (Ex: Artes)" value={newSubj.name} onChange={e => setNewSubj({...newSubj, name: e.target.value})} className="w-full border-2 p-3 rounded-xl outline-none" />
                  <div className="flex gap-4">
                    <select value={newSubj.color} onChange={e => setNewSubj({...newSubj, color: e.target.value})} className="flex-1 border-2 p-3 rounded-xl bg-white outline-none">
                      <option value="bg-blue-500">Azul</option>
                      <option value="bg-rose-500">Rosa</option>
                      <option value="bg-emerald-500">Verde</option>
                      <option value="bg-amber-500">Amarelo</option>
                      <option value="bg-indigo-500">Roxo</option>
                    </select>
                    <input placeholder="Emoji" value={newSubj.icon} onChange={e => setNewSubj({...newSubj, icon: e.target.value})} className="w-20 border-2 p-3 rounded-xl text-center" />
                  </div>
                  <button onClick={addSubject} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Criar Matéria</button>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {subjects.map(s => (
                    <div key={s.name} className="bg-slate-50 border px-3 py-1.5 rounded-xl flex items-center gap-2 text-sm font-bold">
                      <span>{s.icon} {s.name}</span>
                      <button onClick={() => removeSubject(s.name)} className="text-rose-500 text-lg">×</button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-6 rounded-3xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🔗 Links e Jogos</h3>
                <div className="space-y-3">
                  <input placeholder="Título do Jogo" value={newEx.title} onChange={e => setNewEx({...newEx, title: e.target.value})} className="w-full border-2 p-3 rounded-xl outline-none" />
                  <input placeholder="URL do Link" value={newEx.url} onChange={e => setNewEx({...newEx, url: e.target.value})} className="w-full border-2 p-3 rounded-xl outline-none" />
                  <select value={newEx.subject} onChange={e => setNewEx({...newEx, subject: e.target.value})} className="w-full border-2 p-3 rounded-xl bg-white outline-none">
                    <option value="">Selecione a Matéria...</option>
                    {subjects.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                  <button onClick={addExercise} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">Salvar Atividade</button>
                </div>
                <div className="mt-6 space-y-2 max-h-40 overflow-y-auto">
                    {exercises.map(ex => (
                      <div key={ex.id} className="text-xs p-3 border rounded-xl flex justify-between items-center bg-slate-50 font-bold">
                        <span>[{ex.subject}] {ex.title}</span>
                        <button onClick={() => removeExercise(ex.id)} className="text-rose-500">Remover</button>
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        ) : (
          <>
            {!selectedSubject ? (
              <div className="animate-in fade-in duration-500">
                <div className="bg-indigo-600 rounded-[2rem] p-8 text-white mb-10 shadow-xl relative overflow-hidden">
                  <h3 className="text-2xl font-black mb-1">Missão Diária</h3>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm opacity-80">{user.completedTodayIds.length} de {user.dailyGoal} feitos</p>
                    <span className="font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map(s => (
                    <SubjectCard 
                      key={s.name} subject={s.name} theme={s} 
                      count={exercises.filter(e => e.subject === s.name).length} 
                      onClick={(name) => setSelectedSubject(name)} 
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setSelectedSubject(null)} className="w-12 h-12 bg-white border-2 rounded-2xl flex items-center justify-center text-slate-600 font-bold text-xl">←</button>
                  <h2 className="text-4xl font-black text-slate-800">{selectedSubject}</h2>
                </div>
                <div className="bg-white p-6 rounded-3xl border-l-4 border-indigo-500 shadow-sm mb-10 flex items-start gap-4">
                  <span className="text-3xl">💡</span>
                  <div>
                    <p className="text-slate-700 italic font-medium">{isTipLoading ? 'Gerando dica...' : studyTip}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exercises.filter(e => e.subject === selectedSubject).map(ex => (
                    <ExerciseCard 
                      key={ex.id} exercise={ex} 
                      theme={subjects.find(s => s.name === selectedSubject)!} 
                      isCompleted={user.completedTodayIds.includes(ex.id)} 
                      onComplete={completeExercise} 
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;

