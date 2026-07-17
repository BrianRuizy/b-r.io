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

export const metadata = {
  title: 'Uses',
  description: 'Some of my favorite tools and gear',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="What I use to build, create, and get through the day."
      intro="A look at the desk, everyday carry, camera gear, and apps I actually own and enjoy. Affiliate links included where available."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="Ergonofis Sway standing desk">
            Paired with the Ergonofis desk shelf — a comfortable foundation for
            long coding sessions that still feels clean and minimal.
          </Tool>
          <Tool title="Apple Studio Display">
            My main display for development, design, and editing, with a BenQ
            ScreenBar Halo for reducing eye strain.
          </Tool>
          <Tool title="Mode Designs Envoy keyboard">
            Probably my end-game keyboard, alongside a Logitech MX Master 3S
            and Apple Magic Trackpad for gestures.
          </Tool>
          <Tool title="Herman Miller Aeron">
            Bought secondhand — still one of the most important parts of the
            workspace.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Everyday carry">
          <Tool title="16-inch M1 Pro MacBook Pro">
            Holding strong as the portable center of engineering and creative
            work, carried in an Urth backpack.
          </Tool>
          <Tool title="AirPods Max and AirPods Pro">
            The pair I switch between for focused desk work, commuting, and
            travel — plus an AirTag and Orbitkey key organizer.
          </Tool>
          <Tool title="Samsung T7 Shield SSD">
            Portable storage for editing projects and recording ProRes footage.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Video and photography">
          <Tool title="Sony FX3">
            My dream camera. It can feel like overkill, but using it you
            understand why it’s so loved — paired with the Sony 24–70mm f/2.8 GM
            II.
          </Tool>
          <Tool title="Sennheiser MKE 600 and DJI Mic">
            Don’t underestimate a good mic. The Sennheiser handles controlled
            setups; the DJI Mic is ideal on the go.
          </Tool>
          <Tool title="Sony a7C II and 40mm f/2.5 G">
            A compact combination for street photography around New York City.
          </Tool>
          <Tool title="Final Cut Pro">
            The editing tool behind my YouTube videos, with Epidemic Sound for
            music.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Apps">
          <Tool title="Cursor">
            My primary IDE for software development and AI-assisted coding.
          </Tool>
          <Tool title="Linear and Notion">
            Linear for project management; Notion for planning, notes, and
            systems.
          </Tool>
          <Tool title="Raycast and Superhuman">
            Raycast as my launcher layer on macOS; Superhuman for email.
          </Tool>
          <Tool title="Figma">
            Where I explore interfaces and turn ideas into visual direction.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Home">
          <Tool title="Cowboy Classic v4">
            My e-bike — for some reason, the thing people ask about most.
          </Tool>
          <Tool title="LG C4 OLED and Sonos Beam">
            Living-room essentials, with an Apple TV 4K and Philips Hue lights.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
