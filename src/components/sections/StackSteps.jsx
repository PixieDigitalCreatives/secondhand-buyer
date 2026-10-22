import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import Button from '../ui/Button'
import SectionHead from '../ui/SectionHead'
import './StackSteps.scss'

const tones = ['light', 'tint', 'night', 'accent']

function Card({ step, i, total, progress, cta }) {
  // Each card pins, then shrinks a little as the next one slides over it.
  const targetScale = 1 - (total - 1 - i) * 0.045
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])
  const Icon = step.icon

  return (
    <div className="stack__slot">
      <m.article
        className={`stack-card stack-card--${tones[i % tones.length]}`}
        style={{ scale, top: `calc(${i} * 1.75rem)` }}
      >
        <div className="stack-card__body">
          <span className="stack-card__icon" aria-hidden="true">
            <Icon size={28} />
          </span>
          <h3 className="stack-card__title">{step.title}</h3>
          <p className="stack-card__text">{step.text}</p>
          {cta && (
            <Button to={cta.to} size="lg" variant="dark" orb={ArrowUpRight}>
              {cta.label}
            </Button>
          )}
        </div>
        <Icon className="stack-card__art" weight="thin" aria-hidden="true" />
      </m.article>
    </div>
  )
}

// Sticky stacking cards: each step pins under the nav and the next one
// slides over it, so the process reads like turning pages. `cta` goes on
// the last card.
export default function StackSteps({ title, lead, steps, cta }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section className="section stack">
      <div className="container">
        <SectionHead title={title} lead={lead} />
        <ol ref={ref} className="stack__list">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Card
                step={s}
                i={i}
                total={steps.length}
                progress={scrollYProgress}
                cta={i === steps.length - 1 ? cta : undefined}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
