import { Metadata } from "next";
import { allPosts } from ".contentlayer/generated";
import PostList from "./components/PostList";

// import Input from "./components/Input";
// import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const metadata: Metadata = {
  title: "Blog | Brian Ruiz",
  description:
    "I write about programming, design, and occasionally life updates!",
};

export default function Blog() {
  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight">Blog</h1>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            {posts.length} posts about code, design, more ...
          </p>
        </div>
        {/* <div
          className="animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Input
            id="search"
            type="search"
            placeholder="Search…"
            value={""}
            // onChange={(e) => setSearch(e.target.value)}
            pfix={<MagnifyingGlassIcon className="w-5 h-5 text-secondary" />}
          />
        </div> */}
      </div>
      <div
        className="animate-in"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <PostList posts={posts} />
      </div>
    </div>
  );
}
