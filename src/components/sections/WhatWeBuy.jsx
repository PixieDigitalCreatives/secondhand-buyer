import { Lightning, Snowflake, Warehouse } from '@phosphor-icons/react'
import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import ParallaxPhoto from '../ui/ParallaxPhoto'
import { brands, buyClusters, photos } from '@/data/site'
import './WhatWeBuy.scss'

const icons = { ac: Snowflake, dismantling: Warehouse, electricals: Lightning }

function Cluster({ cluster, featured = false, delay = 0, photo }) {
  const Icon = icons[cluster.key]
  return (
    <Reveal
      delay={delay}
      className={`bezel buy-cluster${featured ? ' buy-cluster--featured' : ''}`}
    >
      <div className="bezel__core buy-cluster__core">
        {featured && (
          <div className="buy-cluster__media">
            <ParallaxPhoto {...photo} amount={10} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        )}
        <div className="buy-cluster__body">
          <div className="buy-cluster__head">
            <span className="buy-cluster__icon" aria-hidden="true">
              <Icon />
            </span>
            <div>
              <h3 className="h3">{cluster.title}</h3>
              <p className="muted">{cluster.text}</p>
            </div>
          </div>
          <ul className="tag-list">
            {cluster.items.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

export default function WhatWeBuy({
  title = 'If it cools, we buy it',
  lead,
  showBrands = true,
  photo = photos.wallUnits,
}) {
  const [ac, ...rest] = buyClusters
  return (
    <section className="section what-we-buy">
      <div className="container">
        <SectionHead title={title} lead={lead} />

        <div className="what-we-buy__grid">
          <Cluster cluster={ac} featured photo={photo} />
          <div className="what-we-buy__side">
            {rest.map((c, i) => (
              <Cluster key={c.key} cluster={c} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {showBrands && (
        <div className="brands" aria-label="Brands we buy and sell">
          <p className="brands__label container">Every brand, including</p>
          <div className="brands__viewport">
            <ul className="brands__track">
              {brands.map((b) => (
                <li key={b}>{b}</li>
              ))}
              {brands.map((b) => (
                <li key={`${b}-copy`} aria-hidden="true">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
