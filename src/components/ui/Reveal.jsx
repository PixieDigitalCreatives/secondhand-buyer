import { m } from 'motion/react'

const ease = [0.32, 0.72, 0, 1]

// Heavy fade-up with a soft focus pull as content enters the viewport, once.
// MotionConfig in App strips the movement for reduced-motion users.
export default function Reveal({ as = 'div', delay = 0, y = 40, children, ...rest }) {
  const Comp = m[as]
  return (
    <Comp
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
