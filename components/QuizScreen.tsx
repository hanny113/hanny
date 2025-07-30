import React from 'react';
import { Question, MBTIType } from '../types';
import StyledContainer from './PixelatedContainer';
import ModernButton from './PixelButton';
import ProgressBar from './ProgressBar';

interface QuizScreenProps {
  question: Question;
  onAnswer: (answerType: MBTIType) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, onAnswer, currentQuestion, totalQuestions }) => {
  return (
    <StyledContainer className="w-full max-w-2xl">
      <ProgressBar current={currentQuestion} total={totalQuestions} />
      <h2 className="text-2xl md:text-3xl font-semibold text-stone-700 mb-10 leading-relaxed">
        {question.question}
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <ModernButton onClick={() => onAnswer(question.answers[0].type)} className="w-full sm:w-auto" variant="primary">
          {question.answers[0].text}
        </ModernButton>
        <ModernButton onClick={() => onAnswer(question.answers[1].type)} className="w-full sm:w-auto" variant="secondary">
          {question.answers[1].text}
        </ModernButton>
      </div>
    </StyledContainer>
  );
};

export default QuizScreen;