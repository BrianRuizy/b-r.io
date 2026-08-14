'use client'

import { cn } from '@/lib/utils'

import {
  codeBlockSurfaceClass,
  CopyCodeButton,
} from '@/components/CopyCodeButton'

type CopyPromptProps = {
  text: string
  className?: string
}

export function CopyPrompt({ text, className }: CopyPromptProps) {
  return (
    <div className={cn('not-prose relative my-6', className)}>
      <CopyCodeButton
        text={text}
        label="Copy prompt"
        className="absolute top-2 right-2 sm:top-3 sm:right-3"
      />
      <pre
        className={cn(
          codeBlockSurfaceClass,
          'p-3 text-sm leading-6 font-medium sm:p-4',
        )}
      >
        <code className="font-[inherit] text-[inherit]">{text}</code>
      </pre>
    </div>
  )
}
