import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <span className="scroll-text__word">
      <m.span style={{ opacity }}>{children}</m.span>{' '}
    </span>
  )
}

// Large statement that "reads itself": each word brightens as the paragraph
// moves up the screen. Screen readers get the plain sentence.
export default function ScrollText({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`scroll-text ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          >
            {w}
          </Word>
        ))}
      </span>
    </Tag>
  )
}
