import React from 'react';
import { Heart, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnswerDraft } from '../types';
import { Answer } from './Answer';

interface AnswerDraftsProps {
  drafts: AnswerDraft[];
  onLike: (draftId: string) => void;
  onSelect: (draft: AnswerDraft) => void;
  selectedDraftId?: string;
}

export const AnswerDrafts: React.FC<AnswerDraftsProps> = ({
  drafts,
  onLike,
  onSelect,
  selectedDraftId
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-indigo-600">
        <Wand2 className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Answer Drafts</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {drafts.map((draft, index) => (
            <motion.div
              key={draft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${
                selectedDraftId === draft.id
                  ? 'ring-2 ring-indigo-500'
                  : ''
              }`}
            >
              <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                <button
                  onClick={() => onLike(draft.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-indigo-50 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      draft.likes > 0 ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
                <span className="bg-white px-2 py-1 rounded-full text-sm font-medium shadow-md">
                  {draft.likes} likes
                </span>
              </div>
              
              <button
                onClick={() => onSelect(draft)}
                className="w-full text-left hover:opacity-90 transition-opacity"
              >
                <Answer answer={draft.content} compact />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};