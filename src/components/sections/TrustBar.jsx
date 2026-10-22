import { Star } from '@phosphor-icons/react'
import CountUp from '../ui/CountUp'
import Reveal from '../ui/Reveal'
import { business } from '@/data/site'
import './TrustBar.scss'

const rating = Number(business.rating.score)

// Real numbers only: the Google rating and review count come from the
// business listing; the rest restate the offer.
export default function TrustBar() {
  return (
    <section className="trust" aria-label="Why customers choose Suhan">
      <div className="container">
        <Reveal className="bezel">
          <ul className="bezel__core trust__list">
            <li className="trust__item">
              <span className="trust__value">
                <CountUp value={rating} decimals={1} />
                <span className="trust__stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} weight="fill" />
                  ))}
                </span>
              </span>
              <span className="trust__label">Google rating</span>
            </li>
            <li className="trust__item">
              <span className="trust__value">
                <CountUp value={business.rating.count} />
              </span>
              <span className="trust__label">Customer reviews</span>
            </li>
            <li className="trust__item">
              <span className="trust__value tabular">₹0</span>
              <span className="trust__label">Uninstall and pickup</span>
            </li>
            <li className="trust__item">
              <span className="trust__value">Any</span>
              <span className="trust__label">Brand, type or condition</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
