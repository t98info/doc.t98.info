import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './styles.css'

const siteUrl = 'https://doc.t98.info'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ほむりんルーム総合インフォ',
    template: '%s | ほむりんルーム総合インフォ'
  },
  description: 'ほむりんルームグループのお知らせ、利用規約、各種ガイドを掲載しています。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ほむりんルーム総合インフォ',
    url: siteUrl,
    title: 'ほむりんルーム総合インフォ',
    description: 'ほむりんルームグループのお知らせ、利用規約、各種ガイドを掲載しています。',
    images: ['/title-logo.png']
  },
  twitter: {
    card: 'summary',
    title: 'ほむりんルーム総合インフォ',
    description: 'ほむりんルームグループのお知らせ、利用規約、各種ガイドを掲載しています。',
    images: ['/title-logo.png']
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
}

const navbar = (
  <Navbar
    logo={
      <img
        className="site-logo"
        src={`${basePath}/title-logo.png`}
        alt="ほむりんルーム総合インフォ"
        width="320"
        height="60"
      />
    }
  >
    <div className="site-navbar-links" aria-label="サイトメニュー">
      <a href={`${basePath}/archive/`}>過去のお知らせ</a>
      <a href={`${basePath}/tags/`}>タグ</a>
      <a href={`${basePath}/categories/`}>カテゴリ</a>
      <a href={`${basePath}/about/`}>このサイトについて</a>
      <a href={`${basePath}/index.xml`}>RSS</a>
    </div>
  </Navbar>
)
const search = (
  <Search
    emptyResult="見つかりませんでした。"
    loading="検索中…"
    errorText="検索に失敗しました。時間をおいて再度お試しください。"
    placeholder="サイト内を検索"
  />
)
const footer = <Footer>&copy; ほむりんルームグループ</Footer>
const lastUpdated = <LastUpdated locale="ja-JP">最終更新日</LastUpdated>

export default async function RootLayout({ children }) {
  return (
    <html lang="ja" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={null}
          feedback={{ content: null }}
          lastUpdated={lastUpdated}
          search={search}
          themeSwitch={{ dark: 'ダーク', light: 'ライト', system: 'システム' }}
          toc={{ title: 'このページの目次', backToTop: 'トップへ戻る' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
