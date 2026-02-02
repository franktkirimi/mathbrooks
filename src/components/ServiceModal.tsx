import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
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

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setDescription("");
  };

  const handleSubmitEmail = () => {
    const subject = encodeURIComponent(`Inquiry: ${serviceName}`);
    const body = encodeURIComponent(
      `Service: ${serviceName}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\n\nProject Description:\n${description}`
    );
    window.open(`mailto:cto@mathbrooks.com?subject=${subject}&body=${body}`);
    resetForm();
    onOpenChange(false);
  };

  const handleSendMessage = () => {
    const text = encodeURIComponent(
      `Hi MathBrooks, I'm interested in ${serviceName}.\n\nName: ${name}\nCompany: ${company}\n\n${description}`
    );
    window.open(`https://wa.me/263783469023?text=${text}`, "_blank");
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-glass border-border/40 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-base tracking-wider uppercase">
            {serviceName}
          </DialogTitle>
          <DialogDescription className="text-sm font-light text-muted-foreground leading-relaxed">
            {serviceDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="bg-background/50 border-border/40 focus:border-primary/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
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
            onClick={handleSubmitEmail}
            className="flex-1 font-display text-xs tracking-[0.1em] uppercase"
          >
            <Send className="w-3.5 h-3.5 mr-2" />
            Submit
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
