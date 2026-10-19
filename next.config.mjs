import nextra from 'nextra'

const withNextra = nextra({})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra(nextConfig)
