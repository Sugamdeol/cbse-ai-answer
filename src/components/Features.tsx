import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Award, Clock, History, Share2 } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI-Powered Solutions',
    description: 'Get instant, accurate answers based on CBSE curriculum'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'NCERT Aligned',
    description: 'All answers strictly follow NCERT guidelines'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Expert Explanations',
    description: 'Detailed step-by-step solutions with examples'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Quick Practice',
    description: 'Instant feedback for rapid learning'
  },
  {
    icon: <History className="w-6 h-6" />,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey'
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Share Solutions',
    description: 'Collaborate with classmates'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-12 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI Solver?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};