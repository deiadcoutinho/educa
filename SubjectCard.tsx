import React from 'react';
import { Subject, SubjectTheme } from './types';

interface SubjectCardProps {
  subject: Subject;
  theme: SubjectTheme;
  onClick: (subject: Subject) => void;
  count: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, theme, onClick, count }) => {
  return (
    <button
      onClick={() => onClick(subject)}
      className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-transparent transition-all overflow-hidden text-left active:scale-[0.98]"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${theme.gradient}`} />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br ${theme.gradient} text-white shadow-lg`}>
        {theme.icon}
      </div>
      <h3 className="text-xl font-extrabold text-slate-800 mb-1">{subject}</h3>
      <p className="text-sm text-slate-500 font-medium">{count} exercícios disponíveis</p>
      <div className="mt-4 flex items-center text-sm font-bold text-slate-700 group-hover:translate-x-1 transition-transform">
        Explorar →
      </div>
    </button>
  );
};

export default SubjectCard;