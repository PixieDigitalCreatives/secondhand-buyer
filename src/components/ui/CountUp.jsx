import { useEffect, useRef } from 'react'
import { animate, m, useInView, useMotionValue, useTransform } from 'motion/react'

// Counts from zero to `value` the first time it scrolls into view.
// The number renders through a motion value, so it never re-renders React.
export default function CountUp({ value, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const text = useTransform(() => `${prefix}${count.get().toFixed(decimals)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, count, value, duration])

  return (
    <m.span
      ref={ref}
      className="tabular"
      aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}
    >
      {text}
    </m.span>
  )
}
