export enum Subject {
  MATH = 'Matemática',
  PORTUGUESE = 'Português',
  ENGLISH = 'Inglês',
  SCIENCE = 'Ciências',
  GEOGRAPHY = 'Geografia',
  HISTORY = 'História'
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  url: string;
  subject: Subject;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  points: number;
}

export interface UserStats {
  name: string;
  totalPoints: number;
  dailyGoal: number;
  completedTodayIds: string[];
  lastActiveDate: string;
}

export interface SubjectTheme {
  color: string;
  icon: string;
  gradient: string;
}