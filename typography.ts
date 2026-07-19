import { type Config } from 'tailwindcss'

export default {
  theme: {
    typography: ({ theme }) => ({
      invert: {
        css: {
          '--tw-prose-body': 'var(--tw-prose-invert-body)',
          '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
          '--tw-prose-links': 'var(--tw-prose-invert-links)',
          '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
          '--tw-prose-underline': 'var(--tw-prose-invert-underline)',
          '--tw-prose-underline-hover':
            'var(--tw-prose-invert-underline-hover)',
          '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
          '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
          '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
          '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
          '--tw-prose-quote-borders': 'var(--tw-prose-invert-quote-borders)',
          '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
          '--tw-prose-code': 'var(--tw-prose-invert-code)',
          '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
          '--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
          '--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
          '--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
          '--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
          '--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)',
        },
      },
      DEFAULT: {
        css: {
          '--tw-prose-body': 'var(--muted-foreground)',
          '--tw-prose-headings': 'var(--foreground)',
          '--tw-prose-links': 'var(--accent)',
          '--tw-prose-links-hover': 'var(--accent)',
          '--tw-prose-underline':
            'color-mix(in oklab, var(--accent) 20%, transparent)',
          '--tw-prose-underline-hover': 'var(--accent)',
          '--tw-prose-bold': 'var(--foreground)',
          '--tw-prose-counters': 'var(--foreground)',
          '--tw-prose-bullets': 'var(--foreground)',
          '--tw-prose-hr': 'var(--border)',
          '--tw-prose-quote-borders': 'var(--border)',
          '--tw-prose-captions': 'var(--muted-foreground)',
          '--tw-prose-code': 'var(--foreground)',
          '--tw-prose-code-bg':
            'color-mix(in oklab, var(--muted-foreground) 15%, transparent)',
          '--tw-prose-pre-code': 'var(--color-neutral-100)',
          '--tw-prose-pre-bg': 'var(--foreground)',
          '--tw-prose-pre-border': 'transparent',
          '--tw-prose-th-borders': 'var(--border)',
          '--tw-prose-td-borders': 'var(--border)',

          '--tw-prose-invert-body': 'var(--muted-foreground)',
          '--tw-prose-invert-headings': 'var(--foreground)',
          '--tw-prose-invert-links': 'var(--accent)',
          '--tw-prose-invert-links-hover': 'var(--accent)',
          '--tw-prose-invert-underline':
            'color-mix(in oklab, var(--accent) 30%, transparent)',
          '--tw-prose-invert-underline-hover': 'var(--accent)',
          '--tw-prose-invert-bold': 'var(--foreground)',
          '--tw-prose-invert-counters': 'var(--foreground)',
          '--tw-prose-invert-bullets': 'var(--foreground)',
          '--tw-prose-invert-hr': 'var(--border)',
          '--tw-prose-invert-quote-borders': 'var(--muted-foreground)',
          '--tw-prose-invert-captions': 'var(--muted-foreground)',
          '--tw-prose-invert-code': 'var(--foreground)',
          '--tw-prose-invert-code-bg':
            'color-mix(in oklab, var(--foreground) 5%, transparent)',
          '--tw-prose-invert-pre-code': 'var(--color-neutral-100)',
          '--tw-prose-invert-pre-bg':
            'color-mix(in oklab, black 40%, transparent)',
          '--tw-prose-invert-pre-border':
            'color-mix(in oklab, var(--foreground) 10%, transparent)',
          '--tw-prose-invert-th-borders': 'var(--border)',
          '--tw-prose-invert-td-borders': 'var(--border)',

          // Base
          color: 'var(--tw-prose-body)',
          lineHeight: theme('lineHeight.7'),
          '> *': {
            marginTop: theme('spacing.10'),
            marginBottom: theme('spacing.10'),
          },
          p: {
            marginTop: theme('spacing.7'),
            marginBottom: theme('spacing.7'),
          },

          // Headings
          'h2, h3': {
            color: 'var(--tw-prose-headings)',
            fontWeight: theme('fontWeight.semibold'),
          },
          h2: {
            fontSize: theme('fontSize.xl')[0],
            lineHeight: theme('lineHeight.7'),
            marginTop: theme('spacing.20'),
            marginBottom: theme('spacing.4'),
          },
          h3: {
            fontSize: theme('fontSize.base')[0],
            lineHeight: theme('lineHeight.7'),
            marginTop: theme('spacing.16'),
            marginBottom: theme('spacing.4'),
          },
          ':is(h2, h3) + *': {
            marginTop: 0,
          },

          // Images
          img: {
            borderRadius: theme('borderRadius.3xl'),
          },

          // Inline elements
          a: {
            color: 'var(--tw-prose-links)',
            fontWeight: theme('fontWeight.medium'),
            textDecoration: 'underline',
            textDecorationColor: 'var(--tw-prose-underline)',
            transitionProperty: 'color, text-decoration-color',
            transitionDuration: theme('transitionDuration.150'),
            transitionTimingFunction: theme('transitionTimingFunction.in-out'),
          },
          'a:hover': {
            color: 'var(--tw-prose-links-hover)',
            textDecorationColor: 'var(--tw-prose-underline-hover)',
          },
          strong: {
            color: 'var(--tw-prose-bold)',
            fontWeight: theme('fontWeight.semibold'),
          },
          code: {
            display: 'inline-block',
            color: 'var(--tw-prose-code)',
            fontSize: theme('fontSize.sm')[0],
            fontWeight: theme('fontWeight.semibold'),
            backgroundColor: 'var(--tw-prose-code-bg)',
            borderRadius: theme('borderRadius.lg'),
            paddingLeft: theme('spacing.1'),
            paddingRight: theme('spacing.1'),
            lineHeight: theme('lineHeight.5'),
          },
          'a code': {
            color: 'inherit',
          },
          ':is(h2, h3) code': {
            fontWeight: theme('fontWeight.bold'),
          },

          // Quotes
          blockquote: {
            color: 'var(--tw-prose-headings)',
            fontFamily: theme('fontFamily.serif'),
            fontSize: theme('fontSize.xl')[0],
            lineHeight: theme('lineHeight.8'),
          },
          'blockquote > p:not(:has(cite))': {
            paddingLeft: theme('spacing.6'),
            borderLeftWidth: theme('borderWidth.2'),
            borderLeftColor: 'var(--tw-prose-quote-borders)',
          },
          'blockquote > p:has(cite)': {
            paddingLeft: theme('spacing.6'),
          },
          'blockquote > cite, blockquote cite': {
            display: 'block',
            paddingLeft: theme('spacing.6'),
            color: 'var(--tw-prose-captions)',
            fontSize: theme('fontSize.base')[0],
            lineHeight: theme('lineHeight.7'),
          },
          'blockquote > p:has(cite) cite': {
            paddingLeft: 0,
          },

          // Figures
          figcaption: {
            color: 'var(--tw-prose-captions)',
            fontSize: theme('fontSize.sm')[0],
            lineHeight: theme('lineHeight.6'),
            marginTop: theme('spacing.3'),
          },
          'figcaption > p': {
            margin: 0,
          },

          // Lists
          ul: {
            listStyleType: 'disc',
          },
          ol: {
            listStyleType: 'decimal',
          },
          'ul, ol': {
            paddingLeft: theme('spacing.6'),
          },
          li: {
            marginTop: theme('spacing.4'),
            marginBottom: theme('spacing.4'),
            paddingLeft: theme('spacing[3.5]'),
          },
          'li::marker': {
            fontSize: theme('fontSize.sm')[0],
            fontWeight: theme('fontWeight.semibold'),
          },
          'ol > li::marker': {
            color: 'var(--tw-prose-counters)',
          },
          'ul > li::marker': {
            color: 'var(--tw-prose-bullets)',
          },
          'li :is(ol, ul)': {
            marginTop: theme('spacing.4'),
            marginBottom: theme('spacing.4'),
          },
          'li :is(li, p)': {
            marginTop: theme('spacing.3'),
            marginBottom: theme('spacing.3'),
          },

          // Code blocks
          pre: {
            color: 'var(--tw-prose-pre-code)',
            fontSize: theme('fontSize.sm')[0],
            fontWeight: theme('fontWeight.medium'),
            backgroundColor: 'var(--tw-prose-pre-bg)',
            borderRadius: theme('borderRadius.3xl'),
            padding: theme('spacing.8'),
            overflowX: 'auto',
            border: '1px solid',
            borderColor: 'var(--tw-prose-pre-border)',
          },
          'pre code': {
            display: 'inline',
            color: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
            backgroundColor: 'transparent',
            borderRadius: 0,
            padding: 0,
          },

          // Horizontal rules
          hr: {
            marginTop: theme('spacing.20'),
            marginBottom: theme('spacing.20'),
            borderTopWidth: '1px',
            borderColor: 'var(--tw-prose-hr)',
            '@variant lg': {
              marginLeft: `calc(${theme('spacing.12')} * -1)`,
              marginRight: `calc(${theme('spacing.12')} * -1)`,
            },
          },

          // Tables
          table: {
            width: '100%',
            tableLayout: 'auto',
            textAlign: 'left',
            fontSize: theme('fontSize.sm')[0],
          },
          thead: {
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--tw-prose-th-borders)',
          },
          'thead th': {
            color: 'var(--tw-prose-headings)',
            fontWeight: theme('fontWeight.semibold'),
            verticalAlign: 'bottom',
            paddingBottom: theme('spacing.2'),
          },
          'thead th:not(:first-child)': {
            paddingLeft: theme('spacing.2'),
          },
          'thead th:not(:last-child)': {
            paddingRight: theme('spacing.2'),
          },
          'tbody tr': {
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--tw-prose-td-borders)',
          },
          'tbody tr:last-child': {
            borderBottomWidth: 0,
          },
          'tbody td': {
            verticalAlign: 'baseline',
          },
          tfoot: {
            borderTopWidth: '1px',
            borderTopColor: 'var(--tw-prose-th-borders)',
          },
          'tfoot td': {
            verticalAlign: 'top',
          },
          ':is(tbody, tfoot) td': {
            paddingTop: theme('spacing.2'),
            paddingBottom: theme('spacing.2'),
          },
          ':is(tbody, tfoot) td:not(:first-child)': {
            paddingLeft: theme('spacing.2'),
          },
          ':is(tbody, tfoot) td:not(:last-child)': {
            paddingRight: theme('spacing.2'),
          },
        },
      },
    }),
  },
} satisfies Config
