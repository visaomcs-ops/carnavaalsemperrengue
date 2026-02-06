import { GoogleGenAI, Chat } from "@google/genai";
import { SearchResult } from "../types";

// Helper to get API key safely
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const searchCarnivalInfo = async (query: string): Promise<SearchResult> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key not found. Using mock response.");
    return {
      text: "Para obter informações em tempo real, configure sua API Key. Por enquanto, aqui está uma dica genérica: **Beba água** e use **protetor solar**!",
      sources: []
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-3-flash-preview for speed and search capability
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um guia de Carnaval experiente e descolado. Forneça respostas curtas, úteis e diretas. Use **negrito** (markdown) para destacar APENAS as informações mais importantes: nomes de blocos, horários, locais exatos e datas. Priorize 2024/2025."
      }
    });

    const text = response.text || "Não consegui encontrar informações no momento.";
    
    // Extract sources if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map((chunk: any) => chunk.web)
      .filter((web: any) => web)
      .map((web: any) => ({
        title: web.title,
        uri: web.uri
      }));

    return { text, sources };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Desculpe, tive um problema ao conectar com a central do Carnaval. Tente novamente em breve.",
      sources: []
    };
  }
};

export const getChatSession = (): Chat | null => {
    const apiKey = getApiKey();
    if (!apiKey) return null;

    const ai = new GoogleGenAI({ apiKey });
    return ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: "Você é o 'Assistente da Folia', um companheiro de Carnaval divertido, seguro e prestativo. Seu tom é animado, gírias leves são permitidas, mas sempre priorize a segurança e a clareza. Responda dúvidas sobre blocos, o que levar, como chegar, e dicas de segurança. Use emojis moderadamente. Formate informações importantes em **negrito**.",
        }
    });
};