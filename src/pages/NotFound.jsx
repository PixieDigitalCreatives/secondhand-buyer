import { ArrowRight, House } from '@phosphor-icons/react'
import Seo from '@/components/ui/Seo'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="section">
      <Seo title="Page not found | Suhan" description="This page does not exist." />
      <div className="container section-head">
        <h1 className="h1">This page does not exist.</h1>
        <p className="lead">The link may be old. Here is where most people are headed.</p>
        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Button to="/sell-old-ac" iconRight={ArrowRight}>
            Get my price
          </Button>
          <Button to="/" variant="outline" icon={House}>
            Home
          </Button>
        </div>
      </div>
    </section>
  )
}
