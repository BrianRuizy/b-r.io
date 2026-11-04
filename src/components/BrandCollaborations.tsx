'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Halo } from '@/components/Halo'
import {
  ContentCard,
  ContentCardCta,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
// Original wordmark artwork; see public/logos/wordmarks/SOURCES.md.
const wordmarks: Record<
  string,
  { file: string; width: number; height: number }
> = {
  Notion: { file: 'notion-balanced', width: 97, height: 24 },
  IBM: { file: 'ibm', width: 57, height: 23 },
  Slack: { file: 'slack', width: 89, height: 24 },
  Logitech: { file: 'logitech', width: 86, height: 23 },
  'LG Electronics': { file: 'lg-electronics', width: 128, height: 27 },
  'Monday.com': { file: 'monday', width: 117, height: 24 },
  Superhuman: { file: 'superhuman', width: 127, height: 22 },
  Framer: { file: 'framer', width: 93, height: 24 },
  Raycast: { file: 'raycast', width: 103, height: 24 },
  Mobbin: { file: 'mobbin-balanced', width: 112, height: 22 },
  'Even Realities': { file: 'even', width: 130.55, height: 21.53 },
  Brilliant: { file: 'brilliant', width: 76, height: 18 },
}

type Collaboration = {
  brand: string
  domain: string
  videoId: string
  title: string
  excerpt?: string
}

const allCollaborations: Collaboration[] = [
  {
    brand: 'Superhuman',
    domain: 'superhuman.com',
    videoId: 'jT5C70zLQMM',
    title: 'Day in the Life of a Remote Software Engineer (in NYC)', // Promotion script: https://www.notion.so/3c82f3148528803fa314d40a1c95ac31
    excerpt:
      'Featured Superhuman Mail’s inbox tools and ChatGPT integration for managing email across my accounts.',
  },
  {
    brand: 'Framer',
    domain: 'framer.com',
    videoId: 'lD84PGERjP8',
    title: 'Moving Into My Dream NYC Apartment as a Software Engineer', // Promotion script: https://www.notion.so/2c82f3148528809a9799ff8fc4a9c61b
    excerpt:
      'Featured the Framer Creator Micro by Work Louder, showing how its keys and dial fit my coding and video editing workflow.',
  },
  {
    brand: 'Even Realities',
    domain: 'evenrealities.com',
    videoId: 'DT7oJEmIls4',
    title: 'Day in the Life with Invisible Smart Glasses', // Promotion script: https://www.notion.so/2952f314852880e69d22d84825f0bec6
    excerpt:
      'Tested the Even G2 glasses and R1 ring through teleprompter, navigation, and everyday use.',
  },
  {
    brand: 'LG Electronics',
    domain: 'lg.com',
    videoId: 'xt50CiiTsc8',
    title: 'NYC Productive Day | DITL',
    // Product confirmed by Brian: LG monitor.
    excerpt:
      'Partnered with LG Electronics to feature its monitor in my desk setup as a software engineer.',
  },
  {
    brand: 'Laifen',
    domain: 'laifentech.com',
    videoId: 'OXA3tmmQJkc',
    title: 'My Tiny Desk Setup in NYC as a Software Engineer', // Promotion script: https://www.notion.so/c7b14abd29614bdb98e39f222092c4da
    excerpt:
      'Tested the Laifen Wave electric toothbrush and its app controls as part of my home tech and daily brushing routine.',
  },
  {
    brand: 'Monday.com',
    domain: 'monday.com',
    videoId: '6nvnKjzwjaI',
    title: 'Getting My Life Together as a Software Engineer', // Promotion script: https://www.notion.so/2542f3148528807b9629dc640f0f0fd5
    excerpt:
      'Demonstrated monday sidekick reviewing project priorities, drafting a client follow-up, and creating a task.',
  },
  {
    brand: 'CookUnity',
    domain: 'cookunity.com',
    videoId: '5a4y3fSbXrE',
    title: 'Realistic Day in the Life of a Software Engineer in NYC',
  },
  {
    brand: 'Skillshare',
    domain: 'skillshare.com',
    videoId: '-n6CNbn4bwU',
    title: "What's in My Travel Bag (2024)",
  },
  {
    brand: 'BenQ',
    domain: 'benq.com',
    videoId: 'G7tmy6amDEc',
    title: 'My New Life Living in NYC as a Software Engineer',
  },
  {
    brand: 'Mobbin',
    domain: 'mobbin.com',
    videoId: 'uMvJlTk0w9U',
    title: 'A Week in the Life of a Software Engineer', // Promotion script: https://www.notion.so/63c455ebce89480e92c49ec652a412d8
    excerpt:
      'Showed how I use Mobbin to find real app interfaces and browse complete workflows when designing new features.',
  },
  {
    brand: 'Logitech',
    domain: 'logitech.com',
    videoId: 'AIZ5LJ2IeZo',
    title: '6am Morning Routine | Software Engineer Habits', // Promotion script: https://www.notion.so/7cfbaed769104e5f8607aa60630acc24
    excerpt:
      'Featured the Logitech MX Brio 4K webcam as part of my setup for communicating in work meetings.',
  },
  {
    brand: 'Notion',
    domain: 'notion.so',
    videoId: '53KFVt2GRkE',
    title: 'My Complete Notion Setup as a Software Engineer & Creator', // Promotion script: https://www.notion.so/56e7287ef36e4faf92b3e546a61518ff
    excerpt:
      'Shared my Notion systems for development notes, learning, personal finances, and managing my YouTube channel.',
  },
  {
    brand: 'Raycast',
    domain: 'raycast.com',
    videoId: 'mH4Fs1Pxomo',
    title: '5 Productivity Apps I Use as a Developer', // Promotion script: https://www.notion.so/408a5173ae33474dbd8584131e565a36
    excerpt:
      'Demonstrated Raycast’s launcher, window management, AI features, and extensions in my Mac workflow.',
  },
  {
    brand: 'Eufy',
    domain: 'eufy.com',
    videoId: '3iOR9XlN2SU',
    title: "Software Engineer's Modern & Minimal Apartment Tour",
  },
  {
    brand: 'Snyk',
    domain: 'snyk.io',
    videoId: 'j68U1wBplk8',
    title: 'My Tech Stack 2024 | Day in the Life of a Software Engineer',
  },
  {
    brand: 'IBM',
    domain: 'www.ibm.com',
    videoId: 'CIi1M-9oTHM',
    title: 'Building a Subway Chatbot with IBM SkillsBuild', // Promotion script: https://www.notion.so/2432f314852880e1bbd6f732d98c66fe
    excerpt:
      'Partnered with IBM SkillsBuild to feature its free “Build Your First Chatbot” course through a NYC subway chatbot project.',
  },
  {
    brand: 'Brilliant',
    domain: 'brilliant.org',
    videoId: 'vrr8RmAvyVo',
    title: '15” M2 MacBook Air Review for Programming',
    // Promotion script: https://www.notion.so/4e2578d71f9041b0bd52702adcdc665a
    excerpt:
      'Featured Brilliant’s interactive STEM lessons and shared how I use it to explore neural networks and AI.',
  },
  {
    brand: 'LARQ',
    domain: 'livelarq.com',
    videoId: 'SiwpXWMjBDw',
    title: 'Weekend in the Life of a Software Engineer | Figma Conference',
  },
  {
    brand: 'Wander',
    domain: 'wander.com',
    videoId: 'J_z7P-yvd6Y',
    title: 'Weekend in the Life of a Software Engineer',
  },
  {
    brand: 'HubSpot',
    domain: 'hubspot.com',
    videoId: 'WDHbgtmOmag',
    title: '6 Programming Languages to Learn as a Beginner',
  },
  {
    brand: 'Coding Dojo',
    domain: 'codingdojo.com',
    videoId: 'r926m6iPHeE',
    title: 'Why I Love Being a Software Engineer',
  },
  {
    brand: 'Slack',
    domain: 'slack.com',
    videoId: 'F89JTZzJJnI',
    title: 'The Reality of Being a Software Engineer', // Promotion script: https://www.notion.so/79e90c147db54465b9d87d7d93f045fc
    excerpt:
      'Demonstrated Slack Workflow Builder and highlighted its Developer Program for building automations and Slack apps.',
  },
  {
    brand: 'reMarkable',
    domain: 'remarkable.com',
    videoId: 'JmCkippnQpk',
    title: 'How I Stay Productive as a Software Engineer',
  },
  {
    brand: 'AG1',
    domain: 'drinkag1.com',
    videoId: 'vrG7OGT4-q4',
    title: 'No Commentary | Day in the Life of a Software Engineer',
  },
  {
    brand: 'Tenways',
    domain: 'tenways.com',
    videoId: 'vrG7OGT4-q4',
    title: 'No Commentary | Day in the Life of a Software Engineer',
  },
  {
    brand: 'Torras',
    domain: 'torraslife.com',
    videoId: 'rvB3I_W0fF0',
    title: "What's on My iPhone as a Software Engineer",
  },
  {
    brand: 'Dex',
    domain: 'getdex.com',
    videoId: 'Z5GzxjJOPdM',
    title: 'My Tech Every Day Carry (2023)',
  },
  {
    brand: 'Ergonofis',
    domain: 'ergonofis.com',
    videoId: 'Q9Qu-ddjDEE',
    title: "Software Engineer's Productive and Minimal Desk Setup",
  },
  {
    brand: 'XREAL',
    domain: 'xreal.com',
    videoId: 'HvB61U1ENvM',
    title: 'Coding With AR Glasses | Day in the Life of a Software Engineer',
  },
  {
    brand: 'Akiflow',
    domain: 'akiflow.com',
    videoId: 'hBk8Y4NOa4I',
    title: '7 Development Tools I Use | Day in the Life',
  },
]

const featuredBrandOrder = [
  'IBM',
  'Notion',
  'Slack',
  'Logitech',
  'Framer',
  'Raycast',
  'Superhuman',
  'LG Electronics',
  'Monday.com',
  'Mobbin',
  'Brilliant',
  'Even Realities',
]

const collaborations = featuredBrandOrder
  .map((brand) =>
    allCollaborations.find((collaboration) => collaboration.brand === brand),
  )
  .filter((collaboration): collaboration is Collaboration =>
    Boolean(collaboration),
  )

export function BrandCollaborations() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeGroup, setActiveGroup] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const groupSize = 4
  const groupCount = Math.ceil(collaborations.length / groupSize)
  const groupStart = activeGroup * groupSize
  const visibleCollaborations = collaborations.slice(
    groupStart,
    groupStart + groupSize,
  )
  const active = activeIndex === null ? null : collaborations[activeIndex]
  const videoUrl = active
    ? `https://www.youtube.com/watch?v=${active.videoId}`
    : null

  useEffect(() => {
    if (reduceMotion !== false || isPaused || activeIndex !== null) return

    const interval = window.setInterval(() => {
      setActiveGroup((current) => (current + 1) % groupCount)
      setActiveIndex(null)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [activeIndex, groupCount, isPaused, reduceMotion])

  return (
    <section
      aria-labelledby="brand-collaborations-heading"
      className="mt-24 sm:mt-32"
    >
      <div className="flex w-full items-center gap-6">
        <h2
          id="brand-collaborations-heading"
          className="text-sm font-semibold whitespace-nowrap text-foreground"
        >
          In good company
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setActiveIndex(null)
        }}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setIsPaused(false)
            setActiveIndex(null)
          }
        }}
      >
        <ul
          role="list"
          className="mt-14 grid w-full grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2 sm:gap-y-6 lg:grid-cols-4"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleCollaborations.map((collaboration, index) => {
              const collaborationIndex = groupStart + index

              return (
                <motion.li
                  key={collaboration.brand}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 4, filter: 'blur(3px)' }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transitionEnd: { filter: 'none' },
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -4, filter: 'blur(3px)' }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    type="button"
                    aria-label={`Show ${collaboration.brand} collaboration`}
                    onMouseEnter={() => setActiveIndex(collaborationIndex)}
                    onFocus={() => setActiveIndex(collaborationIndex)}
                    onBlur={() => setActiveIndex(null)}
                    className="group relative isolate flex min-h-20 w-full items-center justify-start gap-4 px-0 py-6 text-left text-base font-medium text-foreground lg:justify-center lg:text-center"
                  >
                    <Halo
                      className={`pointer-events-none absolute -inset-x-4 inset-y-0 z-0 h-auto w-auto scale-95 rounded-2xl bg-muted opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 ${activeIndex === collaborationIndex ? 'scale-100 opacity-100' : ''}`}
                    />
                    <span
                      className="relative z-10 flex max-w-full items-center gap-2"
                      aria-hidden="true"
                    >
                      <Image
                        src={`/logos/wordmarks/${wordmarks[collaboration.brand].file}.${collaboration.brand === 'LG Electronics' ? 'png' : 'svg'}`}
                        alt=""
                        width={wordmarks[collaboration.brand].width}
                        height={wordmarks[collaboration.brand].height}
                        unoptimized
                        className={`max-w-full object-contain object-left ${collaboration.brand === 'LG Electronics' ? 'invert dark:invert-0' : 'dark:invert'}`}
                        style={{
                          width: wordmarks[collaboration.brand].width * 0.9,
                          height: wordmarks[collaboration.brand].height * 0.9,
                        }}
                      />
                    </span>
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        <div
          aria-hidden={!active}
          className={`mt-12 grid gap-y-6 transition-opacity duration-200 lg:grid-cols-2 lg:items-center lg:gap-x-12 ${active ? 'opacity-100' : 'pointer-events-none invisible opacity-0'}`}
        >
          <div className="min-w-0">
            {active && videoUrl ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${active.title} on YouTube`}
                className="group relative block aspect-video w-full max-w-xl overflow-hidden rounded-xl bg-muted ring-1 ring-border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:rounded-2xl"
              >
                <Image
                  key={active.videoId}
                  src={`https://i.ytimg.com/vi/${active.videoId}/hqdefault.jpg`}
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="relative block size-9 drop-shadow-sm"
                  >
                    <span className="absolute inset-1 rounded-full bg-white" />
                    <PlayCircleIcon className="relative size-9 text-neutral-800" />
                  </span>
                </span>
              </a>
            ) : (
              <div className="aspect-video w-full max-w-xl" />
            )}
          </div>
          <ContentCard as="article" className="min-h-40 min-w-0">
            {active && videoUrl ? (
              <>
                <ContentCardTitle
                  as="h3"
                  href={videoUrl}
                  external
                  hoverBackground={false}
                >
                  {active.title}
                </ContentCardTitle>
                {active.excerpt ? (
                  <ContentCardDescription className="line-clamp-2 max-w-xl leading-6 text-pretty">
                    {active.excerpt}
                  </ContentCardDescription>
                ) : null}
                <ContentCardCta external>Watch on YouTube</ContentCardCta>
              </>
            ) : null}
          </ContentCard>
        </div>
      </div>
    </section>
  )
}
