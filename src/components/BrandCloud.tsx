import Link from 'next/link'

import { type Collab } from '@/app/projects/collabs'
import { Halo } from '@/components/Halo'
import { SlackLockup } from '@/components/SlackLockup'
import { cn } from '@/lib/utils'

function cellBorders(index: number, count: number) {
  const lastRow2 = count - (count % 2 || 2)
  const lastRow3 = count - (count % 3 || 3)

  return cn(
    'border-border',
    (index + 1) % 2 !== 0 && 'max-sm:border-r',
    index < lastRow2 && 'max-sm:border-b',
    (index + 1) % 3 !== 0 && 'sm:border-r',
    index < lastRow3 && 'sm:border-b',
  )
}

export function BrandCloud({ brands }: { brands: Array<Collab> }) {
  return (
    <ul role="list" className="grid grid-cols-2 sm:grid-cols-3">
      {brands.map((brand, index) => (
        <li key={brand.name} className={cellBorders(index, brands.length)}>
          <Link
            href={brand.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${brand.name} — see related work`}
            className="group relative flex aspect-[5/3] items-center justify-center"
          >
            <Halo className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" />
            {brand.name === 'Slack' ? (
              <SlackLockup className="relative z-10 h-8 w-[82%] opacity-80 transition group-hover:opacity-100" />
            ) : (
              <span
                aria-hidden
                className={cn(
                  'relative z-10 bg-foreground opacity-70 transition group-hover:opacity-100',
                  brand.mark === 'wordmark' ? 'h-7 w-[68%]' : 'size-8',
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
