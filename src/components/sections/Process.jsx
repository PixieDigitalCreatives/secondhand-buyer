import { useRef } from 'react'
import { m, useScroll, useSpring } from 'motion/react'
import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import './Process.scss'

// A connected timeline. The line is tied to scroll position, so it draws
// forward (and back) as the reader moves through the four steps.
export default function Process({ title, lead, steps, sunk = false, id }) {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.85', 'end 0.55'] })
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <section className={`section process${sunk ? ' section--sunk' : ''}`} id={id}>
      <div className="container">
        <SectionHead title={title} lead={lead} />

        <ol ref={listRef} className="process__list">
          <span className="process__track" aria-hidden="true" />
          <m.span className="process__line" aria-hidden="true" style={{ scale }} />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.1 + i * 0.12} className="process__step">
              <span className="process__icon" aria-hidden="true">
                <s.icon size={24} />
              </span>
              <h3 className="h3">{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
