import { MessageCircle } from "lucide-react";

const WhatsAppWidget = () => {
  return (
    <a
      href="https://wa.me/263783469023?text=Hi%20MathBrooks%2C%20I%27d%20like%20to%20discuss%20a%20product%20or%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MathBrooks on WhatsApp"
      className="fixed right-4 bottom-6 md:right-6 md:bottom-8 z-30 inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-3 md:px-4 text-white shadow-[0_18px_45px_rgba(34,197,94,0.35)] hover:bg-green-400 transition-colors duration-300"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline font-display text-[0.65rem] tracking-[0.15em] uppercase">
        WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppWidget;
