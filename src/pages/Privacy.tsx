import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";

const Privacy = () => {
  usePageMeta({
    title: "Privacy Policy | MathBrooks",
    description:
      "How MathBrooks handles inquiry data submitted through service forms, email, WhatsApp, and other direct contact channels.",
    canonicalPath: "/privacy",
  });

  return (
    <SiteLayout>
      <section className="px-6 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-wide mb-8">
            Privacy Policy
          </h1>
          <p className="text-sm font-light text-muted-foreground mb-12">
            Last updated: April 6, 2026
          </p>

          <div className="space-y-10 text-sm font-light text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
                Information We Collect
              </h2>
              <p>
                When you submit an inquiry through our service inquiry forms, client intake form, email us, contact us on WhatsApp, or call us directly, we may collect the information you provide such as your name, email address, company name, service interest, and project description. We use this information only to respond to your inquiry, assess fit, and discuss potential work.
              </p>
            </section>

            <section>
              <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To respond to your inquiries and provide requested services</li>
                <li>To evaluate project fit and recommend next steps</li>
                <li>To communicate about projects, proposals, and deliverables</li>
                <li>To improve our website, positioning, and services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
                Third-Party Services
              </h2>
              <p className="mb-4">We use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-foreground">Formspree</strong> — Processes inquiry form submissions. Data is handled according to {" "}
                  <a
                    href="https://formspree.io/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Formspree&apos;s Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-foreground">Vercel Analytics</strong> — Collects anonymous, aggregated usage data. No personal advertising data is collected by MathBrooks through this site.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
                Cookies
              </h2>
              <p>
                This website does not use cookies for tracking or advertising. Vercel Analytics operates without marketing cookies and collects only anonymous, aggregated data.
              </p>
            </section>

            <section>
              <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
                Data Retention
              </h2>
              <p>
                Inquiry data is retained only as long as reasonably necessary to respond to your request, assess fit, and support legitimate business follow-up. You may request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="font-display text-base tracking-wider uppercase text-foreground mb-4">
                Contact
              </h2>
              <p>
                If you have questions about this privacy policy or your data, contact us at {" "}
                <a href="mailto:cto@mathbrooks.com" className="text-primary hover:underline">
                  cto@mathbrooks.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Privacy;
