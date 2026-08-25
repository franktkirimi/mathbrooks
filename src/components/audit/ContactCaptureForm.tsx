import { useState, type FormEvent } from "react";
import { AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildAuditFormspreePayload, getFormspreeId, hasFormspreeConfig } from "@/lib/forms";
import { contactCaptureSchema } from "@/lib/audit/schema";

export interface AuditSummaryForCapture {
  efficiencyScore: number | null;
  frictionBand: string | null;
  leadScore: number;
  leadTier: string;
  topOpportunities: string[];
  recommendedProducts: string[];
  commercialPotential: string;
  complexityEstimate: string;
  nextAction: string;
}

export interface CapturedContact {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface ContactCaptureFormProps {
  auditSummary: AuditSummaryForCapture;
  onSuccess: (contact: CapturedContact) => void;
  onDecline: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const ContactCaptureForm = ({ auditSummary, onSuccess, onDecline }: ContactCaptureFormProps) => {
  const formspreeConfigured = hasFormspreeConfig();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFieldError(null);

    const parsed = contactCaptureSchema.safeParse({ name, email, phone, company });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    // This repo's tsconfig has `strict: false` (so `strictNullChecks` is off), which Zod's
    // type inference depends on to mark fields as required rather than optional — the runtime
    // validation above is unaffected, only Zod's *inferred* type is overly loose here, so we
    // cast to the hand-written CapturedContact shape rather than z.infer<typeof schema>.
    const contact = parsed.data as CapturedContact;

    if (!formspreeConfigured) {
      onSuccess(contact);
      return;
    }

    setStatus("submitting");
    try {
      const payload = buildAuditFormspreePayload({
        ...contact,
        efficiencyScore: auditSummary.efficiencyScore,
        frictionBand: auditSummary.frictionBand,
        leadScore: auditSummary.leadScore,
        leadTier: auditSummary.leadTier,
        topOpportunities: auditSummary.topOpportunities,
        recommendedProducts: auditSummary.recommendedProducts,
        commercialPotential: auditSummary.commercialPotential,
        complexityEstimate: auditSummary.complexityEstimate,
        nextAction: auditSummary.nextAction,
      });

      const response = await fetch(`https://formspree.io/f/${getFormspreeId()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        onSuccess(contact);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
        Where should we send your full audit?
      </h2>
      <p className="mt-3 text-base text-black/70">
        Your Digital Efficiency Score is ready. Share a few details and we'll unlock the full breakdown — every
        opportunity, why it matters, and what you could do about it.
      </p>

      {status === "error" ? (
        <div
          className="mt-6 flex items-start gap-3 rounded-md border border-error-border bg-error-subtle px-4 py-3 text-sm leading-6 text-error-text"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          We couldn't send that — please try again, or use WhatsApp from the results screen.
        </div>
      ) : null}

      {fieldError ? (
        <div
          className="mt-6 flex items-start gap-3 rounded-md border border-error-border bg-error-subtle px-4 py-3 text-sm leading-6 text-error-text"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {fieldError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="audit-name">Name</Label>
            <Input id="audit-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audit-email">Email</Label>
            <Input
              id="audit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="audit-phone">WhatsApp or phone</Label>
            <Input
              id="audit-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+263 7X XXX XXXX"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audit-company">Company</Label>
            <Input
              id="audit-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              required
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          <Send className="h-4 w-4" />
          {status === "submitting" ? "Sending…" : "Show my full audit"}
        </Button>

        <button
          type="button"
          onClick={onDecline}
          className="block w-full text-center font-mono text-xs uppercase tracking-[0.14em] text-black/50 hover:text-black/80"
        >
          Not right now — just show me the score
        </button>

        <p className="text-center text-xs leading-5 text-black/55">
          We only use these details to send your audit and follow up. See our{" "}
          <a href="/privacy" className="underline hover:text-black/80">
            privacy policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default ContactCaptureForm;
