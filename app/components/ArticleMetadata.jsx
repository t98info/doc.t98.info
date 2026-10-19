function routeFor(type, value) {
  // Hugo's URLize lowercases taxonomy slugs before generating their routes.
  return `/${type}/${encodeURIComponent(value.toLowerCase())}/`
}

export function ArticleMetadata({ metadata }) {
  const publicationDate = metadata.publishdate ?? metadata.date
  const date = typeof publicationDate === 'string' ? publicationDate.slice(0, 10) : ''
  const tags = Array.isArray(metadata.tags) ? metadata.tags : []
  const categories = Array.isArray(metadata.categories) ? metadata.categories : []

  if (!date && tags.length === 0 && categories.length === 0) return null

  return (
    <p className="article-metadata">
      {date && <time dateTime={date}>{date}</time>}
      {categories.length > 0 && (
        <span>
          カテゴリ: {categories.map((category) => (
            <a key={category} href={routeFor('categories', category)}>{category}</a>
          ))}
        </span>
      )}
      {tags.length > 0 && (
        <span>
          タグ: {tags.map((tag) => (
            <a key={tag} href={routeFor('tags', tag)}>{tag}</a>
          ))}
        </span>
      )}
    </p>
  )
}
