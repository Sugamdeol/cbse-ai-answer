import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CheckCircle2 } from 'lucide-react';

interface AnswerProps {
  answer: string;
  loading?: boolean;
  compact?: boolean;
}

export const Answer: React.FC<AnswerProps> = ({ answer, loading, compact }) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4 p-6 bg-white rounded-lg shadow">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${compact ? 'p-4' : 'p-6'} space-y-4`}>
      {!compact && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle2 className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Answer</h3>
        </div>
      )}
      <div className={`prose prose-indigo ${compact ? 'max-h-60 overflow-y-auto' : ''} max-w-none`}>
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
    </div>
  );
};