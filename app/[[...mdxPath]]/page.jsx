import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { ArticleMetadata } from '../components/ArticleMetadata'

const articleSlugs = new Set([
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
])

function routeKey(mdxPath = []) {
  return mdxPath.join('/')
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  const mdxPath = params.mdxPath ?? []
  const { metadata } = await importPage(mdxPath)
  const pathname = routeKey(mdxPath)
  const canonical = pathname ? `/${pathname}/` : '/'

  return {
    title: pathname ? metadata.title : { absolute: metadata.title },
    description: metadata.description,
    openGraph: metadata.openGraph,
    alternates: {
      ...metadata.alternates,
      canonical
    }
  }
}

export default async function Page(props) {
  const params = await props.params
  const mdxPath = params.mdxPath ?? []
  const { default: MDXContent, toc, metadata, title } = await importPage(mdxPath)
  const Wrapper = getMDXComponents().wrapper
  const isArticle = mdxPath.length === 1 && articleSlugs.has(mdxPath[0])
  const hasPageHeading = toc?.some((item) => item.depth === 1)
  const pageTitle = metadata.title ?? title

  return (
    <Wrapper toc={toc} metadata={metadata} title={title}>
      {!hasPageHeading && pageTitle && (
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBlock: '0.5rem 1rem'
          }}
        >
          {pageTitle}
        </h1>
      )}
      {isArticle && <ArticleMetadata metadata={metadata} />}
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
