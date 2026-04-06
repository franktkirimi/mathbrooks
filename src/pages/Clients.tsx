import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle,
  MessageCircle,
  Send,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePageMeta } from "@/hooks/usePageMeta";
import { products } from "@/content/siteContent";
import { getFormspreeId, hasFormspreeConfig } from "@/lib/forms";

type FormStatus = "idle" | "submitting" | "success" | "error";

const projectTypes = [
  "Custom Software / Internal Tool",
  "Workflow Automation",
  "Applied AI / Copilot",
  "Business Platform Deployment",
  "Data Dashboard / Analytics",
  "API Integration",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP (within 4 weeks)",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Flexible",
];

const Clients = () => {
  const location = useLocation();
  const isBookDemo = location.pathname === "/book-demo" || location.pathname === "/contact";
  const isStartTrial = location.pathname === "/start-trial";
  const canonicalPath = isStartTrial
    ? "/start-trial"
    : isBookDemo
      ? "/book-demo"
      : "/clients";
  const pageLabel = isStartTrial ? "Start Guided Trial" : isBookDemo ? "Book Demo" : "Client Intake";
  const pageTitle = isStartTrial
    ? "Request guided trial access for a MathBrooks product"
    : isBookDemo
    ? "Share the workflow and we will recommend the right next step"
    : "Tell us about your project";
  const pageDescription = isStartTrial
    ? "Use this form to request guided trial access for CRM or HR & Payroll. MathBrooks will confirm fit, onboarding details, and the fastest path to trial."
    : isBookDemo
    ? "This is not a generic sales form. Share the workflow, business problem, and timeline. MathBrooks replies within 1 business day with the most sensible next step."
    : "Fill in as much as you know. We use this to prepare before we talk so the first conversation is about solutions, not background.";
  const searchParams = new URLSearchParams(location.search);
  const selectedProductEntry = products.find((entry) => entry.slug === searchParams.get("product"));
  const initialProduct = selectedProductEntry?.shortName ?? "";
  const initialPlan = searchParams.get("plan") ?? "";
  const initialProjectType = selectedProductEntry ? "Business Platform Deployment" : "";
  const initialDescription = isStartTrial
    ? initialProduct
      ? `We want guided trial access for ${initialProduct}${initialPlan ? ` on the ${initialPlan} plan` : ""}.`
      : ""
    : initialProduct
      ? `We want to discuss ${initialProduct}${initialPlan ? ` on the ${initialPlan} plan` : ""}.`
      : "";

  usePageMeta({
    title: isStartTrial
      ? "Start Guided Trial | MathBrooks"
      : isBookDemo
        ? "Book Demo | MathBrooks"
        : "Client Intake | MathBrooks",
    description: pageDescription,
    canonicalPath,
    keywords: isStartTrial
      ? ["free trial CRM", "free trial HR payroll", "business software trial Africa"]
      : ["book software demo", "client intake software project", "MathBrooks contact"],
  });

  const formspreeConfigured = hasFormspreeConfig();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [projectType, setProjectType] = useState(initialProjectType);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    setSelectedProduct(initialProduct);
    setSelectedPlan(initialPlan);
    setProjectType(initialProjectType);
    setDescription(initialDescription);
  }, [initialDescription, initialPlan, initialProduct, initialProjectType]);

  const isValid = name.trim().length > 0 && email.trim().length > 0 && description.trim().length > 0;

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setSelectedProduct(initialProduct);
    setSelectedPlan(initialPlan);
    setProjectType(initialProjectType);
    setBudget("");
    setTimeline("");
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
          _subject: isStartTrial
            ? "New Trial Request — MathBrooks"
            : isBookDemo
              ? "New Demo Request — MathBrooks"
              : "New Client Intake — MathBrooks",
          name,
          email,
          company,
          phone,
          product_interest: selectedProduct,
          plan_interest: selectedPlan,
          project_type: projectType,
          budget,
          timeline,
          description,
        }),
      });

      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi MathBrooks, I'd like to discuss a project.\n\nName: ${name}\nCompany: ${company}\nProduct: ${selectedProduct}\nPlan: ${selectedPlan}\nProject: ${projectType}\n\n${description}`
    );
    window.open(`https://wa.me/263783469023?text=${text}`, "_blank");
  };

  const successTitle = isStartTrial ? "Guided Trial Request Received" : isBookDemo ? "Request Received" : "Received";
  const successMessage = isStartTrial
    ? "Thanks. We will review your request and get back to you within 1 business day with trial-fit details, onboarding steps, and the fastest route to access."
    : isBookDemo
    ? "Thanks. We will review your details and get back to you within 1 business day with the best next step: demo, scoping call, or follow-up questions."
    : "Thanks for reaching out. We will review your details and get back to you within 1 business day with next steps.";

  return (
    <SiteLayout>
      {status === "success" ? (
        <section className="px-6 pt-32 md:pt-40 pb-20 md:pb-28">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-10 md:p-14 max-w-md mx-auto text-center space-y-6">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
              <div className="space-y-2">
                <h1 className="font-display text-base tracking-wider uppercase">
                  {successTitle}
                </h1>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {successMessage}
                </p>
              </div>
              <Button
                onClick={resetForm}
                variant="outline"
                className="font-display text-xs tracking-[0.1em] uppercase border-border/40"
              >
                Submit another
              </Button>
            </div>
          </AnimatedSection>
        </section>
      ) : (
        <>
          <PageHero
            eyebrow={pageLabel}
            title={pageTitle}
            description={pageDescription}
            sideContent={(
              <div className="space-y-3">
                <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
                  What Happens Next
                </p>
                {[
                  "We review your workflow, delivery risk, and whether a product or custom route fits best.",
                  "You get a fast response within 1 business day.",
                  "If the best next step is not software, we say so early.",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            )}
          />

          <section className="px-6 pb-20 md:pb-28">
            <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
              <AnimatedSection>
                <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
                  <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                    Best for
                  </p>
                  <div className="space-y-4 text-sm font-light text-muted-foreground leading-relaxed">
                    <p>
                      Teams evaluating a new platform, replacing manual workflows, or deciding whether the next step should be a product deployment, custom software, or AI-enabled process improvement.
                    </p>
                    <div className="grid gap-3">
                        {[
                          isStartTrial
                          ? "Guided product trials for CRM and HR & Payroll"
                          : "Product demos for CRM, HR & Payroll, Accounting, Inventory, Projects, Automation, Analytics, and AI Assistant",
                        "Scoping calls for custom software, automation, and AI",
                        "Practical advice on what to build first",
                      ].map((item) => (
                        <div key={item} className="rounded-xl border border-border/20 bg-background/40 px-4 py-3">
                          {item}
                        </div>
                      ))}
                    </div>
                    {!formspreeConfigured ? (
                      <p className="text-xs font-light text-amber-300/90 leading-relaxed">
                        Online submission is temporarily unavailable. Use WhatsApp for the fastest response.
                      </p>
                    ) : null}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={80}>
                <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-6 md:p-8 space-y-6">
                  {status === "error" ? (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-md px-3 py-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {formspreeConfigured
                        ? "Something went wrong. Please try again or use WhatsApp."
                        : "Online submission is temporarily unavailable. Please use WhatsApp."}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                        Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Your name"
                        required
                        className="bg-background/50 border-border/40 focus:border-primary/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                        Email <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@company.com"
                        required
                        className="bg-background/50 border-border/40 focus:border-primary/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                        Company
                      </Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        placeholder="Company name"
                        className="bg-background/50 border-border/40 focus:border-primary/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="+1 555 000 0000"
                        className="bg-background/50 border-border/40 focus:border-primary/40"
                      />
                    </div>
                  </div>

                  {selectedProduct ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="selected-product" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                          Product
                        </Label>
                        <Input
                          id="selected-product"
                          value={selectedProduct}
                          readOnly
                          className="bg-background/30 border-border/30 text-muted-foreground"
                        />
                      </div>
                      {selectedPlan ? (
                        <div className="space-y-2">
                          <Label htmlFor="selected-plan" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                            Plan
                          </Label>
                          <Input
                            id="selected-plan"
                            value={selectedPlan}
                            readOnly
                            className="bg-background/30 border-border/30 text-muted-foreground"
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="project-type" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                      Project Type
                    </Label>
                    <select
                      id="project-type"
                      value={projectType}
                      onChange={(event) => setProjectType(event.target.value)}
                      className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm font-light text-foreground focus:outline-none focus:border-primary/40 focus:ring-0 transition-colors"
                    >
                      <option value="">Select a type...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                        Budget Range
                      </Label>
                      <select
                        id="budget"
                        value={budget}
                        onChange={(event) => setBudget(event.target.value)}
                        className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm font-light text-foreground focus:outline-none focus:border-primary/40 focus:ring-0 transition-colors"
                      >
                        <option value="">Select a range...</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                        Timeline
                      </Label>
                      <select
                        id="timeline"
                        value={timeline}
                        onChange={(event) => setTimeline(event.target.value)}
                        className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm font-light text-foreground focus:outline-none focus:border-primary/40 focus:ring-0 transition-colors"
                      >
                        <option value="">Select a timeline...</option>
                        {timelines.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                      Project Description <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Describe the business problem, the current workflow, and what success looks like..."
                      required
                      className="bg-background/50 border-border/40 focus:border-primary/40 min-h-[130px]"
                    />
                  </div>

                  <p className="text-xs font-light text-muted-foreground leading-relaxed">
                    Fields marked <span className="text-red-400">*</span> are required. Everything else helps us prepare.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Button
                      type="submit"
                      disabled={!isValid || status === "submitting" || !formspreeConfigured}
                      className="flex-1 font-display text-xs tracking-[0.1em] uppercase"
                    >
                      <Send className="w-3.5 h-3.5 mr-2" />
                      {status === "submitting" ? "Sending..." : "Submit"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleWhatsApp}
                      className="flex-1 font-display text-xs tracking-[0.1em] uppercase border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5 text-green-400 hover:text-green-300"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-2" />
                      WhatsApp Instead
                    </Button>
                  </div>
                </form>
              </AnimatedSection>
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
};

export default Clients;
