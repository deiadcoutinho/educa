import { GoogleGenAI } from "@google/genai";
import { Subject } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getStudyTip(subject: Subject): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Dê uma dica de estudo motivacional rápida sobre ${subject}. Máximo 100 caracteres. Use emojis.`,
    });
    return response.text || "Foco nos estudos! 🚀";
  } catch (error) {
    return "Aprender é o seu superpoder! ✨";
  }
}