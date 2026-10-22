import { ArrowRight, Phone } from '@phosphor-icons/react'
import Seo from '@/components/ui/Seo'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import ScrollText from '@/components/ui/ScrollText'
import PageHero from '@/components/sections/PageHero'
import Review from '@/components/sections/Review'
import VisitUs from '@/components/sections/VisitUs'
import CtaBand from '@/components/sections/CtaBand'
import { business, photos, telHref } from '@/data/site'
import './About.scss'

const facts = [
  { value: business.rating.score, label: 'Google rating' },
  { value: business.rating.count, label: 'Customer reviews' },
  { value: '₹0', label: 'Uninstall and pickup' },
  { value: '1 to 2 ton', label: 'Window and split ACs for sale' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Suhan | Second Hand AC Shop in Sector 89, Noida"
        description="Suhan Second Hand AC Sale and Purchase is a Noida shop in Nimi Bihar, Sector 89 that buys every kind of AC and sells good-condition used window and split ACs."
      />

      <PageHero
        title="A Noida shop that buys and sells ACs, fairly."
        lead="Suhan is a second hand AC shop in Nimi Bihar, Sector 89. Our aim is simple: a great price and good service for every customer."
        photo={photos.crew}
      >
        <Button to="/sell-old-ac" size="lg" iconRight={ArrowRight}>
          Get my price
        </Button>
        <Button href={telHref} size="lg" variant="outline" icon={Phone}>
          Call {business.phoneShort}
        </Button>
      </PageHero>

      <section className="section section--flush-top story">
        <div className="container">
          <ScrollText
            className="story__statement"
            text="We give old air conditioners a second life. Good units find new homes, and the rest go for parts and scrap instead of sitting on a balcony."
          />

          <div className="story__cols">
            <Reveal className="story__col">
              <h2 className="h3">For people selling</h2>
              <p>
                We buy every kind of AC, working or not, from homes, offices, hotels and factories:
                window, split, ductable, cassette, chiller plants and more. Uninstallation and
                pickup are free.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="story__col">
              <h2 className="h3">For people buying</h2>
              <p>
                We sell window and split ACs in 1, 1.5 and 2 ton, only in good condition. Buying
                used is a budget-friendly way to stay cool, and it keeps working machines in use.
              </p>
            </Reveal>
          </div>

          <Reveal as="dl" delay={0.1} className="story__facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd className="tabular">{f.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Review />

      <VisitUs title="Come and see us" />

      <CtaBand />
    </>
  )
}
