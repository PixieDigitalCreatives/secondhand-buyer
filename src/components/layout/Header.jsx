import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { ArrowUpRight, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react'
import Brand from './Brand'
import Button from '../ui/Button'
import { business, nav, telHref, waHref, waMessages } from '@/data/site'
import { lockScroll } from '@/lib/smoothScroll'
import './Header.scss'

const ease = [0.32, 0.72, 0, 1]

const menuList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
}

const menuItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const mobileLinks = [{ to: '/', label: 'Home', end: true }, ...nav]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])

  return (
    <header className={`site-header${open ? ' is-open' : ''}`}>
      <div className="container">
        <div className="site-header__bar">
          <Brand />

          <nav className="site-nav" aria-label="Main">
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="site-nav__link">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Button href={telHref} size="sm" icon={Phone} className="site-header__call">
              Call {business.phoneShort}
            </Button>
            <a
              href={telHref}
              className="icon-btn icon-btn--accent site-header__call-icon"
              aria-label={`Call ${business.phoneDisplay}`}
            >
              <Phone weight="regular" />
            </a>
            <button
              type="button"
              className="burger site-header__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="burger__line" />
              <span className="burger__line" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
            transition={{ duration: 0.45, ease }}
          >
            <m.div
              className="container mobile-menu__inner"
              variants={menuList}
              initial="hidden"
              animate="show"
            >
              <nav aria-label="Mobile">
                <ul className="mobile-menu__list">
                  {mobileLinks.map((item) => (
                    <li key={item.to} className="mobile-menu__mask">
                      <m.div variants={menuItem}>
                        <NavLink to={item.to} end={item.end} className="mobile-menu__link">
                          {item.label}
                          <ArrowUpRight size={22} aria-hidden="true" />
                        </NavLink>
                      </m.div>
                    </li>
                  ))}
                </ul>
              </nav>
              <m.div className="mobile-menu__ctas" variants={menuItem}>
                <Button href={telHref} icon={Phone} block>
                  Call {business.phoneShort}
                </Button>
                <Button href={waHref(waMessages.general)} variant="wa" icon={WhatsappLogo} block>
                  WhatsApp us
                </Button>
              </m.div>
              <m.p className="mobile-menu__address" variants={menuItem}>
                <MapPin aria-hidden="true" />
                <span>
                  {business.address.line1}, {business.address.line2}
                </span>
              </m.p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
