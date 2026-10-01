import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Sticker } from '@/components/Sticker'
import { toolGroups, type ToolItem } from '@/app/uses/tools'
import { createPageMetadata } from '@/lib/metadata'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-12 sm:space-y-14">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  description,
  image,
  imageDark,
  kind,
  rotate,
}: ToolItem) {
  return (
    <ContentCard as="li" className="flex-row items-start gap-4 sm:gap-5">
      <Sticker
        src={image}
        srcDark={imageDark}
        alt=""
        rotate={kind === 'app' ? 0 : rotate}
        size={kind === 'app' ? 'sm' : 'md'}
        variant={kind}
      />
      <div className="min-w-0 flex-1 pt-0.5">
        <ContentCardTitle as="h3" href={href} external={Boolean(href)}>
          <span className="inline-flex items-center gap-2">
            {title}
            {href ? (
              <ArrowUpRightIcon
                className="size-4 text-muted-foreground transition group-hover:text-accent"
                aria-hidden
              />
            ) : null}
          </span>
        </ContentCardTitle>
        <ContentCardDescription>{description}</ContentCardDescription>
      </div>
    </ContentCard>
  )
}

const heroTitle = 'What I use every day to build, create, and stay productive.'

export const metadata = createPageMetadata({
  title: 'Uses',
  description:
    'Gear and apps I use every day to build, create, and stay productive.',
  heroTitle,
})

export default function Uses() {
  return (
    <SimpleLayout
      title={heroTitle}
      intro="Gear and apps I actually own and enjoy using. Mostly tech. Links are affiliate where available, which means I may earn a commission if you buy something, at no extra cost to you."
    >
      <div className="space-y-20">
        {toolGroups.map((group) => (
          <ToolsSection key={group.title} title={group.title}>
            {group.tools.map((tool) => (
              <Tool key={tool.title} {...tool} />
            ))}
          </ToolsSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
