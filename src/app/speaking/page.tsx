import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'I’ve spoken at events all around the world and been interviewed for many podcasts.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I’ve spoken at events all around the world and been interviewed for many podcasts."
      intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
    >
      <div className="space-y-20">
        <SpeakingSection title="Conferences">
          <Appearance
            href="#"
            title="In space, no one can watch you stream — until now"
            description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
            event="SysConf 2021"
            cta="Watch video"
          />
          <Appearance
            href="#"
            title="Lessons learned from our first product recall"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            event="Business of Startups 2020"
            cta="Watch video"
          />
        </SpeakingSection>
        <SpeakingSection title="Podcasts">
          <Appearance
            href="#"
            title="Using design as a competitive advantage"
            description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
            event="Encoding Design, July 2022"
            cta="Listen to podcast"
          />
          <Appearance
            href="#"
            title="Bootstrapping an aerospace company to $17M ARR"
            description="The story of how we built one of the most promising space startups in the world without taking any capital from investors."
            event="The Escape Velocity Show, March 2022"
            cta="Listen to podcast"
          />
          <Appearance
            href="#"
            title="Programming your company operating system"
            description="On the importance of creating systems and processes for running your business so that everyone on the team knows how to make the right decision no matter the situation."
            event="How They Work Radio, September 2021"
            cta="Listen to podcast"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
