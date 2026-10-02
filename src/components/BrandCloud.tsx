import Link from 'next/link'

import { type Collab } from '@/app/projects/collabs'
import { Halo } from '@/components/Halo'
import { SlackLockup } from '@/components/SlackLockup'
import { cn } from '@/lib/utils'

function cellBorders(index: number, count: number) {
  const lastRow = count - (count % 2 || 2)

  return cn(
    'border-border',
    index % 2 === 0 && 'border-r',
    index < lastRow && 'border-b',
  )
}

const logoClassName =
  'relative z-10 h-7 w-auto max-w-[84%] opacity-80 transition group-hover:opacity-100'

export function BrandCloud({ brands }: { brands: Array<Collab> }) {
  return (
    <ul role="list" className="grid grid-cols-2">
      {brands.map((brand, index) => (
        <li key={brand.name} className={cellBorders(index, brands.length)}>
          <Link
            href={brand.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${brand.name} — see related work`}
            className="group relative flex aspect-[2/1] items-center justify-center px-4"
          >
            <Halo className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" />
            {brand.lockup === 'slack' ? (
              <SlackLockup className={logoClassName} />
            ) : (
              <span
                aria-hidden
                className={cn(logoClassName, 'bg-foreground')}
                style={{
                  aspectRatio: brand.ratio,
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
