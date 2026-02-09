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
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md ${isCompleted ? 'opacity-75' : ''}`}>
      <div className={`h-2 w-full bg-gradient-to-r ${theme.gradient}`} />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
            exercise.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
            exercise.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {exercise.difficulty}
          </span>
          <span className="text-sm font-semibold text-slate-500">{exercise.points} XP</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">{exercise.title}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{exercise.description}</p>
        <div className="flex gap-2">
          <a href={exercise.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">Abrir Link ↗</a>
          <button
            onClick={() => onComplete(exercise.id)}
            disabled={isCompleted}
            className={`flex-1 font-bold py-2 px-4 rounded-lg transition-all text-sm ${isCompleted ? 'bg-green-100 text-green-600 cursor-default' : 'bg-slate-800 text-white hover:bg-slate-700 shadow-sm active:scale-95'}`}
          >
            {isCompleted ? 'Concluído ✓' : 'Concluir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;