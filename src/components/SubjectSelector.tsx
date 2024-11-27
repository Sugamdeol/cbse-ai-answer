import React from 'react';
import { Book, Calculator, Beaker, Globe } from 'lucide-react';
import { Subject } from '../types';

interface SubjectSelectorProps {
  selectedSubject: Subject | null;
  onSelectSubject: (subject: Subject) => void;
}

const subjects: { name: Subject; icon: React.ReactNode; description: string }[] = [
  {
    name: 'Mathematics',
    icon: <Calculator className="w-8 h-8" />,
    description: 'Algebra, Geometry, and more'
  },
  {
    name: 'Science',
    icon: <Beaker className="w-8 h-8" />,
    description: 'Physics, Chemistry, Biology'
  },
  {
    name: 'English',
    icon: <Book className="w-8 h-8" />,
    description: 'Literature and Language'
  },
  {
    name: 'Social Science',
    icon: <Globe className="w-8 h-8" />,
    description: 'History, Geography, Civics'
  }
];

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({ selectedSubject, onSelectSubject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {subjects.map(({ name, icon, description }) => (
        <button
          key={name}
          onClick={() => onSelectSubject(name)}
          className={`p-6 rounded-xl transition-all duration-200 ${
            selectedSubject === name
              ? 'bg-indigo-100 border-2 border-indigo-500'
              : 'bg-white hover:bg-indigo-50 border-2 border-gray-200'
          }`}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="text-indigo-600">{icon}</div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};