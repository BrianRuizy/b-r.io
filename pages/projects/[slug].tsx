import { useMDXComponent } from "next-contentlayer/hooks";
import { allProjects, Project as ProjectType } from ".contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import MDXComponents from "components/MDXComponents";
import Link from "components/Link";
import { ReactElement } from "react";

type ProjectProps = {
  project: ProjectType;
  rest: ProjectType[];
};

export default function Project({ project, rest }: ProjectProps) {
  const seoTitle = `${project.title} Case Study | Samuel Kraft`;
  const seoDesc = `${project.description}`;
  const url = `https://samuelkraft.com/project/${project.slug}`;
  const Component = useMDXComponent(project.body.code);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        canonical={url}
        openGraph={{
          title: seoTitle,
          url,
          description: seoDesc,
          images: [
            {
              url: `https://og-image.samuelkraft.vercel.app/${encodeURIComponent(
                project.title
              )}?desc=${encodeURIComponent("Case study")}&theme=dark.png`,
              alt: project.title,
            },
          ],
        }}
      />

      <div className="flex flex-col gap-20">
        <article>
          <div className="h-20" />
          <div className="flex flex-col gap-3 animate-in px-4 md:px-6 py-2 max-w-[700px] mx-auto">
            <div className="flex gap-3 text-secondary">
              <p>{project.time}</p>
              {project.url && (
                <>
                  <span>&middot;</span>
                  <Link href={project.url} className="hover:text-primary">
                    Visit Live ↗
                  </Link>
                </>
              )}
            </div>
            <h1 className="text-primary text-3xl font-bold tracking-tight leading-tight">
              {project.title}
            </h1>
            <p
              className="text-xl text-secondary animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              {project.description}
            </p>
          </div>

          <div className="h-12" />
          <div className="prose px-4 md:px-6 py-2 max-w-[1100px] mx-auto">
            <Component components={MDXComponents} />
          </div>
        </article>
        <div className="px-4 md:px-6 py-2 w-full max-w-[700px] mx-auto flex flex-col space-y-12">
          <hr className="border-primary" />
          <p className="text-primary max-w-lg">
            Need more project details? Or are you interested in working
            together? Reach out directly to me{" "}
            <a href="mailto:contact@b-r.io" className="text-primary underline">
              here
            </a>
            . I&apos;d be more than happy to connect!
          </p>

          <Link href="/" className="hover:underline text-secondary">
            ← Back home
          </Link>
        </div>

        <div />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = allProjects.find((p) => p.slug === params?.slug);
  const rest = allProjects
    /* remove current post */
    .filter((p) => p.slug !== params?.slug);

  return {
    props: {
      project,
      rest,
    },
  };
};

Project.getLayout = function getLayout(page: ReactElement) {
  return page;
};
