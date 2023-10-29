import Halo from "@/components/ui/Halo";

export default function Subscribe() {
  return (
    <Halo>
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-tertiary p-8 text-center">
        <p className="font-medium text-primary">Subscribe to my newsletter</p>
        <p className="max-w-lg text-secondary">
          The Modern Blueprint —monthly readings on topics covering covering
          technology, design, productivity, self-improvement, software
          engineering, and more.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="rounded-md bg-primary px-4 py-1 placeholder:text-secondary dark:bg-secondaryA"
          />
          <button className="rounded-md bg-neutral-800 px-4 py-1 text-white hover:bg-neutral-900 dark:bg-neutral-200 dark:text-black hover:dark:bg-neutral-100">
            subscribe
          </button>
        </div>
        <p className="text-sm text-tertiary">join the 0 other readers.</p>
      </div>
    </Halo>
  );
}
