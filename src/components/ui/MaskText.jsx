import { Fragment } from 'react'
import { m } from 'motion/react'

const ease = [0.32, 0.72, 0, 1]

const container = (delay, stagger) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const word = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease } },
}

/**
 * Headline whose words rise out of invisible masks, one after another.
 * `accent` is a trailing phrase of `text` drawn in the accent colour.
 * `onMount` plays immediately (heroes); otherwise it plays on scroll-in.
 */
export default function MaskText({
  as = 'h2',
  text,
  accent,
  className = '',
  delay = 0,
  stagger = 0.06,
  onMount = false,
}) {
  const Tag = m[as]
  const accentStart = accent ? text.lastIndexOf(accent) : -1
  const words = text.split(' ')
  let cursor = 0

  const trigger = onMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.4 } }

  return (
    <Tag
      className={`mask-text ${className}`}
      aria-label={text}
      variants={container(delay, stagger)}
      initial="hidden"
      {...trigger}
    >
      {words.map((w, i) => {
        const isAccent = accentStart >= 0 && cursor >= accentStart
        cursor += w.length + 1
        // The space sits outside the inline-block mask, where it can't collapse.
        return (
          <Fragment key={i}>
            <span className="mask-text__mask" aria-hidden="true">
              <m.span className={`mask-text__word${isAccent ? ' is-accent' : ''}`} variants={word}>
                {w}
              </m.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        )
      })}
    </Tag>
  )
}
