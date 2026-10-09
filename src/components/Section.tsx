import { useId } from 'react'

export function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const id = useId()
  return (
    <section aria-labelledby={id} className="border-t border-border pt-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
        <h2 id={id} className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  )
}
