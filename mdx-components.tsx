import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'

import { CodePre } from '@/components/CodePre'
import { OgLink } from '@/components/OgLink'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    pre: CodePre,
    OgLink,
    // `alt` is already part of `ImageProps`
    // eslint-disable-next-line jsx-a11y/alt-text
    Image: (props: ImageProps) => <Image {...props} />,
  }
}
