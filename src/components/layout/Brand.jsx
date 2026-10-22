import { Link } from 'react-router-dom'
import { Snowflake } from '@phosphor-icons/react'
import { business } from '@/data/site'
import './Brand.scss'

export default function Brand({ className = '' }) {
  return (
    <Link to="/" className={`brand ${className}`} aria-label={`${business.name}, home`}>
      <span className="brand__mark" aria-hidden="true">
        <Snowflake size={22} weight="bold" />
      </span>
      <span className="brand__text">
        <span className="brand__name">{business.short}</span>
        <span className="brand__tagline">{business.tagline}</span>
      </span>
    </Link>
  )
}
