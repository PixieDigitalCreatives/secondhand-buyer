import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { GoogleLogo, Phone, Star, Truck, WhatsappLogo } from '@phosphor-icons/react'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'
import MaskText from '../ui/MaskText'
import ParallaxPhoto from '../ui/ParallaxPhoto'
import QuoteWizard from './QuoteWizard'
import { business, photos, telHref, waHref, waMessages } from '@/data/site'
import './HomeHero.scss'

const ease = [0.32, 0.72, 0, 1]
const ROTATE_MS = 2400
const acTypes = ['split AC', 'window AC', 'cassette AC', 'VRV system', 'tower AC', 'chiller plant']

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease, delay },
})

const chipIn = (delay) => ({
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { type: 'spring', stiffness: 200, damping: 18, delay },
})

// Cycles through the kinds of AC we buy, each one rising out of a mask.
function RotatingType() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % acTypes.length), ROTATE_MS)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <span className="rotator" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={acTypes[i]}
          className="rotator__word"
          initial={{ y: '105%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-105%' }}
          transition={{ duration: 0.8, ease }}
        >
          {acTypes[i]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

export default function HomeHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15])
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section ref={ref} className="home-hero">
      {/* Slow-drifting light, drawn with gradients (no blur filters). */}
      <div className="home-hero__glow" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="container home-hero__grid">
        <m.div className="home-hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <m.p className="eyebrow" {...fadeUp(0.05)}>
            Second hand AC sale &amp; purchase, Noida
          </m.p>

          <h1
            className="home-hero__title"
            aria-label="Sell your old AC for the best price in Noida"
          >
            <MaskText
              as="span"
              text="Sell your old"
              onMount
              delay={0.15}
              className="home-hero__line"
            />
            <m.span
              className="home-hero__line home-hero__line--accent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.45 }}
            >
              <RotatingType />
            </m.span>
          </h1>

          <m.p className="lead home-hero__lead" {...fadeUp(0.6)}>
            Get the best price for it, working or not. Free uninstallation and pickup across Noida.
          </m.p>

          <m.div className="btn-row home-hero__ctas" {...fadeUp(0.75)}>
            <Magnetic>
              <Button href={telHref} size="lg" icon={Phone}>
                Call {business.phoneShort}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={waHref(waMessages.sell)} size="lg" variant="wa" icon={WhatsappLogo}>
                WhatsApp us
              </Button>
            </Magnetic>
          </m.div>
        </m.div>

        <m.div className="home-hero__stage-wrap" style={{ y: stageY }}>
          <m.div
            className="bezel home-hero__stage"
            initial={{ opacity: 0, y: 80, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.25 }}
          >
            <div className="bezel__core home-hero__panel">
              <ParallaxPhoto
                {...photos.crew}
                alt=""
                amount={6}
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="home-hero__photo"
              />
              <div className="home-hero__form">
                <QuoteWizard />
              </div>
            </div>
          </m.div>

          {/* Floating proof chips that overlap the frame edge. The outer
              element floats (CSS), the inner card pops in (Motion). */}
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-chip hero-chip--rating"
          >
            <m.span className="hero-chip__card" {...chipIn(1.1)}>
              <span className="hero-chip__icon hero-chip__icon--google" aria-hidden="true">
                <GoogleLogo size={20} weight="bold" />
              </span>
              <span className="hero-chip__text">
                <strong>
                  {business.rating.score}
                  <span className="hero-chip__stars" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={12} weight="fill" />
                    ))}
                  </span>
                </strong>
                <span>{business.rating.count} Google reviews</span>
              </span>
            </m.span>
          </a>

          <div className="hero-chip hero-chip--pickup">
            <m.span className="hero-chip__card" {...chipIn(1.3)}>
              <span className="hero-chip__icon" aria-hidden="true">
                <Truck size={20} weight="regular" />
              </span>
              <span className="hero-chip__text">
                <strong>Free pickup</strong>
                <span>Uninstallation included</span>
              </span>
            </m.span>
          </div>
        </m.div>
      </div>
    </section>
  )
}
