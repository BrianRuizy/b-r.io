'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from '@heroicons/react/24/outline'
import { motion, useReducedMotion } from 'motion/react'

import { bouncySpring, motionTransition } from '@/lib/transitions'
import { cn } from '@/lib/utils'

export type FileTreeNode = {
  name: string
  comment?: string
  children?: FileTreeNode[]
}

function FileTreeFile({ name, comment }: FileTreeNode) {
  return (
    <div className="flex min-w-0 items-baseline gap-2 py-0.5 pr-2">
      <DocumentIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />
      <span className="truncate text-foreground">{name}</span>
      {comment ? (
        <span className="truncate text-muted-foreground"># {comment}</span>
      ) : null}
    </div>
  )
}

function FileTreeFolder({ node }: { node: FileTreeNode }) {
  let reduceMotion = useReducedMotion()
  let chevronTransition = motionTransition(bouncySpring, reduceMotion)

  return (
    <Disclosure as="div" defaultOpen>
      {({ open }) => (
        <>
          <DisclosureButton className="group flex w-full min-w-0 items-center gap-1.5 rounded-md py-0.5 pr-2 text-left hover:bg-muted/80">
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={chevronTransition}
              className="flex size-3.5 shrink-0 items-center justify-center"
            >
              <ChevronRightIcon className="size-3.5 text-muted-foreground" />
            </motion.span>
            <FolderIcon className="size-4 shrink-0 text-muted-foreground/70" />
            <span className="truncate text-foreground">{node.name}</span>
          </DisclosureButton>
          <DisclosurePanel className="ml-[0.4375rem] border-l border-border/60 pl-3">
            {node.children?.map((child) => (
              <FileTreeNode key={child.name} node={child} />
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

function FileTreeNode({ node }: { node: FileTreeNode }) {
  if (node.children?.length) {
    return <FileTreeFolder node={node} />
  }

  return <FileTreeFile {...node} />
}

export function FileTree({
  tree,
  className,
}: {
  tree: FileTreeNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'not-prose overflow-hidden rounded-3xl border border-border p-4 font-mono text-[13px] leading-6 sm:p-8',
        className,
      )}
    >
      <FileTreeNode node={tree} />
    </div>
  )
}
