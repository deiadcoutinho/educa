import React from 'react';
import { SubjectTheme } from './types';

interface SubjectCardProps {
  subject: string;
  theme: SubjectTheme;
  onClick: (subject: string) => void;
  count: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, theme, onClick, count }) => {
  return (
    <button
      onClick={() => onClick(subject)}
      className="group relative bg-white rounded-3xl p-7 shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-xl transition-all overflow-hidden text-left active:scale-[0.97] w-full"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-br ${theme.gradient} text-white shadow-lg`}>
        {theme.icon}
      </div>
      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{subject}</h3>
      <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{count} Atividades</p>
    </button>
  );
};

export default SubjectCard;
