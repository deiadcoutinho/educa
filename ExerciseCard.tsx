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
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${isCompleted ? 'opacity-75' : ''}`}>
      <div className={`h-2 w-full bg-gradient-to-r ${theme.gradient}`} />
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-4">{exercise.title}</h3>
        <div className="flex gap-2">
          <a href={exercise.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-sm">Abrir Link ↗</a>
          <button
            onClick={() => onComplete(exercise.id)}
            disabled={isCompleted}
            className={`flex-1 font-bold py-2 rounded-lg text-sm ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-800 text-white'}`}
          >
            {isCompleted ? 'Feito ✓' : 'Concluir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
    
      
