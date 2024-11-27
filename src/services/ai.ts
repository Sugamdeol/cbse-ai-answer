import { Subject, QuestionType, AnswerDraft, CustomizationPrompt } from '../types';

const API_URL = 'https://text.pollinations.ai/';

const generateAnswer = async (
  question: string,
  subject: Subject,
  type: QuestionType,
  seed: number
): Promise<string> => {
  const systemPrompt = `You are a CBSE Class 10 expert teacher specializing in ${subject}.
Your task is to provide accurate answers strictly based on CBSE NCERT Class 10 curriculum.
For ${type} questions, format the answer appropriately.
Keep explanations clear and suitable for Class 10 students.
you should search question in this format on web "QUESTION" class 10th cbse "subject" and give answer from web. Also don't give any info outside of taht, even if answer is not completed.
You can use this url for serachin a question on bjus https://byjus.com/question-answer/search/{question}/`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        model: 'searchgpt',
        seed,
        jsonMode: false
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate answer');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error generating answer:', error);
    throw error;
  }
};

export const generateAnswerDrafts = async (
  question: string,
  subject: Subject,
  type: QuestionType,
  count: number = 4
): Promise<AnswerDraft[]> => {
  const draftPromises = Array.from({ length: count }, async (_, i) => {
    const seed = Math.floor(Math.random() * 1000000);
    try {
      const content = await generateAnswer(question, subject, type, seed);
      return {
        id: `draft-${seed}`,
        content,
        likes: 0,
        seed
      };
    } catch (error) {
      console.error(`Error generating draft ${i + 1}:`, error);
      return null;
    }
  });

  const results = await Promise.all(draftPromises);
  return results.filter((draft): draft is AnswerDraft => draft !== null);
};

export const customizeAnswer = async (
  prompt: CustomizationPrompt,
  subject: Subject
): Promise<string> => {
  const systemPrompt = `You are a CBSE Class 10 expert teacher specializing in ${subject}.
Your task is to improve the previous answer based on the user's instructions.
Maintain CBSE curriculum accuracy while applying the requested changes.
Keep the response focused and relevant to Class 10 level.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'assistant', content: prompt.previousAnswer },
          { role: 'user', content: `Please improve this answer according to these instructions: ${prompt.instruction}` }
        ],
        model: 'openai',
        seed: Math.floor(Math.random() * 1000000),
        jsonMode: false
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to customize answer');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error customizing answer:', error);
    throw error;
  }
};