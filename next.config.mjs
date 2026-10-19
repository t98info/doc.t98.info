import nextra from 'nextra'

const withNextra = nextra({})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra(nextConfig)
