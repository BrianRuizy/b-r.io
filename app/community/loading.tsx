export default function Loading() {
  return (
    <div className="flex flex-col divide-y divide-secondary">
      {[1, 2, 3, 4].map((_, index) => (
        <div className="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-6" key={index}>
          <span className="aspect-square h-10 w-10 animate-pulse rounded-full bg-secondary" />
          <div className="flex w-full flex-col gap-2">
            <span className="h-6 w-40 animate-pulse rounded bg-secondary" />
            <span className="h-12 w-60 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}
