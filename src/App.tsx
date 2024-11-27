import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SubjectSelector } from './components/SubjectSelector';
import { QuestionInput } from './components/QuestionInput';
import { Answer } from './components/Answer';
import { AnswerDrafts } from './components/AnswerDrafts';
import { AnswerCustomizer } from './components/AnswerCustomizer';
import { Features } from './components/Features';
import { ProgressChart } from './components/ProgressChart';
import { Subject, QuestionType, AnswerDraft } from './types';
import { generateAnswerDrafts, customizeAnswer } from './services/ai';
import { saveQuestion, getQuestionHistory } from './services/db';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [drafts, setDrafts] = useState<AnswerDraft[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [progressData, setProgressData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Questions Solved',
        data: [],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const history = await getQuestionHistory();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString();
    }).reverse();

    const counts = last7Days.map(date => 
      history.filter(q => 
        new Date(q.timestamp).toLocaleDateString() === date
      ).length
    );

    setProgressData({
      labels: last7Days,
      datasets: [{
        label: 'Questions Solved',
        data: counts,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      }],
    });
  };

  const handleQuestionSubmit = async (question: string, type: QuestionType) => {
    if (!selectedSubject) return;

    setLoading(true);
    try {
      const generatedDrafts = await generateAnswerDrafts(question, selectedSubject, type);
      setDrafts(generatedDrafts);
      if (generatedDrafts.length > 0) {
        setAnswer(generatedDrafts[0].content);
        setSelectedDraftId(generatedDrafts[0].id);
      }
      await saveQuestion({
        text: question,
        subject: selectedSubject,
        type,
        timestamp: new Date(),
        selectedDraftId: generatedDrafts[0]?.id,
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      loadProgress();
    } catch (error) {
      toast.error('Failed to generate answers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDraftLike = (draftId: string) => {
    setDrafts(prevDrafts =>
      prevDrafts.map(draft =>
        draft.id === draftId
          ? { ...draft, likes: draft.likes + 1 }
          : draft
      )
    );
  };

  const handleDraftSelect = (draft: AnswerDraft) => {
    setAnswer(draft.content);
    setSelectedDraftId(draft.id);
  };

  const handleCustomize = async (customization: CustomizationPrompt) => {
    if (!selectedSubject) return;

    setLoading(true);
    try {
      const customizedAnswer = await customizeAnswer(customization, selectedSubject);
      setAnswer(customizedAnswer);
      toast.success('Answer customized successfully!');
    } catch (error) {
      toast.error('Failed to customize answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {showConfetti && <Confetti />}
      
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 space-y-12">
        <Features />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-900">Select Your Subject</h2>
          <SubjectSelector
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
          />
        </motion.section>

        {selectedSubject && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Ask Your Question</h2>
            <QuestionInput
              subject={selectedSubject}
              onSubmit={handleQuestionSubmit}
            />
          </motion.section>
        )}

        {(answer || loading) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-gray-900">Solutions</h2>
            
            <AnswerDrafts
              drafts={drafts}
              onLike={handleDraftLike}
              onSelect={handleDraftSelect}
              selectedDraftId={selectedDraftId}
            />

            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Answer</h3>
              <Answer answer={answer} loading={loading} />
            </div>

            <div className="border-t pt-8">
              <AnswerCustomizer
                onCustomize={handleCustomize}
                currentAnswer={answer}
                loading={loading}
              />
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
          <ProgressChart data={progressData} />
        </motion.section>
      </main>
    </div>
  );
}

export default App;