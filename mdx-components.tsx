import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'

import { CodePre } from '@/components/CodePre'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    pre: CodePre,
    // `alt` is already part of `ImageProps`
    // eslint-disable-next-line jsx-a11y/alt-text
    Image: (props: ImageProps) => <Image {...props} />,
  }
}
