import React from 'react';
import { Exercise, SubjectTheme } from './types';

interface ExerciseCardProps {
  exercise: Exercise;
  theme: SubjectTheme;
  isCompleted: boolean;
  onComplete: (id: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, theme, isCompleted, onComplete }) => {
  return (
    <div className={`bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${isCompleted ? 'opacity-80' : ''}`}>
      <div className={`h-3 w-full bg-gradient-to-r ${theme.gradient}`} />
      <div className="p-7">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[9px] uppercase font-black tracking-widest px-3 py-1.5 rounded-xl ${
            exercise.difficulty === 'Fácil' ? 'bg-emerald-50 text-emerald-600' :
            exercise.difficulty === 'Médio' ? 'bg-amber-50 text-amber-600' :
            'bg-rose-50 text-rose-600'
          }`}>
            Nível {exercise.difficulty}
          </span>
          <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-black text-slate-500 border border-slate-100">
            {exercise.points} XP
          </div>
        </div>
        
        <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">{exercise.title}</h3>
        <p className="text-sm text-slate-500 mb-8 font-medium line-clamp-2">Clique no botão para abrir o link e praticar seus conhecimentos!</p>
        
        <div className="flex flex-col gap-3">
          <a 
            href={exercise.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`w-full text-center font-black py-4 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 border-2 ${
              isCompleted ? 'border-slate-100 text-slate-400 bg-slate-50' : 'border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            Abrir Atividade ↗
          </a>
          
          <button
            onClick={() => onComplete(exercise.id)}
            disabled={isCompleted}
            className={`w-full font-black py-4 rounded-2xl transition-all text-sm shadow-md active:scale-95 ${
              isCompleted 
                ? 'bg-emerald-100 text-emerald-600 cursor-default' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isCompleted ? 'Concluído ✓' : 'Marcar como Feito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
