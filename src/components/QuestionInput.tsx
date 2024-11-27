import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Subject, QuestionType } from '../types';

interface QuestionInputProps {
  subject: Subject;
  onSubmit: (question: string, type: QuestionType) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ subject, onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState<QuestionType>('MCQ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question, type);
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="questionType" className="text-sm font-medium text-gray-700">
          Question Type
        </label>
        <select
          id="questionType"
          value={type}
          onChange={(e) => setType(e.target.value as QuestionType)}
          className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="MCQ">Multiple Choice</option>
          <option value="Short Answer">Short Answer</option>
          <option value="Long Answer">Long Answer</option>
          <option value="Fill in the Blanks">Fill in the Blanks</option>
        </select>
      </div>
      
      <div className="flex flex-col space-y-2">
        <label htmlFor="question" className="text-sm font-medium text-gray-700">
          Your Question
        </label>
        <div className="relative">
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Enter your ${subject} question here...`}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px] pr-12"
          />
          <button
            type="submit"
            disabled={!question.trim()}
            className="absolute right-2 bottom-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <AlertCircle className="w-4 h-4 text-indigo-600" />
        <p>Answers are provided strictly based on CBSE NCERT Class 10 {subject} curriculum</p>
      </div>
    </form>
  );
};