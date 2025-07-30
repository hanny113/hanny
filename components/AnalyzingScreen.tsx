import React from 'react';
import StyledContainer from './PixelatedContainer';

const AnalyzingScreen: React.FC = () => {
  return (
    <StyledContainer>
      <div className="flex flex-col items-center justify-center">
         <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl md:text-3xl text-stone-700 font-semibold animate-pulse">
          결과를 분석하는 중...
        </h2>
        <p className="text-stone-500 mt-2">당신만을 위한 학습법을 찾고 있어요!</p>
      </div>
    </StyledContainer>
  );
};

export default AnalyzingScreen;