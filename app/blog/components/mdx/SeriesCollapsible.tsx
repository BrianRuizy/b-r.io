"use client";
import Link from "@/app/components/Link";
import * as Collapsible from "@radix-ui/react-collapsible";

const SeriesCollapsible = () => {
  return (
    <Collapsible.Root className="my-4 flex flex-col divide-y divide-secondary overflow-clip rounded-md border border-secondary">
      <Collapsible.Trigger className="group flex items-center justify-between gap-3 bg-primary p-4">
        <p className="m-0 text-left font-medium leading-tight text-primary">
          Building an Awesome Developer Blog with Next.js
          <span className="pl-2 font-normal text-tertiary">∙ 3 of 5</span>
        </p>
        <div className="h-fit rounded p-1 transition-all group-hover:bg-secondary">
          {/* prettier-ignore */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="bg-primary px-4">
        <p className="text-balance text-sm leading-normal text-tertiary">
          This is a multi-part series on building a blog with the latest
          features of Next.js. The focus is on creating a sleek, intuitive, and
          elegant user interface.
        </p>
        <ul className="animated-list -ml-2 list-outside list-disc space-y-2">
          <li className="transition-opacity">
            <Link
              href="/blog"
              className="font-normal text-tertiary line-through"
            >
              My Blog Tech Stack.
            </Link>
          </li>
          <li className="transition-opacity">
            <Link
              href="/blog"
              className="font-normal text-tertiary line-through"
            >
              ISR + MDX Blog Posts with Next.js
            </Link>
          </li>
          <li className="transition-opacity">
            <Link
              href="/blog"
              className="font-normal text-primary no-underline"
            >
              Beautiful Interactive Maps with MapBox GL
            </Link>
          </li>
          <li className="transition-opacity">
            <Link
              href="/blog"
              className="font-normal text-tertiary line-through"
            >
              Adding a Dark Mode Toggle to Your React App
            </Link>
          </li>
          <li className="transition-opacity">
            <Link
              href="/blog"
              className="font-normal text-tertiary line-through"
            >
              Blog Post Views with Server Actions
            </Link>
          </li>
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default SeriesCollapsible;
