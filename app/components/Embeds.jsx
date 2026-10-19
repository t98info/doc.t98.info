'use client'

import { useEffect } from 'react'

export function YouTube({ id }) {
  if (!/^[\w-]+$/.test(id)) return null

  return (
    <iframe
      className="media-embed"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title="YouTube video"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}

export function Tweet({ id }) {
  if (!/^\d+$/.test(id)) return null

  return (
    <iframe
      className="legacy-article-embed"
      src={`https://platform.twitter.com/embed/Tweet.html?id=${id}`}
      title="Xの投稿"
      loading="lazy"
      allowFullScreen
    />
  )
}

export function FlickrEmbedLoader() {
  useEffect(() => {
    const existing = document.querySelector('script[data-flickr-embed-loader]')
    if (existing) return

    const script = document.createElement('script')
    script.src = 'https://embedr.flickr.com/assets/client-code.js'
    script.async = true
    script.dataset.flickrEmbedLoader = 'true'
    document.body.appendChild(script)
  }, [])

  return null
}
