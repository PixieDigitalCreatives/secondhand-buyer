import { ArrowUpRight, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { m } from 'motion/react'
import Seo from '@/components/ui/Seo'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import QuoteWizard from '@/components/sections/QuoteWizard'
import { business, telHref, waHref, waMessages } from '@/data/site'
import './Contact.scss'

const ease = [0.16, 1, 0.3, 1]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Suhan | Call +91 92206 49795 | Second Hand AC, Noida"
        description="Call, WhatsApp or visit Suhan Second Hand AC Sale and Purchase at Nimi Bihar, Gali No. 7, Sector 89, Noida. Get a price for your old AC today."
      />

      <section className="contact">
        <div className="container contact__grid">
          <m.div
            className="contact__copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1 className="h1">Talk to Suhan</h1>
            <p className="lead">
              Call, WhatsApp or drop in at the shop. For the quickest price, send a photo of your AC
              on WhatsApp.
            </p>

            <a href={telHref} className="contact__phone">
              <span className="contact__phone-label">
                <Phone size={18} weight="bold" aria-hidden="true" />
                Call us
              </span>
              <span className="contact__phone-number tabular">{business.phoneDisplay}</span>
            </a>

            <Button href={waHref(waMessages.general)} variant="wa" size="lg" icon={WhatsappLogo}>
              WhatsApp us
            </Button>

            <div className="contact__address">
              <MapPin size={22} aria-hidden="true" />
              <div>
                <address>
                  {business.address.line1}
                  <br />
                  {business.address.line2}, {business.address.line3}
                </address>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Get directions
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </div>
          </m.div>

          <m.div
            id="quote"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            <QuoteWizard />
          </m.div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <Reveal className="contact__map">
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
    </>
  )
}
