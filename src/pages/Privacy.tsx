import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-wide mb-8">
          Privacy Policy
        </h1>
        <p className="text-sm font-light text-muted-foreground mb-12">
          Last updated: February 2026
        </p>

        <div className="space-y-10 text-sm font-light text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
              Information We Collect
            </h2>
            <p>
              When you submit an inquiry through our contact form, we collect the
              information you provide: your name, email address, company name, and
              project description. We use this information solely to respond to
              your inquiry and discuss potential projects.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To respond to your inquiries and provide requested services</li>
              <li>To communicate about projects and deliverables</li>
              <li>To improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
              Third-Party Services
            </h2>
            <p className="mb-4">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-foreground">Formspree</strong> — Processes
                form submissions. Data is handled according to{" "}
                <a
                  href="https://formspree.io/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Formspree's Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Vercel Analytics</strong> —
                Collects anonymous, aggregated usage data (page views, visitor
                counts). No personal data or cookies are used.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
              Cookies
            </h2>
            <p>
              This website does not use cookies for tracking or advertising. Vercel
              Analytics operates without cookies and collects only anonymous,
              aggregated data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
              Data Retention
            </h2>
            <p>
              Form submission data is retained only as long as necessary to respond
              to your inquiry and for reasonable business purposes. You may request
              deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy or your data, contact
              us at{" "}
              <a
                href="mailto:cto@mathbrooks.com"
                className="text-primary hover:underline"
              >
                cto@mathbrooks.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
