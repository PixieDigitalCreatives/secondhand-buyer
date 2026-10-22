import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react'
import Brand from './Brand'
import Reveal from '../ui/Reveal'
import { business, telHref, waHref, waMessages } from '@/data/site'
import './Footer.scss'

const services = [
  { to: '/sell-old-ac', label: 'Sell your AC' },
  { to: '/buy-used-ac', label: 'Buy used AC' },
  { to: '/commercial-ac-dismantling', label: 'Commercial and dismantling' },
]

const company = [
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__about">
          <Brand />
          <p>
            We buy second hand ACs, working and non-working: window, split, ductable, cassette,
            chiller plants and more, with free uninstallation and pickup. We also sell
            good-condition window and split ACs in 1, 1.5 and 2 ton.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Services">
          <h2 className="site-footer__heading">Services</h2>
          <ul>
            {services.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Company">
          <h2 className="site-footer__heading">Company</h2>
          <ul>
            {company.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                Google reviews <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__contact">
            <li>
              <Phone aria-hidden="true" />
              <a href={telHref}>{business.phoneDisplay}</a>
            </li>
            <li>
              <WhatsappLogo aria-hidden="true" />
              <a href={waHref(waMessages.general)} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                {business.address.line1}, {business.address.line2}, {business.address.line3}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Reveal y={80} className="site-footer__wordmark" aria-hidden="true">
        {business.short}
      </Reveal>

      <div className="container site-footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} {business.name}, Noida.
        </p>
        <p>Brand names are used only to describe the ACs we buy and sell.</p>
      </div>
    </footer>
  )
}
