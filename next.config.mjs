import nextMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.157'],
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
      { source: '/work', destination: '/projects', permanent: true },
      {
        source: '/projects/hines-ui',
        destination: 'https://hinesui.b-r.io',
        permanent: true,
      },
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
        source: '/uses',
        destination: '/gear',
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
