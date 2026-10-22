import { ArrowUpRight, GoogleLogo, Star } from '@phosphor-icons/react'
import Reveal from '../ui/Reveal'
import ScrollText from '../ui/ScrollText'
import { business } from '@/data/site'
import './Review.scss'

// Real review from the business's existing site. Add more Google reviews to
// this list (exact wording, real names) as the owner approves them.
const reviews = [
  {
    quote:
      'The promptness in service is unmatched. Experienced and customer friendly staff made things easier. They are the best.',
    name: 'Ravi Chauhan',
    role: 'Customer',
  },
]

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function Review() {
  const r = reviews[0]
  return (
    <section className="section section--sunk review">
      <div className="container review__grid">
        <Reveal className="review__score">
          <span className="review__google">
            <GoogleLogo size={20} weight="bold" aria-hidden="true" />
            Google rating
          </span>
          <p className="review__number tabular">{business.rating.score}</p>
          <div className="review__stars" aria-label={`${business.rating.score} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={22} weight="fill" aria-hidden="true" />
            ))}
          </div>
          <p className="muted">From {business.rating.count} customer reviews</p>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Read the reviews
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal as="figure" delay={0.12} className="review__quote">
          <blockquote>
            <ScrollText text={`“${r.quote}”`} />
          </blockquote>
          <figcaption>
            <span className="review__avatar" aria-hidden="true">
              {initials(r.name)}
            </span>
            <span>
              <strong>{r.name}</strong>
              <span>{r.role}</span>
            </span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
