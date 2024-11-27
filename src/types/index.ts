export type Subject = 'Mathematics' | 'Science' | 'English' | 'Social Science';

export type QuestionType = 'MCQ' | 'Short Answer' | 'Long Answer' | 'Fill in the Blanks';

export interface AnswerDraft {
  id: string;
  content: string;
  likes: number;
  seed: number;
}

export interface Question {
  id?: string;
  text: string;
  subject: Subject;
  type: QuestionType;
  marks?: number;
  timestamp?: Date;
  selectedDraftId?: string;
}

export interface CustomizationPrompt {
  instruction: string;
  previousAnswer: string;
}