'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { smoothSpring } from '@/lib/transitions'
import portraitImage from '@/images/photos/me.jpeg'

export function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={smoothSpring}
      className="max-w-xs px-2.5 lg:max-w-none"
    >
      <Image
        src={portraitImage}
        alt="Brian Ruiz in New York City"
        sizes="(min-width: 1024px) 32rem, 20rem"
        className="aspect-square rotate-3 rounded-2xl bg-muted object-cover"
      />
    </motion.div>
  )
}
