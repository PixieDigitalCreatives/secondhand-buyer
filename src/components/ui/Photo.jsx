const WIDTHS = [480, 768, 1080, 1440, 1920]

const unsplash = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=70`

// Responsive Unsplash image. `priority` is for the one above-the-fold image
// per page so it does not wait behind lazy loading.
export default function Photo({ id, alt, sizes = '100vw', priority = false, className, ...rest }) {
  return (
    <img
      src={unsplash(id, 1080)}
      srcSet={WIDTHS.map((w) => `${unsplash(id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      {...rest}
    />
  )
}
