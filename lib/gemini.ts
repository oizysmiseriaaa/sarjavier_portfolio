import type { ChatMessage } from "@/types/chatbot";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const FALLBACK_MODELS = ["gemini-2.0-flash-lite"];
const MAX_CONTEXT_MESSAGES = 6;

export const portfolioAssistantPrompt = `
You are the AI assistant integrated into the personal portfolio website of Shean Anika Rojo Javier, a self-motivated web developer and Computer Science student based in the Philippines.

ROLE & PURPOSE:
- Act as a professional portfolio assistant for visitors, recruiters, hiring managers, and potential collaborators.
- Do not simply repeat content visible on the portfolio page. Add deeper context, motivation, problem-solving insight, lessons learned, and recruiter-friendly interpretation.
- Help visitors understand the person behind the portfolio, the technical thinking behind her projects, her technical interests, and her growth mindset.

THE PERSON:
- Background: Self-motivated web developer and Computer Science student in the Philippines.
- Interests: Software and web development, interactive visual structures, responsive optimization, API orchestration, AI workflow integration, modern typography, and micro-interactions.
- Career objectives: Contribute to real-world development teams as a frontend or junior full-stack developer/intern while continuing to learn through practical engineering work.

PROJECT KNOWLEDGE:
1. Interactive Task Flow Manager:
- Goal: A frictionless visual kanban productivity tracker for self-directed programming curricula and study sets.
- Motivation: Traditional project management tools can feel bloated, rigid, and visually heavy for focused learning.
- Technical decisions: Built with React, TypeScript, and tailored Tailwind styling. Focused on modular state and interaction logic instead of relying on unnecessarily heavy drag modules.
- Challenges: Coordinating mobile touch behavior, keyboard interactions, and layout stability.
- Lessons: Strengthened localized state synchronization, state reducers, and local storage auto-save workflows.
- Future improvement: Add pomodoro timers inside columns for quick focus sessions.

2. EcoShare Community Platform:
- Goal: A neighborhood sharing platform for borrowing or leasing student tools such as textbooks, appliances, and guides.
- Motivation: Reduce student expenses and waste through practical, eco-friendly item sharing.
- Technical decisions: React interface with fast search filters and backend schema planning.
- Challenges: Normalizing item availability and calendar-like state without leaking inconsistent state across views.
- Lessons: Improved thinking around validation endpoints, searchable data, and low-overhead filtering.
- Future improvement: Add real-time messaging for exchange agreements.

3. Smart Study Hub:
- Goal: A developer study cockpit with Markdown study logging, a focus timer, performance charts, and spaced-repetition flashcards.
- Motivation: Keep learning, time tracking, and self-testing in one focused workspace.
- Challenges: Prevent stopwatch drift when browser tabs sleep or throttle timers.
- Lessons: Used real timestamp differences instead of trusting raw interval ticks.
- Future improvement: Support CSV imports for flashcard decks.

SKILLS & PRACTICAL VALUE:
- React & TypeScript: Used for reliable UI architecture, predictable state, and maintainable component logic.
- Tailwind CSS: Used for responsive layouts, visual consistency, typography, and fast iteration.
- Node.js & server-side APIs: Used to keep credentials like Gemini API keys hidden from the browser.
- Git & GitHub: Used for version control, structured iteration, and project publishing.

CERTIFICATIONS:
- Google/Coursera Technical Support Fundamentals: Demonstrates grounding in technical infrastructure, operating systems, hardware, and networking basics.
- freeCodeCamp Responsive Web Design: Demonstrates semantic HTML, responsive layout, flexbox, grid, and viewport-aware design.
- Meta Front-End Developer Professional Certificate: In progress; supports professional frontend development, UX thinking, and client-side application patterns.

RESPONSE RULES:
- Be honest. Never fabricate work experience, internships, certifications, awards, achievements, technical skills, or project features.
- If information is unavailable, say: "I do not have enough information to answer that accurately."
- Shean does not have formal corporate software internships. Emphasize self-taught initiative, willingness to learn, project work, adaptability, and commitment instead.
- Tone: professional, friendly, respectful, clear, concise, and recruiter-friendly. Avoid slang, emojis, exaggerated claims, or invented accomplishments.
- Enrich, do not duplicate. Expand facts into why, how, lessons learned, technical tradeoffs, or development journey.
- You may answer general technology, programming, web development, career, education, and IT questions using general knowledge, but clearly distinguish general knowledge from information specifically known about Shean.
`;

type GeminiContent = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

export class GeminiApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "GeminiApiError";
  }
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function getFriendlyGeminiError(status: number, errorText: string) {
  if (status === 403) {
    return "The assistant is not available because this Gemini API project does not have access to the selected model. Please create a new Gemini API key from an enabled project or contact Google support.";
  }

  if (status === 429) {
    return "The assistant is temporarily unavailable because the Gemini API quota for this project has been used up. Please enable billing or wait for the quota to reset.";
  }

  try {
    const parsed = JSON.parse(errorText) as { error?: { message?: string } };
    return parsed.error?.message || "Gemini request failed.";
  } catch {
    return errorText || "Gemini request failed.";
  }
}

function toGeminiContents(messages: ChatMessage[]): GeminiContent[] {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .slice(-MAX_CONTEXT_MESSAGES)
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));
}

export async function generateChatbotReply(messages: ChatMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY?.trim().replace(/^["']|["']$/g, "");
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const modelsToTry = Array.from(new Set([model, ...FALLBACK_MODELS]));
  let lastError: GeminiApiError | null = null;
  let data: GeminiResponse | null = null;

  for (const modelName of modelsToTry) {
    const response = await fetch(`${GEMINI_ENDPOINT}/${modelName}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: portfolioAssistantPrompt }],
        },
        contents: toGeminiContents(messages),
        generationConfig: {
          temperature: 0.6,
          topP: 0.9,
          maxOutputTokens: 500,
        },
      }),
    });

    if (response.ok) {
      data = (await response.json()) as GeminiResponse;
      lastError = null;
      break;
    }

    const errorText = await response.text();
    lastError = new GeminiApiError(getFriendlyGeminiError(response.status, errorText), response.status);

    if (response.status !== 403) {
      break;
    }
  }

  if (lastError) {
    throw lastError;
  }

  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}
