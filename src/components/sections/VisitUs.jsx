import { ArrowUpRight, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react'
import Reveal from '../ui/Reveal'
import { business, telHref, waHref, waMessages } from '@/data/site'
import './VisitUs.scss'

export default function VisitUs({ title = 'Visit our shop in Sector 89', id }) {
  const rows = [
    {
      icon: Phone,
      label: 'Call',
      value: business.phoneDisplay,
      href: telHref,
    },
    {
      icon: WhatsappLogo,
      label: 'WhatsApp',
      value: 'Send a photo for a price',
      href: waHref(waMessages.general),
      external: true,
    },
    {
      icon: MapPin,
      label: 'Directions',
      value: 'Open in Google Maps',
      href: business.mapsUrl,
      external: true,
    },
  ]

  return (
    <section className="section visit" id={id}>
      <div className="container visit__grid">
        <Reveal className="visit__info">
          <h2 className="h2">{title}</h2>
          <address className="visit__address">
            {business.address.line1}
            <br />
            {business.address.line2}
            <br />
            {business.address.line3}
          </address>
          <ul className="visit__rows">
            {rows.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  className="visit__row"
                  {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="visit__row-icon" aria-hidden="true">
                    <r.icon />
                  </span>
                  <span className="visit__row-text">
                    <span>{r.label}</span>
                    <strong>{r.value}</strong>
                  </span>
                  <ArrowUpRight size={18} className="visit__row-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="visit__map">
          <iframe
            src={business.mapsEmbed}
            title="Map showing Suhan Second Hand AC Sale and Purchase in Sector 89, Noida"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  )
}
