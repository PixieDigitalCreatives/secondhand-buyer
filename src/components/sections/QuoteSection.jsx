import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import QuoteWizard from './QuoteWizard'
import './QuoteSection.scss'

// Explanation on the left, the form on the right. The section id is the
// target for every "Get my price" link on the site.
export default function QuoteSection({
  id = 'quote',
  title,
  lead,
  points,
  intent,
  wizardTitle,
  sunk = true,
}) {
  return (
    <section id={id} className={`section quote-sec${sunk ? ' section--sunk' : ''}`}>
      <div className="container quote-sec__grid">
        <div className="quote-sec__copy">
          <SectionHead title={title} lead={lead} />
          <ul className="quote-sec__points">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.06 * i} className="quote-sec__point">
                <span className="quote-sec__icon" aria-hidden="true">
                  <p.icon />
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="quote-sec__form">
          <QuoteWizard intent={intent} title={wizardTitle} />
        </Reveal>
      </div>
    </section>
  )
}
