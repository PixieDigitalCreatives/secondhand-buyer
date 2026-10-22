import {
  ArrowsClockwise,
  Phone,
  SealCheck,
  Storefront,
  Tag,
  WhatsappLogo,
  Wind,
} from '@phosphor-icons/react'
import Seo from '@/components/ui/Seo'
import Button from '@/components/ui/Button'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import PageHero from '@/components/sections/PageHero'
import TonnageFinder from '@/components/sections/TonnageFinder'
import QuoteSection from '@/components/sections/QuoteSection'
import Faq from '@/components/sections/Faq'
import CtaBand from '@/components/sections/CtaBand'
import { business, faqs, photos, telHref, waHref, waMessages } from '@/data/site'
import './BuyAc.scss'

const range = [
  {
    key: 'split',
    name: 'Split AC',
    text: 'Quiet and efficient. The most popular choice for bedrooms and living rooms.',
    photo: photos.splitCloseup,
  },
  {
    key: 'window',
    name: 'Window AC',
    text: 'One-piece unit that is simple to fit and easy on the budget.',
  },
]

const tons = ['1 ton', '1.5 ton', '2 ton']

const buyReasons = [
  {
    icon: SealCheck,
    title: 'Only good-condition units',
    text: 'Every used AC we sell is in good working condition.',
  },
  {
    icon: Storefront,
    title: 'See it before you buy',
    text: 'Visit the shop in Sector 89 and look at the actual unit you are paying for.',
  },
  {
    icon: Tag,
    title: 'Best offers',
    text: 'Fair prices on used ACs, with photos of what is in stock today on WhatsApp.',
  },
  {
    icon: ArrowsClockwise,
    title: 'Selling an old one too?',
    text: 'We buy old ACs as well, so ask us to price yours in the same chat.',
  },
]

const conditionFaq = {
  q: 'What condition are the used ACs in?',
  a: 'Every AC we sell is in good working condition. Ask us about the age and brand of any unit before you buy.',
}

export default function BuyAc() {
  return (
    <>
      <Seo
        title="Buy Second Hand AC in Noida | Used Split & Window AC | Suhan"
        description="Buy good-condition second hand split and window ACs in 1, 1.5 and 2 ton at fair prices. Visit our shop in Sector 89, Noida or check today's stock on WhatsApp."
      />

      <PageHero
        title="Good-condition used ACs at fair prices."
        lead="Window and split ACs in 1, 1.5 and 2 ton. See them at our Sector 89 shop, or check today's stock on WhatsApp."
        photo={photos.livingRoom}
      >
        <Button href={waHref(waMessages.buy)} size="lg" variant="wa" icon={WhatsappLogo}>
          Check stock
        </Button>
        <Button href={telHref} size="lg" variant="outline" icon={Phone}>
          Call {business.phoneShort}
        </Button>
      </PageHero>

      <section className="section section--flush-top range">
        <div className="container">
          <SectionHead
            title="What we sell"
            lead="Pick a type and size to see what is available right now."
          />

          <div className="range__grid">
            {range.map((r, i) => (
              <Reveal key={r.key} delay={i * 0.1} className={`range-card range-card--${r.key}`}>
                {r.photo && (
                  <Photo
                    {...r.photo}
                    alt=""
                    className="range-card__bg"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                )}
                <div className="range-card__body">
                  {!r.photo && (
                    <span className="range-card__icon" aria-hidden="true">
                      <Wind size={26} />
                    </span>
                  )}
                  <h3 className="range-card__name">{r.name}</h3>
                  <p className="range-card__text">{r.text}</p>
                  <p className="range-card__ask">Ask about stock in:</p>
                  <ul className="range-card__tons">
                    {tons.map((t) => (
                      <li key={t}>
                        <a
                          href={waHref(
                            `Hi Suhan, do you have a used ${t} ${r.name} in stock? Please share photos and price.`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="range-card__ton"
                        >
                          {t}
                          <WhatsappLogo size={18} weight="bold" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="container">
          <SectionHead
            title="Not sure which size you need?"
            lead="Slide to your room size. Bigger rooms and hot rooms need more tonnage."
          />
          <Reveal delay={0.1}>
            <TonnageFinder />
          </Reveal>
        </div>
      </section>

      <QuoteSection
        sunk={false}
        intent="buy"
        wizardTitle="Check stock"
        title="Why buy a used AC from Suhan"
        lead="A well-kept used AC keeps a room cool for a lot less money than a new one."
        points={buyReasons}
      />

      <Faq items={[conditionFaq, faqs.seeFirst, faqs.tonnage, faqs.exchange, faqs.area]} />

      <CtaBand
        title="Need an AC this week?"
        text="Tell us the tonnage on WhatsApp and we will share photos and prices of what is in stock."
        message={waMessages.buy}
        photo={photos.livingRoom}
      />
    </>
  )
}
