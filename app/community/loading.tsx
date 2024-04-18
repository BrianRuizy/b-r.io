export default function Loading() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-secondary">Let&apos;s talk about it.</p>
        </div>
        <span className="aspect-square h-14 w-14 animate-pulse rounded-full bg-secondary" />
      </div>

      <div className="flex gap-3 overflow-x-scroll ">
        <span className="h-[34px] w-14 animate-pulse rounded-md bg-secondary" />
        <span className="h-[34px] w-20 animate-pulse rounded-md bg-secondary" />
        <span className="h-[34px] w-32 animate-pulse rounded-md bg-secondary" />
        <span className="h-[34px] w-16 animate-pulse rounded-md bg-secondary" />
        <span className="h-[34px] w-28 animate-pulse rounded-md bg-secondary" />
      </div>

      <div className="space-y-8">
        <div className="-mx-3 h-24  animate-pulse rounded-md bg-secondary" />

        <div className="flex flex-col divide-y divide-secondary">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div className="flex gap-3 py-4 first:pt-0 md:py-6" key={index}>
              <span className="aspect-square h-10 w-10 animate-pulse rounded-full bg-secondary" />
              <div className="flex w-full flex-col gap-2">
                <span className="h-6 w-40 animate-pulse rounded bg-secondary" />
                <span className="h-12 w-60 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
