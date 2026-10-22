import {
  ArrowRight,
  Bed,
  Briefcase,
  CalendarCheck,
  ClipboardText,
  Factory,
  Fan,
  HardHat,
  Phone,
  Recycle,
  Snowflake,
  SquaresFour,
  Storefront,
  Thermometer,
  Wind,
} from '@phosphor-icons/react'
import Seo from '@/components/ui/Seo'
import Button from '@/components/ui/Button'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import PageHero from '@/components/sections/PageHero'
import Process from '@/components/sections/Process'
import QuoteSection from '@/components/sections/QuoteSection'
import Faq from '@/components/sections/Faq'
import CtaBand from '@/components/sections/CtaBand'
import { business, buyClusters, faqs, photos, telHref, waMessages } from '@/data/site'
import { commercialSteps } from '@/data/steps'
import './Commercial.scss'

const systems = [
  {
    icon: SquaresFour,
    name: 'VRV and VRF systems',
    text: 'Multi-split systems from offices and commercial buildings, outdoor and indoor units.',
    tone: 'photo',
  },
  {
    icon: Thermometer,
    name: 'Chiller and AC plants',
    text: 'Air- and water-cooled chillers, complete plants and plant scrap.',
  },
  {
    icon: Fan,
    name: 'Cassette AC',
    text: 'Ceiling cassettes from offices, showrooms and restaurants.',
  },
  {
    icon: Wind,
    name: 'Ductable AC',
    text: 'Ducted units of every tonnage, with or without the ducting.',
  },
  {
    icon: Snowflake,
    name: 'Rooftop AHU and package units',
    text: 'Air handling units and rooftop package ACs, removed from the roof by our crew.',
    tone: 'tint',
  },
  {
    icon: Factory,
    name: 'Tower and 3-phase ACs',
    text: 'Floor-standing towers and heavy-duty commercial units.',
  },
]

const sites = [
  { icon: Briefcase, name: 'Offices' },
  { icon: Bed, name: 'Hotels' },
  { icon: Storefront, name: 'Showrooms' },
  { icon: Factory, name: 'Factories' },
]

const commercialPoints = [
  {
    icon: ClipboardText,
    title: 'Inspection before pricing',
    text: 'We see the equipment first, so the price is based on what is actually there.',
  },
  {
    icon: HardHat,
    title: 'Dismantling by our team',
    text: 'Units, piping and brackets removed safely, with the site left clear.',
  },
  {
    icon: CalendarCheck,
    title: 'Planned around you',
    text: 'We fix the removal date around your move-out or renovation timeline.',
  },
  {
    icon: Recycle,
    title: 'Scrap handled too',
    text: 'AC plant scrap, company scrap and leftover electricals go with us.',
  },
]

const electricals = buyClusters.find((c) => c.key === 'electricals')

export default function Commercial() {
  return (
    <>
      <Seo
        title="Commercial AC Buyer & Office Dismantling in Noida | VRV, Chiller | Suhan"
        description="We buy VRV, VRF, chiller plants, cassette, ductable and rooftop package ACs, and dismantle offices, hotels, showrooms and factories across Noida and NCR."
      />

      <PageHero
        title="Commercial ACs and full-site dismantling."
        lead="We buy VRV, VRF, chiller plants, cassette, ductable and rooftop units from offices, hotels, showrooms and factories."
        photo={photos.rooftop}
      >
        <Button href="#quote" size="lg" iconRight={ArrowRight}>
          Request a site visit
        </Button>
        <Button href={telHref} size="lg" variant="outline" icon={Phone}>
          Call {business.phoneShort}
        </Button>
      </PageHero>

      <section className="section section--flush-top systems">
        <div className="container">
          <SectionHead
            title="Systems we buy"
            lead="Working, faulty or already disconnected. Any brand and any size."
          />

          <ul className="systems__grid">
            {systems.map((s, i) => (
              <Reveal
                as="li"
                key={s.name}
                delay={0.05 * i}
                className={`system${s.tone ? ` system--${s.tone}` : ''}`}
              >
                {s.tone === 'photo' && (
                  <Photo
                    {...photos.wallUnits}
                    alt=""
                    className="system__bg"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                )}
                <span className="system__icon" aria-hidden="true">
                  <s.icon size={24} />
                </span>
                <div>
                  <h3 className="h3">{s.name}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--sunk clearouts">
        <div className="container clearouts__grid">
          <Reveal className="clearouts__media">
            <Photo {...photos.office} sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <div className="clearouts__copy">
            <SectionHead
              title="Moving out or renovating? We clear the lot."
              lead="We remove the ACs, piping and electricals from your premises and pay you for them."
            />
            <Reveal delay={0.08}>
              <ul className="clearouts__sites">
                {sites.map((s) => (
                  <li key={s.name}>
                    <s.icon size={22} aria-hidden="true" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.14} className="clearouts__also">
              <p className="clearouts__also-label">We also buy</p>
              <ul className="tag-list">
                {electricals.items.map((item) => (
                  <li key={item} className="tag tag--raised">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Process title="How a commercial job runs" steps={commercialSteps} />

      <QuoteSection
        intent="commercial"
        wizardTitle="Request a site visit"
        title="One call, one price for the whole site"
        lead="Tell us what is on site. We inspect, quote and handle everything from there."
        points={commercialPoints}
      />

      <Faq items={[faqs.bulk, faqs.siteVisit, faqs.types, faqs.payment, faqs.area]} />

      <CtaBand
        title="Clearing a site? Get one price for everything."
        text="Call or WhatsApp the details and we will arrange an inspection."
        message={waMessages.commercial}
        photo={photos.office}
      />
    </>
  )
}
