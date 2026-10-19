import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import { FlickrEmbedLoader, Tweet, YouTube } from './app/components/Embeds'

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    FlickrEmbedLoader,
    Tweet,
    YouTube,
    ...components
  }
}
