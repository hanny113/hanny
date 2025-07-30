
import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    question: '새로운 퀘스트! 어떻게 준비하시겠어요?',
    answers: [
      { text: '파티를 모아 함께 브레인스토밍한다.', type: 'E' },
      { text: '혼자서 지도를 연구한다.', type: 'I' },
    ],
  },
  {
    question: '새로운 마법을 배울 때, 당신은...',
    answers: [
      { text: '실용적인 사용법과 결과에 집중한다.', type: 'S' },
      { text: '근본적인 마법 이론에 집중한다.', type: 'N' },
    ],
  },
  {
    question: '퍼즐이 길을 막고 있습니다. 당신은...',
    answers: [
      { text: '차갑고 냉정한 논리로 결정한다.', type: 'T' },
      { text: '직감과 파티의 조화를 고려해 결정한다.', type: 'F' },
    ],
  },
  {
    question: '보물 지도를 발견했습니다. 다음 행동은?',
    answers: [
      { text: '지금 당장 전체 경로를 계획한다.', type: 'J' },
      { text: '일단 출발하고 본다.', type: 'P' },
    ],
  },
  {
    question: '당신에게 이상적인 학습 환경은...',
    answers: [
      { text: '활기찬 도서관이나 스터디 그룹.', type: 'E' },
      { text: '조용하고 외진 탑.', type: 'I' },
    ],
  },
  {
    question: '당신이 선호하는 수업은...',
    answers: [
      { text: '사실과 세부 사항에 기반한 수업.', type: 'S' },
      { text: '아이디어와 가능성이 가득한 수업.', type: 'N' },
    ],
  },
  {
    question: '팀원에게 피드백을 줄 때, 당신은...',
    answers: [
      { text: '상처가 되더라도 직설적이고 솔직하게 말한다.', type: 'T' },
      { text: '재치 있고 격려적으로 말한다.', type: 'F' },
    ],
  },
  {
    question: '긴 모험 끝에, 당신은...',
    answers: [
      { text: '다음 날 계획을 미리 세워둔다.', type: 'J' },
      { text: '내일의 선택지를 열어둔다.', type: 'P' },
    ],
  },
   {
    question: '당신은 어디에서 에너지를 얻나요?',
    answers: [
      { text: '다양한 모험가들과 교류하는 것.', type: 'E' },
      { text: '조용한 사색과 성찰.', type: 'I' },
    ],
  },
  {
    question: '드래곤과 마주했을 때, 당신은...',
    answers: [
      { text: '비슷한 짐승을 상대했던 과거 경험을 믿는다.', type: 'S' },
      { text: '새롭고 검증되지 않았지만 기발한 전략을 믿는다.', type: 'N' },
    ],
  },
  {
    question: '팀 프로젝트에서 가장 중요한 것은...',
    answers: [
      { text: '효율적이고 논리적인 결과.', type: 'T' },
      { text: '모두가 존중받는다고 느끼게 하는 것.', type: 'F' },
    ],
  },
  {
    question: '당신의 인벤토리는...',
    answers: [
      { text: '모든 것이 제자리에 깔끔하게 정리되어 있다.', type: 'J' },
      { text: '유용한 물건들이 혼돈스럽게 모여 있다.', type: 'P' },
    ],
  },
];