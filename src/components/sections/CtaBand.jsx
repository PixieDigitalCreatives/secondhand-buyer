import { Phone, WhatsappLogo } from '@phosphor-icons/react'
import Button from '../ui/Button'
import ParallaxPhoto from '../ui/ParallaxPhoto'
import Reveal from '../ui/Reveal'
import { business, photos, telHref, waHref, waMessages } from '@/data/site'
import './CtaBand.scss'

export default function CtaBand({
  title = 'That old AC is worth money. Let’s get it sold.',
  text = 'Call or WhatsApp a photo. We will tell you the price and arrange a free pickup.',
  message = waMessages.sell,
  photo = photos.oldUnit,
}) {
  return (
    <section className="section cta-band-wrap">
      <div className="container">
        <Reveal className="bezel cta-band">
          <div className="bezel__core cta-band__core">
            <div className="cta-band__content">
              <h2 className="h2">{title}</h2>
              <p>{text}</p>
              <div className="btn-row">
                <Button href={telHref} icon={Phone} size="lg">
                  Call {business.phoneShort}
                </Button>
                <Button href={waHref(message)} variant="wa" icon={WhatsappLogo} size="lg">
                  WhatsApp us
                </Button>
              </div>
            </div>
            <div className="cta-band__media">
              <ParallaxPhoto
                {...photo}
                alt=""
                zoom
                amount={8}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
