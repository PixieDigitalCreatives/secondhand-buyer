import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { Phone, Tag, WhatsappLogo, X } from '@phosphor-icons/react'
import { telHref, waHref, waMessages } from '@/data/site'
import './FloatingActions.scss'

const NUDGE_KEY = 'suhan-nudge-seen'
const NUDGE_DELAY_MS = 9000

const readFlag = () => {
  try {
    return sessionStorage.getItem(NUDGE_KEY) === '1'
  } catch {
    return false
  }
}

const writeFlag = () => {
  try {
    sessionStorage.setItem(NUDGE_KEY, '1')
  } catch {
    // Storage blocked (private mode etc.). The nudge just shows again.
  }
}

// Phones: a fixed bar with the three actions that turn visitors into leads.
// Larger screens: a WhatsApp button with a one-time nudge per session.
export default function FloatingActions() {
  const [nudge, setNudge] = useState(false)

  useEffect(() => {
    if (readFlag()) return
    const t = setTimeout(() => setNudge(true), NUDGE_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setNudge(false)
    writeFlag()
  }

  return (
    <>
      <nav className="mobile-bar" aria-label="Quick actions">
        <a href={telHref} className="mobile-bar__item mobile-bar__item--call">
          <Phone weight="bold" aria-hidden="true" />
          Call
        </a>
        <a
          href={waHref(waMessages.sell)}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bar__item mobile-bar__item--wa"
        >
          <WhatsappLogo weight="bold" aria-hidden="true" />
          WhatsApp
        </a>
        <Link to="/sell-old-ac#quote" className="mobile-bar__item mobile-bar__item--quote">
          <Tag weight="bold" aria-hidden="true" />
          Get my price
        </Link>
      </nav>

      <div className="wa-fab">
        <AnimatePresence>
          {nudge && (
            <m.div
              className="wa-fab__nudge"
              role="status"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              <button
                type="button"
                className="wa-fab__close"
                onClick={dismiss}
                aria-label="Dismiss message"
              >
                <X size={14} weight="bold" />
              </button>
              <p>
                <strong>Old AC at home?</strong>
                Send a photo on WhatsApp and get a price.
              </p>
            </m.div>
          )}
        </AnimatePresence>
        <a
          href={waHref(waMessages.sell)}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-fab__btn"
          aria-label="Chat with us on WhatsApp"
          onClick={dismiss}
        >
          <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
          <span className="wa-fab__label">Chat on WhatsApp</span>
        </a>
      </div>
    </>
  )
}
