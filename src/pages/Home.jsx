import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Buildings,
  ChatCircleText,
  ShieldCheck,
  Storefront,
} from '@phosphor-icons/react'
import Seo from '@/components/ui/Seo'
import ParallaxPhoto from '@/components/ui/ParallaxPhoto'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import HomeHero from '@/components/sections/HomeHero'
import TrustBar from '@/components/sections/TrustBar'
import TypeMarquee from '@/components/sections/TypeMarquee'
import StackSteps from '@/components/sections/StackSteps'
import ZoomShowcase from '@/components/sections/ZoomShowcase'
import WhatWeBuy from '@/components/sections/WhatWeBuy'
import Review from '@/components/sections/Review'
import Faq from '@/components/sections/Faq'
import VisitUs from '@/components/sections/VisitUs'
import CtaBand from '@/components/sections/CtaBand'
import { faqs, photos } from '@/data/site'
import { sellSteps } from '@/data/steps'
import './Home.scss'

const reasons = [
  {
    icon: Storefront,
    title: 'A real shop you can visit',
    text: 'Our store is in Nimi Bihar, Sector 89. Walk in, see the stock and meet the team.',
  },
  {
    icon: ChatCircleText,
    title: 'Prices over WhatsApp',
    text: 'Send a photo and a few details. We reply with a price on chat.',
  },
  {
    icon: Buildings,
    title: 'One unit or a whole building',
    text: 'Single ACs from homes, and bulk lots from offices, hotels, showrooms and factories.',
  },
  {
    icon: ShieldCheck,
    title: 'Only good-condition ACs for sale',
    text: 'Every used AC we sell is in good working condition. That is our rule.',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Sell Old AC in Noida | Second Hand AC Buyer & Seller | Suhan"
        description="Sell your old AC in Noida at the best price. Suhan buys working and non-working split, window, cassette, VRV and chiller ACs with free uninstallation and pickup. Call +91 92206 49795."
      />

      <HomeHero />

      <TrustBar />

      <TypeMarquee />

      <section className="section help">
        <div className="container">
          <SectionHead
            title="Selling one AC, buying one, or clearing a whole site?"
            accent="a whole site?"
          />

          <div className="help__grid">
            <Reveal className="help-card help-card--sell">
              <Link to="/sell-old-ac" className="help-card__link">
                <ParallaxPhoto
                  {...photos.oldUnit}
                  className="help-card__img"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
                <div className="help-card__body">
                  <h3 className="help-card__title">Sell your old AC</h3>
                  <p>
                    Splits, windows, cassettes and more, working or not. Uninstallation and pickup
                    are free.
                  </p>
                  <span className="help-card__cta">
                    Get my price <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.08} className="help-card help-card--buy">
              <Link to="/buy-used-ac" className="help-card__link">
                <ParallaxPhoto
                  {...photos.livingRoom}
                  className="help-card__img"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="help-card__body">
                  <h3 className="help-card__title">Buy a used AC</h3>
                  <p>Good-condition window and split ACs in 1, 1.5 and 2 ton.</p>
                  <span className="help-card__cta">
                    See what we sell <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.16} className="help-card help-card--commercial">
              <Link to="/commercial-ac-dismantling" className="help-card__link">
                <div className="help-card__body">
                  <span className="help-card__icon" aria-hidden="true">
                    <Buildings size={26} />
                  </span>
                  <h3 className="help-card__title">Commercial and dismantling</h3>
                  <p>
                    VRV, VRF and chiller plants, plus full clear-outs of offices, hotels and
                    factories.
                  </p>
                  <span className="help-card__cta">
                    Commercial buying <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <StackSteps
        title="How selling your AC works"
        lead="From the first message to money in your hand, without you lifting a spanner."
        steps={sellSteps}
        cta={{ to: '/sell-old-ac#quote', label: 'Get my price' }}
      />

      <ZoomShowcase />

      <WhatWeBuy
        photo={photos.rooftop}
        showBrands={false}
        lead="Homes, offices, hotels and factories. Single units or entire plants, in any condition."
      />

      <section className="section why">
        <div className="container why__grid">
          <Reveal className="bezel why__media">
            <div className="bezel__core why__media-core">
              <ParallaxPhoto {...photos.mono} amount={10} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </Reveal>
          <div className="why__copy">
            <SectionHead
              title="Why Noida sells to Suhan"
              accent="Suhan"
              lead="Our aim is simple: a great price and good service for every customer, every time."
            />
            <ul className="why__list">
              {reasons.map((r, i) => (
                <Reveal as="li" key={r.title} delay={0.08 * i} className="why__item">
                  <span className="why__icon" aria-hidden="true">
                    <r.icon />
                  </span>
                  <div>
                    <h3 className="h3">{r.title}</h3>
                    <p className="muted">{r.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Review />

      <Faq
        items={[
          faqs.nonWorking,
          faqs.freePickup,
          faqs.price,
          faqs.payment,
          faqs.area,
          faqs.sellToo,
        ]}
      />

      <VisitUs />

      <CtaBand />
    </>
  )
}
