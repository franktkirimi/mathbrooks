import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuestionCard from "./QuestionCard";
import type { Question } from "@/lib/audit/questions";

const selectQuestion: Question = {
  id: "industry",
  sectionId: "context",
  category: "context",
  prompt: "What kind of business is this?",
  options: [
    { id: "hardware", label: "Hardware & building supplies" },
    { id: "other", label: "Something else" },
  ],
  required: true,
};

const textQuestion: Question = {
  id: "industry_other_detail",
  sectionId: "context",
  category: "context",
  prompt: "What kind of business is it?",
  helpText: "This is just for context — it doesn't affect your score.",
  inputType: "text",
  inputPlaceholder: "e.g. film production, funeral services, courier",
  options: [],
  required: true,
};

describe("QuestionCard — select mode", () => {
  it("renders every option as a button and calls onAnswer with its id", () => {
    const onAnswer = vi.fn();
    render(<QuestionCard question={selectQuestion} onAnswer={onAnswer} />);
    fireEvent.click(screen.getByRole("button", { name: /something else/i }));
    expect(onAnswer).toHaveBeenCalledWith("other");
  });
});

describe("QuestionCard — text mode (product fix: 'Something else' can now be specified)", () => {
  it("renders a free-text input instead of option buttons", () => {
    render(<QuestionCard question={textQuestion} onAnswer={vi.fn()} />);
    expect(screen.getByPlaceholderText(/film production/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /hardware/i })).not.toBeInTheDocument();
  });

  it("disables Continue until something is typed, and submits the trimmed value", () => {
    const onAnswer = vi.fn();
    render(<QuestionCard question={textQuestion} onAnswer={onAnswer} />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/film production/i), { target: { value: "  Funeral services  " } });
    expect(continueButton).not.toBeDisabled();

    fireEvent.click(continueButton);
    expect(onAnswer).toHaveBeenCalledWith("Funeral services");
  });

  it("does not submit on whitespace-only input", () => {
    const onAnswer = vi.fn();
    render(<QuestionCard question={textQuestion} onAnswer={onAnswer} />);
    fireEvent.change(screen.getByPlaceholderText(/film production/i), { target: { value: "   " } });
    expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
  });
});
