import nextMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/posts/*': ['./src/app/posts/**/*.{mdx,png,jpg,jpeg,webp,gif}'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/articles/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/videos/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/posts/my-desk-setup-for-2023',
        destination: '/posts/desk-setup',
        permanent: true,
      },
      {
        source: '/gear',
        destination: '/uses',
        permanent: true,
      },
      {
        source: '/favicon.ico',
        destination: '/favicon/favicon.ico',
        permanent: true,
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-prism-plus'],
  },
})

export default withMDX(nextConfig)
