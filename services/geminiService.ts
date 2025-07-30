
import { GoogleGenAI, Type } from "@google/genai";
import { MBTIResultDescription, StudyPlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    title: { 
      type: Type.STRING, 
      description: "이 학습 유형에 대한 창의적인 8비트 게임 스타일의 직업명. 예: '전략가 현자', '픽셀 개척자'." 
    },
    description: { 
      type: Type.STRING, 
      description: "이 학습 스타일의 핵심 특성을 격려적이고 8비트 게임 톤으로 설명하는 문단." 
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "이 학습 유형의 '파워업' 또는 강점 목록."
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "이 학습 유형의 '크립토나이트' 또는 잠재적인 약점 목록."
    },
    studyTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "'공략집' 또는 추천 학습 방법 목록."
    },
  },
  required: ["title", "description", "strengths", "weaknesses", "studyTips"],
};


export const getLearningStyleDescription = async (mbtiType: string): Promise<MBTIResultDescription> => {
  const prompt = `당신은 8비트 레트로 비디오 게임에 대한 감각을 지닌 교육 심리학 및 MBTI 프레임워크 전문가입니다.
MBTI 유형 "${mbtiType}"을 기반으로 학생을 위한 상세한 학습 스타일 분석을 한국어로 제공해주세요.
분석은 긍정적이고 격려적이며 이해하기 쉬워야 하며, 톤과 언어는 8비트 게임 테마를 사용해야 합니다. 예를 들어, 학습 유형을 "클래스" 또는 "캐릭터 빌드"라고 부르세요.
출력은 제공된 스키마를 엄격하게 따르는 유효한 JSON 객체여야 합니다. \`\`\`json과 같은 마크다운 서식을 포함하지 마세요.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    
    const jsonText = response.text;
    const parsedResult = JSON.parse(jsonText) as MBTIResultDescription;
    return parsedResult;

  } catch (error) {
    console.error("Error fetching or parsing Gemini response:", error);
    throw new Error("Failed to get learning style description from Gemini.");
  }
};

const studyPlanSchema = {
  type: Type.OBJECT,
  properties: {
    questTitle: {
      type: Type.STRING,
      description: "주제에 대한 창의적인 8비트 게임 스타일의 퀘스트 제목. 예: '대수학의 던전', '고대 로마 연대기'."
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepTitle: {
            type: Type.STRING,
            description: "학습 단계의 제목. 예: '1단계: 변수 길들이기', '보스전: 율리우스 카이사르'."
          },
          description: {
            type: Type.STRING,
            description: "해당 MBTI 유형에 맞춰진, 이 단계를 완료하기 위한 상세한 설명."
          }
        },
        required: ["stepTitle", "description"]
      }
    }
  },
  required: ["questTitle", "steps"]
};

export const getCustomStudyPlan = async (mbtiType: string, topic: string): Promise<StudyPlan> => {
    const prompt = `당신은 8비트 레트로 비디오 게임 테마의 교육 전문가입니다. 
MBTI 유형이 "${mbtiType}"인 학생을 위해 "${topic}" 주제에 대한 맞춤형 '학습 퀘스트'를 한국어로 생성해주세요. 
각 단계는 "${mbtiType}" 유형의 강점을 활용하고 약점을 보완하도록 설계되어야 합니다.
분석은 긍정적이고 격려적이며 이해하기 쉬워야 하며, 톤과 언어는 8비트 게임 테마를 사용해야 합니다.
출력은 제공된 스키마를 엄격하게 따르는 유효한 JSON 객체여야 합니다. \`\`\`json과 같은 마크다운 서식을 포함하지 마세요.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: studyPlanSchema,
            },
        });
        
        const jsonText = response.text;
        const parsedResult = JSON.parse(jsonText) as StudyPlan;
        return parsedResult;

    } catch (error) {
        console.error("Error fetching or parsing Gemini study plan response:", error);
        throw new Error("Failed to get custom study plan from Gemini.");
    }
};
