import { Children, isValidElement, type ReactNode } from 'react'
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

function languageFromChildren(children: ReactNode) {
  const child = Children.toArray(children)[0]
  if (!isValidElement<{ className?: string }>(child)) return null

  return languageFromClassName(child.props.className)
}

export function CodePre({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'pre'>) {
  const language =
    languageFromClassName(className) ?? languageFromChildren(children)

  if (!language) {
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    )
  }

  return (
    <pre className={cn(className)} {...props}>
      <span className="code-block-label font-sans text-sm font-semibold text-white/90">
        {language}
      </span>
      {children}
    </pre>
  )
}
