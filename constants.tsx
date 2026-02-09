import { Subject, Exercise, SubjectTheme } from './types';

export const SUBJECT_THEMES: Record<Subject, SubjectTheme> = {
  [Subject.MATH]: { color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600', icon: '➗' },
  [Subject.PORTUGUESE]: { color: 'bg-rose-500', gradient: 'from-rose-500 to-rose-600', icon: '📚' },
  [Subject.ENGLISH]: { color: 'bg-amber-500', gradient: 'from-amber-500 to-amber-600', icon: '🌍' },
  [Subject.SCIENCE]: { color: 'bg-emerald-500', gradient: 'from-emerald-500 to-emerald-600', icon: '🔬' },
  [Subject.GEOGRAPHY]: { color: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-600', icon: '🗺️' },
  [Subject.HISTORY]: { color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-600', icon: '🏛️' }
};

export const MOCK_EXERCISES: Exercise[] = [
  // Matemática
  { id: 'm1', subject: Subject.MATH, title: 'Frações e Decimais', description: 'Exercícios práticos da Khan Academy.', url: 'https://pt.khanacademy.org/math/arithmetic/fraction-arithmetic', difficulty: 'Fácil', points: 10 },
  { id: 'm2', subject: Subject.MATH, title: 'Equações de 1º Grau', description: 'Problemas de lógica matemática.', url: 'https://pt.khanacademy.org/math/algebra/one-variable-linear-equations', difficulty: 'Médio', points: 20 },
  // Português
  { id: 'p1', subject: Subject.PORTUGUESE, title: 'Nova Ortografia', description: 'Guia completo de acentuação.', url: 'https://www.normaculta.com.br/acentuacao-grafica/', difficulty: 'Fácil', points: 15 },
  { id: 'p2', subject: Subject.PORTUGUESE, title: 'Interpretação de Texto', description: 'Simulados para melhorar a leitura.', url: 'https://www.todamateria.com.br/exercicios-de-interpretacao-de-texto/', difficulty: 'Médio', points: 25 },
  // Inglês
  { id: 'e1', subject: Subject.ENGLISH, title: 'Verb To Be & Present', description: 'Grammar exercises for beginners.', url: 'https://www.perfect-english-grammar.com/present-simple-exercise-1.html', difficulty: 'Fácil', points: 10 },
  // Ciências
  { id: 's1', subject: Subject.SCIENCE, title: 'O Ciclo da Água', description: 'Entenda os estados físicos da matéria.', url: 'https://www.todamateria.com.br/ciclo-da-agua/', difficulty: 'Fácil', points: 12 },
  // Geografia
  { id: 'g1', subject: Subject.GEOGRAPHY, title: 'Globalização', description: 'O mundo conectado.', url: 'https://brasilescola.uol.com.br/geografia/globalizacao.htm', difficulty: 'Médio', points: 22 },
  // História
  { id: 'h1', subject: Subject.HISTORY, title: 'Revolução Francesa', description: 'Contexto histórico e social.', url: 'https://www.historiadomundo.com.br/idade-moderna/revolucao-francesa.htm', difficulty: 'Difícil', points: 30 }
];