import React, { useState } from 'react';
import { MBTIResult, StudyPlan } from '../types';
import StyledContainer from './PixelatedContainer';
import ModernButton from './PixelButton';
import { getCustomStudyPlan } from '../services/geminiService';
import * as soundService from '../services/soundService';


interface ResultScreenProps {
  result: MBTIResult | null;
  error: string | null;
  onRestart: () => void;
}

const ListSection: React.FC<{ title: string; items: string[]; icon: string; color: string }> = ({ title, items, icon, color }) => (
  <div className="mb-6">
    <h3 className={`text-2xl font-bold ${color} mb-3 flex items-center gap-2`}>
      <span>{icon}</span>
      <span>{title}</span>
    </h3>
    <ul className="list-none text-left space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-stone-600 text-lg flex items-start">
          <span className="text-orange-400 mr-2 mt-1">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CharacterAvatar: React.FC<{ mbti: string }> = ({ mbti }) => {
    const getGradient = (type: string) => {
        const gradients = {
            'E': 'from-red-400 to-yellow-400', 'I': 'from-blue-400 to-teal-400',
            'S': 'from-green-400 to-lime-400', 'N': 'from-purple-400 to-indigo-400',
            'T': 'from-gray-400 to-slate-400', 'F': 'from-pink-400 to-rose-400',
            'J': 'from-amber-400 to-orange-400', 'P': 'from-cyan-400 to-sky-400',
        };
        const [c1, c2, c3, c4] = mbti.split('');
        return `bg-gradient-to-br ${gradients[c1 as keyof typeof gradients] || ''} via-white ${gradients[c2 as keyof typeof gradients] || ''}`;
    };

    return (
        <div className={`mx-auto mb-6 w-28 h-28 rounded-full p-1 shadow-lg ${getGradient(mbti)}`}>
            <div className="w-full h-full bg-white/80 rounded-full flex items-center justify-center">
                 <span className="text-4xl font-bold text-stone-700">{mbti}</span>
            </div>
        </div>
    );
};


const ResultScreen: React.FC<ResultScreenProps> = ({ result, error, onRestart }) => {
  const [topic, setTopic] = useState('');
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    if (!topic.trim() || !result) return;
    soundService.playGenerateSound();
    setIsPlanLoading(true);
    setPlanError(null);
    setStudyPlan(null);

    try {
      const plan = await getCustomStudyPlan(result.type, topic);
      setStudyPlan(plan);
    } catch (err) {
      soundService.playErrorSound();
      setPlanError('죄송합니다. 퀘스트 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsPlanLoading(false);
    }
  };

  if (error) {
    return (
      <StyledContainer className="text-center">
        <h2 className="text-3xl text-red-500 font-bold mb-4">오류!</h2>
        <p className="text-xl text-stone-600 mb-8">{error}</p>
        <ModernButton onClick={onRestart} className="bg-red-500 hover:bg-red-600">
          다시 시도
        </ModernButton>
      </StyledContainer>
    );
  }

  if (!result) {
     return (
      <StyledContainer>
        <div className="flex flex-col items-center justify-center">
         <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl md:text-3xl text-stone-700 font-semibold animate-pulse">
          결과를 불러오는 중...
        </h2>
      </div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer className="text-left w-full max-w-4xl">
      <div className="text-center mb-10">
        <h2 className="text-xl text-stone-500">당신의 학습 유형은:</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 my-2">{result.title}</h1>
        <CharacterAvatar mbti={result.type} />
        <p className="text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">{result.description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 border-t-2 border-amber-200 pt-10">
          <ListSection title="강점" items={result.strengths} icon="✨" color="text-blue-500" />
          <ListSection title="보완점" items={result.weaknesses} icon="⚠️" color="text-red-500" />
          <div className="md:col-span-2">
            <ListSection title="학습 팁" items={result.studyTips} icon="💡" color="text-purple-500" />
          </div>
      </div>
      
       <div className="text-center mt-10 border-t-2 border-amber-200 pt-10">
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-stone-800 mb-2 flex items-center justify-center gap-2">💡 AI 학습 도우미</h3>
          <p className="text-stone-600">학습하고 싶은 주제를 입력하면, 당신의 유형에 맞는 맞춤 퀘스트를 생성해 드립니다!</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="예: 미적분, 세계사, React"
            className="bg-white border-2 border-stone-300 p-3 text-lg w-full rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            disabled={isPlanLoading}
          />
          <ModernButton
            onClick={handleGeneratePlan}
            disabled={isPlanLoading || !topic.trim()}
            className="w-full sm:w-auto"
          >
            {isPlanLoading ? '생성 중...' : '퀘스트 생성'}
          </ModernButton>
        </div>
        
        {isPlanLoading && (
          <div className="mt-8 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="ml-4 text-xl text-stone-600">나만의 퀘스트를 만드는 중...</p>
          </div>
        )}
        
        {planError && <p className="mt-6 text-red-500 text-xl">{planError}</p>}

        {studyPlan && (
          <div className="mt-8 text-left bg-white/50 rounded-xl p-6 border border-amber-200">
            <h4 className="text-3xl text-orange-600 font-bold mb-4 text-center">{studyPlan.questTitle}</h4>
            <ul className="space-y-6">
              {studyPlan.steps.map((step, index) => (
                <li key={index} className="border-b-2 border-dashed border-amber-200/50 pb-4 last:border-b-0">
                  <h5 className="text-2xl text-stone-700 font-semibold mb-2">{`STEP ${index + 1}: ${step.stepTitle}`}</h5>
                  <p className="text-stone-600 text-lg leading-relaxed whitespace-pre-wrap">{step.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <ModernButton onClick={onRestart}>
          다시하기
        </ModernButton>
      </div>
    </StyledContainer>
  );
};

export default ResultScreen;