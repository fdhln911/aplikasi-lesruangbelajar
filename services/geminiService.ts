
import { GoogleGenAI, Type } from "@google/genai";
import { Question, PerformanceRecord, Recommendation, PerformanceAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateQuestions = async (topic: string, count: number = 5): Promise<Question[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate ${count} high-quality multiple choice questions for a middle school student in Indonesian language about: ${topic}. Each question must have exactly 4 options and one correct answer.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["id", "text", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse questions", e);
    return [];
  }
};

export const explainConcept = async (concept: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Jelaskan konsep berikut untuk anak sekolah dengan gaya bahasa yang seru, mudah dimengerti, dan menggunakan analogi sehari-hari: ${concept}. Format dalam Markdown.`,
  });
  return response.text || "Gagal mendapatkan penjelasan.";
};

export const analyzePerformance = async (history: PerformanceRecord[]): Promise<PerformanceAnalysis> => {
  const historySummary = history.map(h => 
    `- ${h.subjectName} (${h.topic}): Skor ${h.score}/${h.total}`
  ).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Sebagai pakar pendidikan, analisis riwayat belajar siswa berikut:\n${historySummary}\n\nBerikan analisis mendalam mengenai kekuatan, kelemahan, dan rencana aksi nyata.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          actionPlan: { type: Type.STRING }
        },
        required: ["summary", "strengths", "weaknesses", "actionPlan"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      summary: "Belajar yang rajin ya!",
      strengths: ["Semangat belajar"],
      weaknesses: ["Perlu lebih banyak latihan"],
      actionPlan: "Lanjutkan latihan soal setiap hari."
    };
  }
};

export const getRecommendations = async (history: PerformanceRecord[]): Promise<Recommendation[]> => {
  if (history.length === 0) return [];

  const historySummary = history.map(h => 
    `- ${h.type} on ${h.subjectName} (${h.topic}): Score ${h.score}/${h.total}`
  ).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Berdasarkan riwayat belajar siswa berikut, buatkan 3 rekomendasi personal untuk meningkatkan nilai mereka. Jika nilai rendah di suatu topik, sarankan materi dasar. Jika tinggi, sarankan tantangan lebih lanjut.\n\nRiwayat:\n${historySummary}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            actionLabel: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['LESSON', 'PRACTICE'] },
            reason: { type: Type.STRING },
            targetTopic: { type: Type.STRING }
          },
          required: ["title", "description", "actionLabel", "type", "reason", "targetTopic"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse recommendations", e);
    return [];
  }
};
