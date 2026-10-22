import { useRef } from 'react'
import { m, useMotionValue, useSpring } from 'motion/react'

const spring = { stiffness: 220, damping: 18, mass: 0.6 }

// Pulls its child gently toward the cursor, then springs back on leave.
// Pointer values live in motion values, so React never re-renders on move.
// Touch and pen pointers are ignored.
export default function Magnetic({ strength = 0.28, className = '', children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  )
}
