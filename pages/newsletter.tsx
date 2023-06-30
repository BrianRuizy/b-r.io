import NewsletterInput from "components/NewsletterInput";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function NewsletterPage() {
  const { query } = useRouter();
  const seoTitle = "Newsletter | Brian Ruiz";
  const seoDesc =
    "A newsletter in the realm between design & development. Learn animations, CSS, web development tips & tricks and creating delightful and useful interfaces!";

  return (
    <div className="min-h-screen">
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          url: `https://b-r.io/newsletter/`,
          description: seoDesc,
          site_name: "Brian Ruiz",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      {query.confirmed ? (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl animate-in">
            Thanks for confirming your email!
          </h3>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            You&apos;re on the list and will get updates when new content is
            published.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl animate-in">Subscribe</h3>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            Get notified when I write new posts. Learn animation techniques,
            CSS, design systems and more
          </p>
          <div
            className="animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <NewsletterInput />
          </div>
        </div>
      )}
    </div>
  );
}
