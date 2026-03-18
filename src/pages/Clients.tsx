import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getFormspreeId, hasFormspreeConfig } from "@/lib/forms";
import { usePageMeta } from "@/hooks/usePageMeta";
import AnimatedSection from "@/components/AnimatedSection";

type FormStatus = "idle" | "submitting" | "success" | "error";

const projectTypes = [
  "Custom Software / Internal Tool",
  "Workflow Automation",
  "Applied AI / Copilot",
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
  usePageMeta({
    title: "Client Intake | MathBrooks",
    description: "Tell us about your project. We use this form to understand your needs before scheduling a scoping call.",
    canonicalPath: "/clients",
  });

  const formspreeConfigured = hasFormspreeConfig();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const isValid = name.trim().length > 0 && email.trim().length > 0 && description.trim().length > 0;

  const resetForm = () => {
    setName(""); setEmail(""); setCompany(""); setPhone("");
    setProjectType(""); setBudget(""); setTimeline(""); setDescription("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !formspreeConfigured) { setStatus("error"); return; }

    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${getFormspreeId()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Client Intake — MathBrooks",
          name,
          email,
          company,
          phone,
          project_type: projectType,
          budget,
          timeline,
          description,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi MathBrooks, I'd like to discuss a project.\n\nName: ${name}\nCompany: ${company}\nProject: ${projectType}\n\n${description}`
    );
    window.open(`https://wa.me/263783469023?text=${text}`, "_blank");
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <AnimatedSection>
          <div className="card-glass rounded-lg p-10 md:p-14 max-w-md w-full text-center space-y-6">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
            <div className="space-y-2">
              <h2 className="font-display text-base tracking-wider uppercase">
                Received
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Thanks for reaching out. We'll review your details and get back to you
                within 1 business day with next steps.
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <AnimatedSection>
          <div className="mb-10">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Client Intake
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight mb-4">
              Tell Us About Your Project
            </h1>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-lg">
              Fill in as much as you know. We use this to prepare before we talk —
              so our first conversation is about solutions, not background.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <form onSubmit={handleSubmit} className="card-glass rounded-lg p-6 md:p-8 space-y-6">

            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-md px-3 py-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {formspreeConfigured
                  ? "Something went wrong. Please try again or use WhatsApp."
                  : "Online submission is temporarily unavailable. Please use WhatsApp."}
              </div>
            )}

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="bg-background/50 border-border/40 focus:border-primary/40"
                />
              </div>
            </div>

            {/* Company + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Company
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555 000 0000"
                  className="bg-background/50 border-border/40 focus:border-primary/40"
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <Label htmlFor="project-type" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                Project Type
              </Label>
              <select
                id="project-type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm font-light text-foreground focus:outline-none focus:border-primary/40 focus:ring-0 transition-colors"
              >
                <option value="">Select a type...</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Budget + Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Budget Range
                </Label>
                <select
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm font-light text-foreground focus:outline-none focus:border-primary/40 focus:ring-0 transition-colors"
                >
                  <option value="">Select a range...</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>{b}</option>
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
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full h-10 rounded-md border border-border/40 bg-background/50 px-3 text-sm font-light text-foreground focus:outline-none focus:border-primary/40 focus:ring-0 transition-colors"
                >
                  <option value="">Select a timeline...</option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                Project Description <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the problem you're solving, the current workflow, and what success looks like..."
                required
                className="bg-background/50 border-border/40 focus:border-primary/40 min-h-[130px]"
              />
            </div>

            <p className="text-xs font-light text-muted-foreground leading-relaxed">
              Fields marked <span className="text-red-400">*</span> are required. Everything else helps us prepare.
            </p>

            {!formspreeConfigured && (
              <p className="text-xs font-light text-amber-300/90 leading-relaxed">
                Online submission is temporarily unavailable. Use WhatsApp for the fastest response.
              </p>
            )}

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
    </div>
  );
};

export default Clients;
