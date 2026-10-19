export const dynamic = 'force-static'

const siteUrl = 'https://doc.t98.info'
const articles = [
  'wcbbs-info20170316',
  'wcbbs-info20170607',
  'wcbbs-info20180221',
  '1904_dai-syasai',
  'c97-001',
  'c97-501',
  'c97-502',
  'end-homrin-bot',
  '20021601',
  'c98-001',
  'c98-002',
  'report-comike-shinagawa',
  'c99-001',
  '0118234101'
]
const tags = [
  'c97', 'c97_4日目', 'c98', 'hello', 'world', 'お知らせ', 'コミケ',
  'コミックマーケット', 'ジャンルコード', '企画枠', '放送',
  '放送関連お知らせ', '車載', '重要なお知らせ'
]
const categories = [
  'hugo', 'ほむりんbot', 'ほむりんルーム', 'インフォ', 'コラム', 'ブログ', '解散掲示板'
]

const paths = [
  '/', '/archive/', '/about/', '/about-cos-camera/', '/del-guide/', '/policy/',
  '/rule/', '/post/',
  ...articles.map((slug) => `/${slug}/`),
  '/tags/', ...tags.map((tag) => `/tags/${encodeURIComponent(tag)}/`),
  '/categories/', ...categories.map((category) => `/categories/${encodeURIComponent(category)}/`)
]

export default function sitemap() {
  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }))
}
