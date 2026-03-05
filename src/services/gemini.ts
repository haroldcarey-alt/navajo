import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ResearchResult {
  text: string;
  groundingMetadata?: any;
}

export async function generateResearchBrief(figureName: string): Promise<ResearchResult> {
  const model = "gemini-2.5-flash"; // Using 2.5-flash for search grounding support
  
  const prompt = `
Role: You are a Digital History Research Agent specializing in the American Southwest and Navajo genealogy.

Objective: Create a comprehensive research brief on the life and legacy of the historical figure: "${figureName}".

Instructions & Workflow:

1. Search & Verify: Use your search tool to find at least three primary historical sources and two secondary academic sources. Cross-reference dates of birth and major life events to ensure accuracy.
2. Contextualize: Research the specific clan affiliations and geographical locations associated with this person during the mid-19th century.
3. Drafting: Write a 500-word biographical summary.
4. Self-Correction: Review your own summary for any chronological inconsistencies. If you find a conflict in the dates provided by different sources, point it out in a "Discrepancy Note" at the end.
5. Visual Planning: Suggest five specific types of archival photos or maps (e.g., "1864 map of the Long Walk") that would best illustrate this biography for a website.

Output: Provide the biography, the source list, and the visual plan in a structured Markdown format. Use clear headings (## Biography, ## Sources, ## Visual Plan, ## Discrepancy Note).
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a meticulous digital historian. Always cite your sources and verify facts using Google Search.",
      },
    });

    return {
      text: response.text || "No response generated.",
      groundingMetadata: response.candidates?.[0]?.groundingMetadata,
    };
  } catch (error) {
    console.error("Error generating research brief:", error);
    throw error;
  }
}
