import Dexie, { Table } from 'dexie';
import { Question } from '../types';

export class QuestionDatabase extends Dexie {
  questions!: Table<Question>;

  constructor() {
    super('QuestionDatabase');
    this.version(1).stores({
      questions: '++id, subject, type, text'
    });
  }
}

export const db = new QuestionDatabase();

export const saveQuestion = async (question: Omit<Question, 'id'>) => {
  return await db.questions.add(question as Question);
};

export const getQuestionHistory = async () => {
  return await db.questions.toArray();
};