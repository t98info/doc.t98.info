export const dynamic = 'force-static'

const siteUrl = 'https://doc.t98.info'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteUrl}/sitemap.xml`
  }
}
