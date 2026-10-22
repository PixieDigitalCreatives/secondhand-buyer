import { m } from 'motion/react'
import ParallaxPhoto from '../ui/ParallaxPhoto'
import './PageHero.scss'

const ease = [0.32, 0.72, 0, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
}

// Split hero for inner pages: message and CTAs left, one framed photo right.
export default function PageHero({ eyebrow, title, lead, photo, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <m.div className="page-hero__copy" variants={container} initial="hidden" animate="show">
          {eyebrow && (
            <m.p className="eyebrow" variants={item}>
              {eyebrow}
            </m.p>
          )}
          <m.h1 className="h1 page-hero__title" variants={item}>
            {title}
          </m.h1>
          <m.p className="lead" variants={item}>
            {lead}
          </m.p>
          {children && (
            <m.div className="btn-row" variants={item}>
              {children}
            </m.div>
          )}
        </m.div>

        <m.div
          className="bezel page-hero__media"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease, delay: 0.2 }}
        >
          <div className="bezel__core page-hero__frame">
            <ParallaxPhoto {...photo} zoom priority sizes="(min-width: 1024px) 46vw, 100vw" />
          </div>
        </m.div>
      </div>
    </section>
  )
}
