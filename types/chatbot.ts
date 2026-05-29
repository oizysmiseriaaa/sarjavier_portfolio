export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

export type ChatbotRequest = {
  messages: ChatMessage[];
};

export type ChatbotResponse = {
  message: string;
};
