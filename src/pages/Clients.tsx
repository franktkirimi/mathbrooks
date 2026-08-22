import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AlertCircle, CheckCircle, Clock3, Mail, MessageCircle, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getFormspreeId, hasFormspreeConfig } from "@/lib/forms";

type FormStatus = "idle" | "submitting" | "success" | "error";

const nextSteps = [
  ["01", "We read the context", "A person reviews what you send—not an automated qualification system."],
  ["02", "We define the next systems step", "That may be an architecture review, a product demonstration, or a few focused questions."],
  ["03", "You get a clear response", "We reply within one business day and tell you what we think should happen next."],
];

const Clients = () => {
  const location = useLocation();
  const isContact = location.pathname === "/contact";
  const isBookDemo = location.pathname === "/book-demo";
  const isStartTrial = location.pathname === "/start-trial";
  const pageLabel = isStartTrial ? "Guided trial" : isBookDemo ? "Book a demo" : "Request Systems Brief";
  const pageTitle = isStartTrial
    ? "Start with the work you want to test."
    : isBookDemo
      ? "See the part that matters to your work."
      : "Brief us on the system your mission requires.";
  const pageDescription = isStartTrial
    ? "Tell us which solution you want to try and what you need to learn from the trial."
    : isBookDemo
      ? "Give us the context first. We will show you the MathBrooks solution most relevant to your operation."
      : "Describe the mission, constraints, operating environment, and outcome. We will define the right architecture or deployable product path.";
  const canonicalPath = isStartTrial ? "/start-trial" : isBookDemo ? "/book-demo" : isContact ? "/contact" : "/clients";
  const searchParams = new URLSearchParams(location.search);
  const selectedProductEntry = products.find((entry) => entry.slug === searchParams.get("product"));
  const initialProduct = selectedProductEntry?.shortName ?? "";
  const initialPlan = searchParams.get("plan") ?? "";
  const initialDescription = initialProduct
    ? `We would like to discuss ${initialProduct}${initialPlan ? ` on the ${initialPlan} plan` : ""}.`
    : "";

  usePageMeta({
    title: `${pageLabel} | MathBrooks`,
    description: pageDescription,
    canonicalPath,
    keywords: ["MathBrooks contact", "book software demo", "technology project inquiry"],
  });

  const formspreeConfigured = hasFormspreeConfig();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const isValid = name.trim().length > 0 && email.trim().length > 0 && description.trim().length > 0;

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setDescription(initialDescription);
    setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid || !formspreeConfigured) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${getFormspreeId()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `${pageLabel} request — MathBrooks`,
          name,
          email,
          company,
          product_interest: initialProduct,
          plan_interest: initialPlan,
          description,
        }),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <SiteLayout>
      <section className="px-5 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div>
            <AnimatedSection>
              <p className="mb-caption text-primary">{pageLabel}</p>
              <h1 className="mt-6 max-w-2xl font-display text-[clamp(3.5rem,6.6vw,6.5rem)] font-semibold leading-[0.91] tracking-[-0.06em] text-black">{pageTitle}</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-black md:text-xl md:leading-9">{pageDescription}</p>
            </AnimatedSection>

            <AnimatedSection delay={80} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a href="mailto:cto@mathbrooks.com" className="group rounded-xl border border-black bg-white p-5 transition hover:bg-[#f4fbfa]">
                <Mail className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-5 font-display text-sm font-semibold text-black">Email directly</p>
                <p className="mt-2 text-sm text-black">cto@mathbrooks.com</p>
              </a>
              <a href="https://wa.me/263783469023" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-black bg-white p-5 transition hover:bg-[#f4fbfa]">
                <MessageCircle className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-5 font-display text-sm font-semibold text-black">Use WhatsApp</p>
                <p className="mt-2 text-sm text-black">+263 78 346 9023</p>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={120} className="mt-12 border-t border-black pt-8">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <h2 className="font-display text-xl font-semibold text-black">What happens next</h2>
              </div>
              <ol className="mt-6 divide-y divide-black/20 border-y border-black/20">
                {nextSteps.map(([number, title, copy]) => (
                  <li key={number} className="grid gap-2 py-5 sm:grid-cols-[2.5rem_1fr]">
                    <span className="font-mono text-xs font-semibold text-primary">{number}</span>
                    <div>
                      <p className="font-display text-sm font-semibold text-black">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-black">{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={100} className="lg:pt-4">
            <div className="overflow-hidden rounded-[2rem] border border-black bg-white shadow-[var(--shadow-overlay)]">
              <div className="border-b border-black bg-black px-6 py-6 text-white md:px-9">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#71d7d5]">Systems brief</p>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">No long brief required. Give us enough context to understand where the friction is.</p>
              </div>

              {status === "success" ? (
                <div className="flex min-h-[32rem] flex-col items-center justify-center px-7 py-12 text-center md:px-10">
                  <CheckCircle className="h-12 w-12 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Systems brief received</p>
                  <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-black">Thank you.</h2>
                  <p className="mt-4 max-w-sm text-base leading-7 text-black">We will respond within one business day with a clear next step.</p>
                  <Button onClick={resetForm} variant="outline" className="mt-8">Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-9" aria-describedby="contact-note">
                  {status === "error" ? (
                    <div className="flex items-start gap-3 rounded-md border border-error-border bg-error-subtle px-4 py-3 text-sm leading-6 text-error-text" role="alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {formspreeConfigured
                        ? "We could not send your message. Please try again or use WhatsApp."
                        : "Online messages are unavailable right now. Please use WhatsApp or email."}
                    </div>
                  ) : null}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name <span className="text-error" aria-hidden="true">*</span></Label>
                      <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-error" aria-hidden="true">*</span></Label>
                      <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Organisation <span className="font-normal text-black/55">(optional)</span></Label>
                    <Input id="company" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Organisation name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">What must the system achieve? <span className="text-error" aria-hidden="true">*</span></Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="The mission, constraints, existing systems, and required outcome."
                      required
                      className="min-h-44"
                    />
                  </div>

                  {initialProduct ? (
                    <p className="rounded-md bg-muted px-3 py-2 text-sm text-black">About: {initialProduct}{initialPlan ? ` · ${initialPlan}` : ""}</p>
                  ) : null}

                  <Button type="submit" size="lg" className="w-full" disabled={!isValid || status === "submitting" || !formspreeConfigured}>
                    <Send className="h-4 w-4" />
                    {status === "submitting" ? "Sending…" : "Request Systems Brief"}
                  </Button>
                  <p id="contact-note" className="text-center text-xs leading-5 text-black/65">We only use these details to respond to this enquiry.</p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Clients;
