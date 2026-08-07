'use client'

import { Children, isValidElement, useMemo, type ReactNode } from 'react'

import { CopyCodeButton } from '@/components/CopyCodeButton'
import { cn } from '@/lib/utils'

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  js: 'JavaScript',
  jsx: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  tsx: 'TypeScript',
  python: 'Python',
  py: 'Python',
  css: 'CSS',
  html: 'HTML',
  bash: 'Bash',
  shell: 'Shell',
  sh: 'Shell',
  json: 'JSON',
  markdown: 'Markdown',
  md: 'Markdown',
  mdx: 'MDX',
  applescript: 'AppleScript',
  swift: 'Swift',
}

function formatLanguage(lang: string) {
  return (
    LANGUAGE_LABELS[lang.toLowerCase()] ??
    lang.charAt(0).toUpperCase() + lang.slice(1)
  )
}

function languageFromClassName(className?: string) {
  if (!className) return null

  const match = /language-([\w-]+)/.exec(className)
  if (!match) return null

  const lang = match[1]
  if (lang === 'text' || lang === 'plain') return null

  return formatLanguage(lang)
}

function codeChildProps(children: ReactNode) {
  const child = Children.toArray(children)[0]
  if (!isValidElement(child)) return null
  return child.props as Record<string, unknown>
}

function languageFromChildren(children: ReactNode) {
  const props = codeChildProps(children)
  if (!props) return null

  return languageFromClassName(props.className as string | undefined)
}

function filenameFromChildren(children: ReactNode) {
  const props = codeChildProps(children)
  if (!props) return null

  const filename =
    props['data-filename'] ?? props.dataFilename ?? props['data-title']

  return typeof filename === 'string' && filename.trim() ? filename : null
}

function labelFromPreProps(props: Record<string, unknown>) {
  const filename =
    props['data-filename'] ?? props.dataFilename ?? props['data-title']

  if (typeof filename === 'string' && filename.trim()) return filename

  return null
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children)
  }
  return ''
}

export function CodePre({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'pre'>) {
  const label =
    labelFromPreProps(props) ??
    filenameFromChildren(children) ??
    languageFromClassName(className) ??
    languageFromChildren(children)

  const copyText = useMemo(() => extractText(children).trimEnd(), [children])

  if (!label) {
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    )
  }

  return (
    <div className="relative">
      <CopyCodeButton
        text={copyText}
        className="absolute top-3 right-3 z-10 sm:top-5 sm:right-5"
      />
      <pre className={cn(className)} {...props}>
        <span className="code-block-label font-sans text-sm font-semibold text-white/90">
          {label}
        </span>
        {children}
      </pre>
    </div>
  )
}
