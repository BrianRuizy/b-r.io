export default function Loading() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div
        className="flex animate-in items-center justify-between gap-8"
        style={{ "--index": 1 } as React.CSSProperties}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-secondary">Let&apos;s talk about it.</p>
        </div>
        <span className="aspect-square h-14 w-14 animate-pulse rounded-full bg-secondary" />
      </div>
      <div className="-mx-6 flex gap-2 overflow-x-scroll px-6 py-3">
        <span className="h-6 w-12 animate-pulse rounded bg-secondary" />
        <span className="h-6 w-20 animate-pulse rounded bg-secondary" />
        <span className="h-6 w-20 animate-pulse rounded bg-secondary" />
        <span className="h-6 w-12 animate-pulse rounded bg-secondary" />
        <span className="h-6 w-20 animate-pulse rounded bg-secondary" />
      </div>

      <div className="flex flex-col ">
        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
          <div className="flex gap-4 p-4" key={index}>
            <span className="aspect-square h-12 w-12 animate-pulse rounded-full bg-secondary" />
            <div className="flex w-full flex-col gap-2">
              <span className="h-6 w-40 animate-pulse rounded bg-secondary" />
              <span className="h-12 w-60 animate-pulse rounded bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
