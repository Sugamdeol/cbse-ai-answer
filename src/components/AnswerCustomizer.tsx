import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { CustomizationPrompt } from '../types';

interface AnswerCustomizerProps {
  onCustomize: (prompt: CustomizationPrompt) => void;
  currentAnswer: string;
  loading?: boolean;
}

export const AnswerCustomizer: React.FC<AnswerCustomizerProps> = ({
  onCustomize,
  currentAnswer,
  loading
}) => {
  const [instruction, setInstruction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instruction.trim()) {
      onCustomize({
        instruction: instruction.trim(),
        previousAnswer: currentAnswer
      });
      setInstruction('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-indigo-600">
        <Sparkles className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Customize Answer</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col space-y-2">
          <label htmlFor="customization" className="text-sm font-medium text-gray-700">
            How would you like to improve this answer?
          </label>
          <div className="relative">
            <textarea
              id="customization"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="E.g., Make it more detailed, Add more examples, Simplify the explanation..."
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[80px] pr-12"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!instruction.trim() || loading}
              className="absolute right-2 bottom-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};