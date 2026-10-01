'use client'

import { motion } from 'motion/react'
import { bouncy, snappy } from '@/lib/transitions'
import { Sticker } from '@/components/Sticker'
import { type ToolItem } from '@/app/uses/tools'

export function KitStickers({ items }: { items: ToolItem[] }) {
  return (
    <div className="flex items-center justify-center py-6 lg:justify-end lg:py-2">
      <div className="flex items-center pl-4">
        {items.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 18, rotate: tool.rotate }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: tool.rotate,
              transition: {
                ...bouncy({ duration: 0.65, extraBounce: 0.18 }),
                delay: index * 0.08,
              },
            }}
            whileHover={{
              rotate: 0,
              y: -6,
              scale: 1.05,
              transition: snappy(),
            }}
            viewport={{ once: true }}
            className="relative -ml-4 first:ml-0 sm:-ml-5"
            style={{ zIndex: index + 1 }}
          >
            <Sticker
              src={tool.image}
              alt={tool.title}
              rotate={0}
              size="lg"
              variant={tool.kind}
              priority={index < 3}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
