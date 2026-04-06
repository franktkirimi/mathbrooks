import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { blogPosts } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.slug === slug);

  usePageMeta({
    title: post ? `${post.title} | MathBrooks` : "Article | MathBrooks",
    description:
      post?.description ??
      "Practical MathBrooks resources on payroll, CRM, workflow automation, and applied AI.",
    canonicalPath: post ? `/blog/${post.slug}` : "/blog",
    keywords: post?.keywords,
    ogType: "article",
    structuredData: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedOn,
          dateModified: post.publishedOn,
          author: {
            "@type": "Organization",
            name: "MathBrooks",
          },
          publisher: {
            "@type": "Organization",
            name: "MathBrooks",
            logo: {
              "@type": "ImageObject",
              url: "https://www.mathbrooks.com/favicon.svg",
            },
          },
          mainEntityOfPage: `https://www.mathbrooks.com/blog/${post.slug}`,
        }
      : undefined,
  });

  if (!post) {
    return <NotFound />;
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.description}
        actions={(
          <>
            <Link to="/blog">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
              >
                Back to Resources
              </Button>
            </Link>
            <Link to="/book-demo">
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Discuss This Topic
              </Button>
            </Link>
          </>
        )}
        sideContent={(
          <div className="space-y-3">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              Article Details
            </p>
            <div className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground">
              Published: {post.publishedOn}
            </div>
            <div className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground">
              {post.readTime}
            </div>
            <div className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground">
              Focus: {post.category}
            </div>
          </div>
        )}
      />

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto space-y-10">
          {post.sections.map((section, index) => (
            <AnimatedSection key={section.heading} delay={index * 80}>
              <section className="card-glass rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-xl md:text-2xl uppercase tracking-wide mb-5">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm md:text-base font-light text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default BlogPost;
