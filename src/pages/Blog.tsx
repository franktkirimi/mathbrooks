import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { blogPosts } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const Blog = () => {
  usePageMeta({
    title: "Resources | MathBrooks",
    description:
      "Practical MathBrooks resources on payroll, CRM, workflow automation, and AI for African businesses.",
    canonicalPath: "/blog",
    keywords: [
      "Zimbabwe business software blog",
      "CRM advice Africa",
      "payroll software Zimbabwe",
      "workflow automation resources",
      "applied AI business articles",
    ],
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "MathBrooks Resources",
      description:
        "Practical articles on payroll, CRM, operations, automation, and applied AI for African businesses.",
      url: "https://www.mathbrooks.com/blog",
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resources"
        title="Practical guides for businesses improving operations, not collecting buzzwords"
        description="MathBrooks resources focus on workflows teams actually run: payroll, CRM discipline, admin automation, and AI that earns its place in day-to-day operations."
        actions={(
          <Link to="/book-demo">
            <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
              Request a Topic
            </Button>
          </Link>
        )}
        sideContent={(
          <div className="space-y-3">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              Editorial Focus
            </p>
            {[
              "Software for real business workflows",
              "Zimbabwean payroll and compliance realities",
              "Operational automation and governed AI",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        )}
      />

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.slug} delay={index * 120}>
              <article className="card-glass rounded-2xl p-6 md:p-8 h-full">
                <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                  {post.category}
                </p>
                <h2 className="font-display text-xl uppercase tracking-wide leading-tight mb-4">
                  {post.title}
                </h2>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-xs font-light uppercase tracking-[0.12em] text-primary/80">
                    {post.readTime}
                  </span>
                  <span className="text-xs font-light text-muted-foreground">
                    {post.publishedOn}
                  </span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
                >
                  Read article
                </Link>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Blog;
