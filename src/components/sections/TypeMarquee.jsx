import { useRef } from 'react'
import {
  m,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { Snowflake } from '@phosphor-icons/react'
import { brands } from '@/data/site'
import './TypeMarquee.scss'

const types = [
  'Split AC',
  'Window AC',
  'Cassette AC',
  'VRV / VRF',
  'Chiller plant',
  'Tower AC',
  'Ductable AC',
  'Rooftop AHU',
]

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// A band of giant text that drifts on its own and speeds up (or reverses)
// with the reader's scroll velocity.
function VelocityRow({ items, baseVelocity, icon: Icon }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const direction = useRef(1)
  const x = useTransform(() => `${wrap(-50, 0, baseX.get())}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    moveBy += direction.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  // Two identical halves, so shifting by -50% loops seamlessly.
  const run = (copy) =>
    items.map((t) => (
      <span key={`${copy}-${t}`} className="tape__item" aria-hidden={copy === 'b' || undefined}>
        {t}
        <Icon className="tape__sep" aria-hidden="true" />
      </span>
    ))

  return (
    <m.div className="tape__track" style={{ x }}>
      {run('a')}
      {run('b')}
    </m.div>
  )
}

// Two crossed "tapes": the AC types we buy, and the brands we accept.
export default function TypeMarquee() {
  return (
    <section className="tapes" aria-label="AC types and brands we buy">
      <div className="tape tape--accent">
        <VelocityRow items={types} baseVelocity={-2.2} icon={Snowflake} />
      </div>
      <div className="tape tape--ink">
        <VelocityRow items={brands} baseVelocity={2.2} icon={Snowflake} />
      </div>
    </section>
  )
}
