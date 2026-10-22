import { useId, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import Button from '../ui/Button'
import { waHref } from '@/data/site'
import './TonnageFinder.scss'

const SIZES = ['1 ton', '1.5 ton', '2 ton', 'Over 2 ton']

// Rule of thumb used by most Indian AC sellers. A hot room needs a size up.
function recommend(sqft, hot) {
  let i = sqft <= 120 ? 0 : sqft <= 180 ? 1 : sqft <= 250 ? 2 : 3
  if (hot) i = Math.min(i + 1, 3)
  return SIZES[i]
}

const ROOM_HINT = (sqft) =>
  sqft <= 120
    ? 'Small bedroom or study'
    : sqft <= 180
      ? 'Bedroom or small living room'
      : sqft <= 250
        ? 'Large living room or small office'
        : 'Hall or open office'

export default function TonnageFinder() {
  const [sqft, setSqft] = useState(150)
  const [hot, setHot] = useState(false)
  const rangeId = useId()
  const hotId = useId()
  const ton = recommend(sqft, hot)
  const fill = ((sqft - 80) / (320 - 80)) * 100

  return (
    <div className="finder">
      <div className="finder__controls">
        <div className="field">
          <label htmlFor={rangeId} className="field__label">
            Room size: <span className="tabular">{sqft} sq ft</span>
          </label>
          <input
            id={rangeId}
            type="range"
            min={80}
            max={320}
            step={10}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="finder__range"
            style={{ '--fill': `${fill}%` }}
            aria-valuetext={`${sqft} square feet`}
          />
          <p className="field__help">{ROOM_HINT(sqft)}. A 10 x 12 ft room is 120 sq ft.</p>
        </div>

        <label htmlFor={hotId} className="finder__toggle">
          <input
            id={hotId}
            type="checkbox"
            checked={hot}
            onChange={(e) => setHot(e.target.checked)}
          />
          <span className="finder__switch" aria-hidden="true" />
          Top floor or west-facing room
        </label>
      </div>

      <div className="finder__result" aria-live="polite">
        <p className="finder__label">You need about</p>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.p
            key={ton}
            className="finder__ton"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            {ton}
          </m.p>
        </AnimatePresence>
        <Button
          href={waHref(
            `Hi Suhan, I am looking for a used ${ton === 'Over 2 ton' ? 'AC over 2 ton' : `${ton} AC`} for a ${sqft} sq ft room. What do you have in stock?`,
          )}
          variant="wa"
          icon={WhatsappLogo}
          block
        >
          Check stock
        </Button>
      </div>
    </div>
  )
}
