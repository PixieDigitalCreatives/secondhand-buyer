import { Link } from 'react-router-dom'

// One component for every CTA. Renders a router Link (`to`), an anchor
// (`href`) or a button, so styling never drifts between them.
// `orb` nests the trailing icon in its own circle (button-in-button).
export default function Button({
  to,
  href,
  variant = 'primary',
  size,
  block = false,
  icon: Icon,
  iconRight: IconRight,
  orb: Orb,
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
    block && 'btn--block',
    Orb && 'btn--orb',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {Icon && <Icon size={20} weight="regular" aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && (
        <IconRight size={18} weight="regular" aria-hidden="true" className="btn__arrow" />
      )}
      {Orb && (
        <span className="btn__orb" aria-hidden="true">
          <Orb size={16} weight="bold" />
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  )
}
