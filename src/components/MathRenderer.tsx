import React from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex';

interface MathRendererProps {
  content: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content }) => {
  return (
    <div className="math-content">
      <Latex>{content}</Latex>
    </div>
  );
};