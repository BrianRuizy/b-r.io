import { type Metadata } from 'next'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <ContentCard as="li">
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
      <ContentCardDescription>{children}</ContentCardDescription>
    </ContentCard>
  )
}

export const metadata: Metadata = {
  title: 'Uses',
  description:
    'Gear and apps I use every day to build, create, and stay productive.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="What I use every day to build, create, and stay productive."
      intro="Gear and apps I actually own and enjoy using. Mostly tech. Links are affiliate where available, which means I may earn a commission if you buy something, at no extra cost to you."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool
            title="Ergonofis Sway standing desk"
            href="https://shrsl.com/49346"
          >
            Paired with the Ergonofis desk shelf. A clean, comfortable
            foundation for long coding sessions that still feels minimal.
          </Tool>
          <Tool title="Apple Studio Display" href="https://amzn.to/3TTDg7d">
            Main display for development, design, and editing. BenQ ScreenBar
            Halo sits on top for reducing eye strain.
          </Tool>
          <Tool
            title="Mode Designs Envoy keyboard"
            href="https://modedesigns.com/pages/envoy"
          >
            Probably my end-game keyboard. Logitech MX Master 3S and an Apple
            Magic Trackpad round out the desk.
          </Tool>
          <Tool title="Herman Miller Aeron">
            Bought secondhand. Still one of the most important parts of the
            workspace.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Everyday carry">
          <Tool title="Urth backpack" href="https://amzn.to/49d888x">
            Sleek and water resistant. Holds the daily tech essentials.
          </Tool>
          <Tool
            title="M1 Pro MacBook Pro 16-inch"
            href="https://amzn.to/41fkhEH"
          >
            Holding strong as the portable center of engineering and creative
            work.
          </Tool>
          <Tool title="AirPods Max" href="https://amzn.to/3mie64b">
            For focused desk work, commuting, and travel. AirPods Pro are the
            lighter everyday pair.
          </Tool>
          <Tool title="Samsung T7 Shield SSD" href="https://amzn.to/3vwoD03">
            Portable storage for editing projects and recording ProRes footage.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Camera gear">
          <Tool title="Sony FX3" href="https://amzn.to/3TR2lzz">
            My dream camera. It can feel like overkill, but using it you
            understand why it&apos;s so loved.
          </Tool>
          <Tool title="Sony 24–70mm f/2.8 GM II" href="https://amzn.to/3TABciO">
            The workhorse lens on the FX3 for most video work.
          </Tool>
          <Tool title="Sony a7C II" href="https://amzn.to/3TQbJmO">
            Compact full-frame body for street photography around New York City.
          </Tool>
          <Tool title="Sony 40mm f/2.5 G" href="https://amzn.to/3YTBdCz">
            Small, sharp, and easy to carry for everyday street shooting.
          </Tool>
          <Tool title="Sennheiser MKE 600" href="https://amzn.to/3ZlA32w">
            Don&apos;t underestimate a good mic. The DJI Mic covers on-the-go
            recording.
          </Tool>
          <Tool
            title="Peak Design carbon fiber tripod"
            href="https://amzn.to/43CoF31"
          >
            Light enough to actually bring along, sturdy enough for real work.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Apps">
          <Tool title="Cursor" href="https://www.cursor.com/">
            My primary IDE for software development and AI-assisted coding.
          </Tool>
          <Tool title="Notion" href="https://www.notion.so/">
            Planning, notes, and systems.
          </Tool>
          <Tool title="Figma" href="https://www.figma.com/">
            Where I explore interfaces and turn ideas into visual direction.
          </Tool>
          <Tool
            title="Final Cut Pro"
            href="https://www.apple.com/final-cut-pro/"
          >
            Where the YouTube videos come together.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Home">
          <Tool title="Cowboy Classic v4" href="https://cowboy.bike/">
            My e-bike. For some reason, the thing people ask about most.
          </Tool>
          <Tool title="LG C4 OLED" href="https://amzn.to/3ZRVet8">
            Living-room essentials with a Sonos Beam and Apple TV 4K.
          </Tool>
          <Tool title="Fellow Ode" href="https://fellow.com/products/ode">
            Coffee grinder at home, with a Fellow kettle alongside it.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
