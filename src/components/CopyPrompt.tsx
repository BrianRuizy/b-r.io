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
        className="absolute top-3 right-3 sm:top-5 sm:right-5"
      />
      <pre
        className={cn(
          codeBlockSurfaceClass,
          'p-5 text-sm leading-6 font-medium sm:p-8',
        )}
      >
        <code className="font-[inherit] text-[inherit]">{text}</code>
      </pre>
    </div>
  )
}
