import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import { photos } from '@/data/site'
import './ZoomShowcase.scss'

// A framed photo that grows to fill the screen as you scroll, then the
// message rises over it. The section is tall so the moment has room.
export default function ZoomShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.62, 1])
  const radius = useTransform(scrollYProgress, [0, 0.55], [48, 0])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.3, 1])
  const copyOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const copyY = useTransform(scrollYProgress, [0.3, 0.6], [60, 0])

  return (
    <section ref={ref} className="zoom" aria-label="We come to you">
      <div className="zoom__sticky">
        <m.div className="zoom__frame" style={{ scale, borderRadius: radius }}>
          <m.div className="zoom__photo" style={{ scale: photoScale }}>
            <Photo {...photos.heroCondensers} alt="" sizes="100vw" />
          </m.div>
          <m.div className="zoom__copy container" style={{ opacity: copyOpacity, y: copyY }}>
            <h2 className="zoom__title">
              We come to you.
              <br />
              <span>You get paid.</span>
            </h2>
            <p>
              Our team uninstalls the indoor and outdoor units and takes them away, free, from your
              home, office or site.
            </p>
            <Button to="/sell-old-ac#quote" size="lg" orb={ArrowUpRight}>
              Get my price
            </Button>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
