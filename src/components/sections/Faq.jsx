import { useId, useState } from 'react'
import { Phone, Plus } from '@phosphor-icons/react'
import Reveal from '../ui/Reveal'
import { business, telHref } from '@/data/site'
import './Faq.scss'

function Item({ q, a, open, onToggle }) {
  const id = useId()
  return (
    <div className={`faq__item${open ? ' is-open' : ''}`}>
      <h3>
        <button
          type="button"
          className="faq__q"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
        >
          <span>{q}</span>
          <Plus size={20} weight="bold" className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className="faq__panel"
        inert={!open}
      >
        <div>
          <p>{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq({ title = 'Questions people ask us', items }) {
  const [open, setOpen] = useState(0)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="section faq">
      <div className="container faq__grid">
        <Reveal className="faq__intro">
          <h2 className="h2">{title}</h2>
          <p className="lead">Anything else? We are happy to explain on the phone.</p>
          <a href={telHref} className="text-link">
            <Phone size={18} weight="bold" aria-hidden="true" />
            Call {business.phoneShort}
          </a>
        </Reveal>

        <Reveal delay={0.1} className="faq__list">
          {items.map((f, i) => (
            <Item
              key={f.q}
              {...f}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </div>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </section>
  )
}
