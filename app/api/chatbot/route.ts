import { NextResponse } from "next/server";
import { GeminiApiError, generateChatbotReply } from "@/lib/gemini";
import type { ChatbotRequest } from "@/types/chatbot";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatbotRequest;

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "A message history is required." }, { status: 400 });
    }

    const messages = body.messages.filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
    );

    const message = await generateChatbotReply(messages);

    return NextResponse.json({ message });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate a response.";
    const status =
      error instanceof GeminiApiError
        ? error.status
        : message.includes("GEMINI_API_KEY")
          ? 500
          : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
