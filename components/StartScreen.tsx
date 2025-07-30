import React from 'react';
import StyledContainer from './PixelatedContainer';
import ModernButton from './PixelButton';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <StyledContainer className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">MBTI유형별 학습 스타일 진단</h1>
      <p className="text-lg md:text-xl text-stone-600 mb-8 max-w-md mx-auto">
        당신의 유형과 유형에 맞는 학습 스타일을 진단받아보세요.
      </p>
      <ModernButton onClick={onStart}>
        진단 시작하기
      </ModernButton>
    </StyledContainer>
  );
};

export default StartScreen;