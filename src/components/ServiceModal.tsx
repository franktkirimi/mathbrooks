import { useState } from "react";
import { MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  serviceDescription: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "xyzformid";

const ServiceModal = ({
  open,
  onOpenChange,
  serviceName,
  serviceDescription,
}: ServiceModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setDescription("");
    setStatus("idle");
  };

  const handleClose = (open: boolean) => {
    if (!open) resetForm();
    onOpenChange(open);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) return;

    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          service: serviceName,
          description,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleSendMessage = () => {
    const text = encodeURIComponent(
      `Hi MathBrooks, I'm interested in ${serviceName}.\n\nName: ${name}\nCompany: ${company}\n\n${description}`
    );
    window.open(`https://wa.me/263783469023?text=${text}`, "_blank");
    resetForm();
    onOpenChange(false);
  };

  const isValid = name.trim().length > 0 && email.trim().length > 0;

  if (status === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="card-glass border-border/40 sm:max-w-md">
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <CheckCircle className="w-12 h-12 text-green-400" />
            <h3 className="font-display text-base tracking-wider uppercase">
              Thank You
            </h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
              Your inquiry has been submitted. We'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="font-display text-xs tracking-[0.1em] uppercase mt-4"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="card-glass border-border/40 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-base tracking-wider uppercase">
            {serviceName}
          </DialogTitle>
          <DialogDescription className="text-sm font-light text-muted-foreground leading-relaxed">
            {serviceDescription}
          </DialogDescription>
        </DialogHeader>

        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-md px-3 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Something went wrong. Please try again or use WhatsApp.
          </div>
        )}

        <div className="space-y-4 pt-2">
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

          <div className="space-y-2">
            <Label htmlFor="company" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
              Company
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company"
              className="bg-background/50 border-border/40 focus:border-primary/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
              Project Description
            </Label>
            <Textarea
              id="project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your project..."
              className="bg-background/50 border-border/40 focus:border-primary/40 min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || status === "submitting"}
            className="flex-1 font-display text-xs tracking-[0.1em] uppercase"
          >
            <Send className="w-3.5 h-3.5 mr-2" />
            {status === "submitting" ? "Sending..." : "Submit"}
          </Button>
          <Button
            variant="outline"
            onClick={handleSendMessage}
            className="flex-1 font-display text-xs tracking-[0.1em] uppercase border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5 text-green-400 hover:text-green-300"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-2" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
