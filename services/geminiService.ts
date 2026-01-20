
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { PunkData } from "../types";

// Base instance for general tasks
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Search Grounding - Gemini 3 Flash Preview
export const getEnrichedPunkData = async (query: string): Promise<PunkData | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find comprehensive connections between punk bands and members in the period 1975-1985 for: "${query}". 
      If a band is requested, find all known historical members. 
      For each band and person found, try to provide a publicly accessible URL for an era-appropriate photograph (e.g. from Wikimedia Commons).
      Return JSON with 'nodes' (bands/people) and 'links' (membership). 
      IDs should be unique lowercase hyphenated. English descriptions.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['band', 'person'] },
                  description: { type: Type.STRING },
                  activeYears: { type: Type.STRING },
                  imageUrl: { type: Type.STRING, description: 'Publicly available URL of a historical photo' }
                },
                required: ['id', 'name', 'type']
              }
            },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  role: { type: Type.STRING }
                },
                required: ['source', 'target']
              }
            }
          },
          required: ['nodes', 'links']
        }
      }
    });
    return JSON.parse(response.text) as PunkData;
  } catch (error) {
    console.error("Search Grounding Error:", error);
    return null;
  }
};

// Image Generation - Gemini 3 Pro Image Preview
export const generatePunkPoster = async (prompt: string, aspectRatio: string): Promise<string | null> => {
  try {
    const proAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await proAi.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: { parts: [{ text: `Create an authentic 1970s British punk rock DIY fanzine style poster: ${prompt}. Gritty, xeroxed texture, high contrast.` }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: "1K"
        }
      }
    });
    const part = response.candidates[0].content.parts.find(p => p.inlineData);
    return part ? `data:image/png;base64,${part.inlineData.data}` : null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

// Image/Video/Audio Analysis - Gemini 3 Pro Preview & Gemini 3 Flash Preview
export const analyzeMedia = async (file: File, prompt: string): Promise<string> => {
  const reader = new FileReader();
  const base64Promise = new Promise<string>((resolve) => {
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  const data = await base64Promise;
  
  const isAudio = file.type.startsWith('audio');
  const model = isAudio ? 'gemini-3-flash-preview' : 'gemini-3-pro-preview';
  
  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        { inlineData: { data, mimeType: file.type } },
        { text: prompt }
      ]
    }
  });
  return response.text || "Could not analyze file.";
};

// Audio Transcription - Gemini 3 Flash Preview
export const transcribeMicrophone = async (base64Data: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'audio/webm' } },
        { text: "Transcribe this audio accurately. If it's music, describe the style." }
      ]
    }
  });
  return response.text || "No transcription available.";
};

export interface MediaLink {
  title: string;
  url: string;
  thumbnail?: string;
}

export interface DiscographyItem extends MediaLink {
  year?: string;
}

export const getMediaLinks = async (name: string): Promise<MediaLink[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Videos or audio for punk artist: "${name}" (1975-1985).`,
    config: { tools: [{ googleSearch: {} }] },
  });
  return (response.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
    .filter((c: any) => c.web)
    .map((c: any) => ({ title: c.web.title, url: c.web.uri }));
};

export const getPhotos = async (name: string): Promise<MediaLink[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find high-quality historical photos of the punk band or artist "${name}" from the 1975-1985 era.
      Provide the source webpage URL and, if possible, a direct public URL to the image file (e.g. from Wikimedia).
      Return ONLY a JSON array of objects with 'title', 'url' (webpage), and 'thumbnail' (direct image URL).`,
      config: { 
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              url: { type: Type.STRING },
              thumbnail: { type: Type.STRING, description: "Direct link to image file" }
            },
            required: ['title', 'url']
          }
        }
      },
    });
    return JSON.parse(response.text) as MediaLink[];
  } catch (error) {
    console.error("Photos Search Error:", error);
    return [];
  }
};

export const getDiscography = async (name: string): Promise<DiscographyItem[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Discography for punk artist: "${name}" (1975-1985).`,
    config: { tools: [{ googleSearch: {} }] },
  });
  return (response.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
    .filter((c: any) => c.web)
    .map((c: any) => ({
      title: c.web.title,
      url: c.web.uri,
      year: c.web.title.match(/\b(197\d|198[0-5])\b/)?.[0]
    }));
};
