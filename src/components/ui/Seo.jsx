import { useEffect } from 'react'

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Updates the tags that already live in index.html, so crawlers that skip
// JavaScript still get the home page defaults and there are no duplicates.
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
  }, [title, description])

  return null
}
