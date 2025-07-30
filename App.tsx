import React, { useState, useCallback, useEffect } from 'react';
import { GameState, MBTICounter, MBTIResult, MBTIType } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { getLearningStyleDescription } from './services/geminiService';
import * as soundService from './services/soundService';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import AnalyzingScreen from './components/AnalyzingScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [answers, setAnswers] = useState<MBTIType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    soundService.init();
  }, []);

  const handleStart = () => {
    soundService.playConfirmSound();
    setGameState(GameState.QUIZ);
  };

  const handleRestart = () => {
    soundService.playSelectSound();
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
    setError(null);
    setGameState(GameState.START);
  };
  
  const processAndFetchResults = useCallback(async (finalAnswers: MBTIType[]) => {
    setGameState(GameState.ANALYZING);
    setError(null);

    const counts: MBTICounter = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    finalAnswers.forEach(answer => counts[answer]++);
    
    const mbtiType = [
      counts.E >= counts.I ? 'E' : 'I',
      counts.S >= counts.N ? 'S' : 'N',
      counts.T >= counts.F ? 'T' : 'F',
      counts.J >= counts.P ? 'J' : 'P'
    ].join('');

    try {
      const description = await getLearningStyleDescription(mbtiType);
      setResult({
        type: mbtiType,
        ...description,
      });
      soundService.playSuccessSound();
      setGameState(GameState.RESULTS);
    } catch (err) {
      console.error(err);
      setError('매트릭스에 오류가 발생했습니다! 학습 프로필을 가져올 수 없습니다. 다시 시도해 주세요.');
      soundService.playErrorSound();
      setGameState(GameState.RESULTS);
    }
  }, []);

  const handleAnswer = (answerType: MBTIType) => {
    soundService.playSelectSound();
    const newAnswers = [...answers, answerType];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      processAndFetchResults(newAnswers);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.START:
        return <StartScreen onStart={handleStart} />;
      case GameState.QUIZ:
        return (
          <QuizScreen
            question={QUIZ_QUESTIONS[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={QUIZ_QUESTIONS.length}
          />
        );
      case GameState.ANALYZING:
        return <AnalyzingScreen />;
      case GameState.RESULTS:
        return <ResultScreen result={result} error={error} onRestart={handleRestart} />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <main className="w-full max-w-4xl flex-grow flex items-center justify-center">{renderContent()}</main>
      <footer className="w-full text-center p-4 text-stone-500 text-sm">
        © 2025 hanny
      </footer>
    </div>
  );
};

export default App;