import MaskText from './MaskText'
import Reveal from './Reveal'

// Standard section header: masked word-by-word headline, lead fades in after.
export default function SectionHead({
  title,
  accent,
  lead,
  eyebrow,
  center = false,
  className = '',
}) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal y={16} className="section-head__eyebrow">
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <MaskText as="h2" className="h2" text={title} accent={accent} />
      {lead && (
        <Reveal as="p" delay={0.25} y={20} className="lead">
          {lead}
        </Reveal>
      )}
    </div>
  )
}
