
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
      className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-2xl transition-all overflow-hidden text-left active:scale-[0.96] w-full"
    >
      <div className={`absolute top-0 right-0 w-40 h-40 -mr-12 -mt-12 rounded-full opacity-5 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${theme.gradient}`} />
      
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 bg-gradient-to-br ${theme.gradient} text-white shadow-xl shadow-indigo-100 transition-all group-hover:scale-110 group-hover:rotate-6`}>
        {theme.icon}
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">{subject}</h3>
      <p className="text-sm text-slate-400 font-black uppercase tracking-widest">{count} atividades disponíveis</p>
      
      <div className="mt-8 flex items-center text-xs font-black uppercase text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
        Ver atividades agora →
      </div>
    </button>
  );
};

export default SubjectCard;
