import { Check } from "lucide-react";
import type { Question } from "@/lib/audit/questions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  value?: string;
  onAnswer: (optionId: string) => void;
  onSkip?: () => void;
}

const QuestionCard = ({ question, value, onAnswer, onSkip }: QuestionCardProps) => {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
        {question.prompt}
      </h2>
      {question.helpText ? <p className="mt-2 text-sm text-black/60">{question.helpText}</p> : null}

      <div className="mt-8 grid gap-3">
        {question.options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onAnswer(option.id)}
              aria-pressed={selected}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-base font-medium transition-colors duration-200",
                selected
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-black/15 bg-white text-black hover:border-primary/40 hover:bg-primary/5",
              )}
            >
              <span>{option.label}</span>
              {selected ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>

      {!question.required && onSkip ? (
        <button
          type="button"
          onClick={onSkip}
          className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-black/50 hover:text-black/80"
        >
          Skip this question
        </button>
      ) : null}
    </div>
  );
};

export default QuestionCard;
