import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import Photo from './Photo'

// A photo that drifts slower than the page inside its frame, giving depth as
// you scroll. It is oversized just enough that the drift never shows an edge.
// `zoom` also eases the photo in from slightly closer as the frame arrives.
export default function ParallaxPhoto({ amount = 8, zoom = false, className = '', ...photo }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const base = 1 + (2 * amount) / 100
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5], [zoom ? base + 0.14 : base, base])

  return (
    <div ref={ref} className={`parallax ${className}`}>
      <m.div className="parallax__inner" style={{ y, scale }}>
        <Photo {...photo} />
      </m.div>
    </div>
  )
}
