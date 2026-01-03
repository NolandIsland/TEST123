
import { GoogleGenAI } from "@google/genai";
import { AuditResult, ChecklistItem } from "../types";

export const getAuditSuggestions = async (
  failedItems: { item: ChecklistItem; result: AuditResult }[]
): Promise<string> => {
  if (failedItems.length === 0) {
    return "The audit was perfect! Keep maintaining these high standards to ensure customer satisfaction and operational excellence.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const failedDescriptions = failedItems
    .map((fi, idx) => `${idx + 1}. ${fi.item.title}: ${fi.result.comment || 'No comment provided.'}`)
    .join('\n');

  const prompt = `
    You are an expert store operations auditor for BING CHUN (Ice Cream & Tea).
    The following items failed during a store audit:
    ${failedDescriptions}

    Please provide a structured, professional, and encouraging set of actionable improvement suggestions to help the store team fix these issues and prepare for the next audit. 
    Focus on practical steps and BING CHUN standard compliance.
    Return the response as a clear Markdown list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Unable to generate suggestions at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the AI service. Please review the failed items manually.";
  }
};
