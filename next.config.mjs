import nextMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/writing/*': ['./src/app/writing/**/*.{mdx,png,jpg,jpeg,webp,gif}'],
  },
  images: {
    qualities: [100],
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
        source: '/posts/my-desk-setup-for-2023',
        destination: '/writing/desk-setup',
        permanent: true,
      },
      {
        source: '/articles/:slug',
        destination: '/writing/:slug',
        permanent: true,
      },
      {
        source: '/videos/:slug',
        destination: '/writing/:slug',
        permanent: true,
      },
      {
        source: '/posts',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/posts/:slug',
        destination: '/writing/:slug',
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
    remarkPlugins: ['remark-gfm', 'remark-code-filename'],
    rehypePlugins: ['rehype-prism-plus'],
  },
})

export default withMDX(nextConfig)
