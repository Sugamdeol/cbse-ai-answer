import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GraduationCap size={32} />
          <h1 className="text-2xl font-bold">CBSE AI Solver</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-indigo-200 transition-colors">Features</a>
          <a href="#subjects" className="hover:text-indigo-200 transition-colors">Subjects</a>
          <a href="#about" className="hover:text-indigo-200 transition-colors">About</a>
        </nav>
      </div>
    </header>
  );
};