import { CalendarBlank, Phone, Snowflake, Stack, Wrench, WhatsappLogo } from '@phosphor-icons/react'
import Seo from '@/components/ui/Seo'
import Button from '@/components/ui/Button'
import PageHero from '@/components/sections/PageHero'
import QuoteSection from '@/components/sections/QuoteSection'
import StackSteps from '@/components/sections/StackSteps'
import WhatWeBuy from '@/components/sections/WhatWeBuy'
import Faq from '@/components/sections/Faq'
import CtaBand from '@/components/sections/CtaBand'
import { business, faqs, photos, telHref, waHref, waMessages } from '@/data/site'
import { sellSteps } from '@/data/steps'

const priceFactors = [
  {
    icon: Snowflake,
    title: 'Type and tonnage',
    text: 'A 1.5 ton split, a 1 ton window and a 2 ton cassette are each priced differently.',
  },
  {
    icon: CalendarBlank,
    title: 'Age and brand',
    text: 'Newer units from well-known brands are worth more.',
  },
  {
    icon: Wrench,
    title: 'Condition',
    text: 'Working ACs with a healthy compressor get the best price. Non-working units still sell.',
  },
  {
    icon: Stack,
    title: 'Quantity',
    text: 'Selling several units together? We price the whole lot.',
  },
]

export default function SellAc() {
  return (
    <>
      <Seo
        title="Sell Old AC in Noida for the Best Price | Free Pickup | Suhan"
        description="Sell your old or non-working AC in Noida. We buy split, window, cassette, tower and ductable ACs of every brand, with free uninstallation and pickup. Get a price on WhatsApp."
      />

      <PageHero
        title="Sell your old AC without leaving home."
        lead="Split, window, cassette or tower, working or not. We quote, uninstall and pick it up for free."
        photo={photos.wallUnits}
      >
        <Button href={telHref} size="lg" icon={Phone}>
          Call {business.phoneShort}
        </Button>
        <Button href={waHref(waMessages.sell)} size="lg" variant="wa" icon={WhatsappLogo}>
          WhatsApp us
        </Button>
      </PageHero>

      <QuoteSection
        intent="sell"
        wizardTitle="Get my price"
        title="What decides your price"
        lead="No guesswork. These four things set what your AC is worth, and we will walk you through them."
        points={priceFactors}
      />

      <StackSteps
        title="From message to money"
        lead="You do not need to lift a thing. Our team handles the removal and the pickup."
        steps={sellSteps}
        cta={{ to: '/sell-old-ac#quote', label: 'Get my price' }}
      />

      <WhatWeBuy
        title="Everything we buy"
        lead="If it is an air conditioner, or the electricals around it, ask us for a price."
      />

      <Faq
        items={[faqs.nonWorking, faqs.freePickup, faqs.price, faqs.payment, faqs.types, faqs.area]}
      />

      <CtaBand />
    </>
  )
}
