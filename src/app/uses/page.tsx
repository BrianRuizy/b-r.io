import { type Metadata } from 'next'

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
      <ContentCardTitle as="h3" href={href}>
        {title}
      </ContentCardTitle>
      <ContentCardDescription>{children}</ContentCardDescription>
    </ContentCard>
  )
}

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Some of my favorite tools and gear',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="What I use to build, create, and get through the day."
      intro="A shorter look at the desk, everyday carry, camera gear, and apps I actually use. Affiliate links included where available."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="Ergonofis Sway standing desk" href="https://shrsl.com/49346">
            Paired with the Ergonofis desk shelf — a comfortable foundation for
            long coding sessions that still feels clean and minimal.
          </Tool>
          <Tool title="Apple Studio Display" href="https://amzn.to/3TTDg7d">
            My main display for development, design, and editing, with a BenQ
            ScreenBar Halo for reducing eye strain.
          </Tool>
          <Tool
            title="Mode Designs Envoy keyboard"
            href="https://modedesigns.com/pages/envoy"
          >
            Probably my end-game keyboard, alongside a Logitech MX Master 3S
            and Apple Magic Trackpad for gestures.
          </Tool>
          <Tool title="Herman Miller Aeron">
            Bought secondhand — still one of the most important parts of the
            workspace.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Everyday carry">
          <Tool
            title="16-inch M1 Pro MacBook Pro"
            href="https://amzn.to/41fkhEH"
          >
            Holding strong as the portable center of engineering and creative
            work.
          </Tool>
          <Tool title="AirPods Max" href="https://amzn.to/3mie64b">
            For focused desk work, commuting, and travel — with AirPods Pro as
            the lighter everyday pair.
          </Tool>
          <Tool title="Samsung T7 Shield SSD" href="https://amzn.to/3vwoD03">
            Portable storage for editing projects and recording ProRes footage.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Video and photography">
          <Tool title="Sony FX3" href="https://amzn.to/3TR2lzz">
            My dream camera. It can feel like overkill, but using it you
            understand why it’s so loved — paired with the Sony 24–70mm f/2.8
            GM II.
          </Tool>
          <Tool title="Sennheiser MKE 600" href="https://amzn.to/3ZlA32w">
            Don’t underestimate a good mic. The DJI Mic covers on-the-go
            recording.
          </Tool>
          <Tool title="Sony a7C II" href="https://amzn.to/3TQbJmO">
            Compact full-frame body with a 40mm f/2.5 G for street photography
            around New York City.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Apps">
          <Tool title="Cursor" href="https://www.cursor.com/">
            My primary IDE for software development and AI-assisted coding.
          </Tool>
          <Tool title="Linear" href="https://linear.app/">
            Project management day to day.
          </Tool>
          <Tool title="Notion" href="https://www.notion.so/">
            Planning, notes, and systems.
          </Tool>
          <Tool title="Raycast" href="https://raycast.com/?via=brianruiz">
            Launcher layer for almost everything on macOS.
          </Tool>
          <Tool
            title="Superhuman"
            href="https://superhuman.com/refer/bspuaqpo"
          >
            Default for email.
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
            My e-bike — for some reason, the thing people ask about most.
          </Tool>
          <Tool title="LG C4 OLED" href="https://amzn.to/3ZRVet8">
            Living-room essentials with a Sonos Beam and Apple TV 4K.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
