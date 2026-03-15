import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ServiceModal from "./ServiceModal";
import * as forms from "@/lib/forms";

vi.mock("@/lib/forms", () => ({
  getFormspreeId: vi.fn(),
  hasFormspreeConfig: vi.fn(),
}));

describe("ServiceModal", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("disables online submit when Formspree is not configured", () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(false);
    vi.mocked(forms.getFormspreeId).mockReturnValue("");

    render(
      <ServiceModal
        open
        onOpenChange={vi.fn()}
        serviceName="Custom Software"
        serviceDescription="Build internal tools and customer-facing products."
      />,
    );

    expect(screen.getByText(/online submission is temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit inquiry/i })).toBeDisabled();
  });

  it("submits successfully when Formspree is configured", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
    } as Response);

    render(
      <ServiceModal
        open
        onOpenChange={vi.fn()}
        serviceName="Applied AI"
        serviceDescription="Integrate AI into an existing workflow."
      />,
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Frank" } });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "frank@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://formspree.io/f/test-form-id",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });

    expect(await screen.findByText(/your inquiry has been submitted/i)).toBeInTheDocument();
  });
});
