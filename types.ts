
export interface SubjectTheme {
  name: string;
  color: string;
  icon: string;
  gradient: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  url: string;
  subject: string;
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
