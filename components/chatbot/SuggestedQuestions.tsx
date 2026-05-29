"use client";

const questions = [
  "Tell me more about Shean.",
  "What can you tell me about the projects?",
  "What are Shean's career goals?",
  "What technologies interest Shean?",
  "What has Shean learned through project development?",
];

type SuggestedQuestionsProps = {
  disabled: boolean;
  onSelect: (question: string) => void;
};

export function SuggestedQuestions({ disabled, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
        Suggested questions
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(question)}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs font-medium text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
