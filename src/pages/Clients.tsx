import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AlertCircle, CheckCircle, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePageMeta } from "@/hooks/usePageMeta";
import { products } from "@/content/siteContent";
import { getFormspreeId, hasFormspreeConfig } from "@/lib/forms";

type FormStatus = "idle" | "submitting" | "success" | "error";

const Clients = () => {
  const location = useLocation();
  const isContact = location.pathname === "/contact";
  const isBookDemo = location.pathname === "/book-demo";
  const isStartTrial = location.pathname === "/start-trial";
  const pageLabel = isStartTrial ? "Guided trial" : isBookDemo ? "Book a demo" : "Contact";
  const pageTitle = isStartTrial
    ? "Start a guided trial."
    : isBookDemo
      ? "Book a practical demo."
      : "Tell us what needs to work better.";
  const pageDescription = isStartTrial
    ? "Tell us which product you would like to try. We will respond within one business day."
    : isBookDemo
      ? "Tell us a little about your work. We will show you the most relevant MathBrooks solution."
      : "Share the challenge in a few words. We will respond within one business day with a clear next step.";
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
      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-2xl">
          {status === "success" ? (
            <AnimatedSection>
              <div className="mb-card space-y-5 text-center md:p-10">
                <CheckCircle className="mx-auto size-10 text-success" aria-hidden="true" />
                <div>
                  <p className="mb-caption text-primary">Message received</p>
                  <h1 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-foreground">Thank you.</h1>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">We will get back to you within one business day.</p>
                </div>
                <Button onClick={resetForm} variant="outline">Send another message</Button>
              </div>
            </AnimatedSection>
          ) : (
            <>
              <AnimatedSection className="mb-10 md:mb-12">
                <p className="mb-caption text-primary">{pageLabel}</p>
                <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">{pageTitle}</h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{pageDescription}</p>
              </AnimatedSection>

              <AnimatedSection delay={80}>
                <form onSubmit={handleSubmit} className="mb-card space-y-6" aria-describedby="contact-note">
                  {status === "error" ? (
                    <div className="flex items-start gap-3 rounded-md border border-error-border bg-error-subtle px-4 py-3 text-sm leading-6 text-error-text" role="alert">
                      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {formspreeConfigured
                        ? "We could not send your message. Please try again or use WhatsApp."
                        : "Online messages are unavailable right now. Please use WhatsApp."}
                    </div>
                  ) : null}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name <span className="text-error" aria-hidden="true">*</span></Label>
                      <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email <span className="text-error" aria-hidden="true">*</span></Label>
                      <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="company">Organisation <span className="text-muted-foreground">(optional)</span></Label>
                    <Input id="company" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Organisation name" />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="description">What would you like to improve? <span className="text-error" aria-hidden="true">*</span></Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Briefly describe the problem or project."
                      required
                      className="min-h-32"
                    />
                  </div>

                  {initialProduct ? (
                    <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">About: {initialProduct}{initialPlan ? ` · ${initialPlan}` : ""}</p>
                  ) : null}

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" size="lg" disabled={!isValid || status === "submitting" || !formspreeConfigured}>
                      <Send className="size-4" />
                      {status === "submitting" ? "Sending…" : "Send message"}
                    </Button>
                    <p id="contact-note" className="text-sm leading-6 text-muted-foreground">
                      Prefer WhatsApp? <a className="mb-link" href="https://wa.me/263783469023" target="_blank" rel="noopener noreferrer">Start a chat</a>.
                    </p>
                  </div>
                </form>
              </AnimatedSection>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Clients;
