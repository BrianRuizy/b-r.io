import Link from 'next/link'

import { type Collab } from '@/app/projects/collabs'
import { Halo } from '@/components/Halo'
import { cn } from '@/lib/utils'

export function BrandCloud({ brands }: { brands: Array<Collab> }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
    >
      {brands.map((brand) => (
        <li key={brand.name}>
          <Link
            href={brand.href}
            target={brand.external ? '_blank' : undefined}
            rel={brand.external ? 'noopener noreferrer' : undefined}
            aria-label={`${brand.name} — see related work`}
            className="group relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl bg-card ring-1 ring-border transition dark:bg-muted dark:ring-0 dark:hover:ring-1 dark:hover:ring-foreground/20"
          >
            <Halo className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" />
            {brand.mark === 'wordmark' || !brand.logo ? (
              <span className="relative z-10 px-3 text-center text-sm font-semibold tracking-tight text-foreground opacity-70 transition group-hover:opacity-100">
                {brand.name}
              </span>
            ) : (
              <span
                aria-hidden
                className={cn(
                  'relative z-10 bg-foreground opacity-70 transition group-hover:opacity-100',
                  brand.name === 'IBM' || brand.name === 'Logitech'
                    ? 'h-6 w-[62%]'
                    : 'size-8',
                )}
                style={{
                  maskImage: `url(${brand.logo.src})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${brand.logo.src})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
