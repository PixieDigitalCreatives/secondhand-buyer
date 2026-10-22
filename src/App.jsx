import { Route, Routes } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { IconContext } from '@phosphor-icons/react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import SellAc from './pages/SellAc'
import BuyAc from './pages/BuyAc'
import Commercial from './pages/Commercial'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Light, precise strokes by default; buttons opt into a heavier weight.
const iconDefaults = { size: 22, weight: 'light' }

export default function App() {
  return (
    // LazyMotion + `m` components ship only the animation features we use.
    // reducedMotion="user" turns every animation into an instant change for
    // people with prefers-reduced-motion set.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <IconContext.Provider value={iconDefaults}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="sell-old-ac" element={<SellAc />} />
              <Route path="buy-used-ac" element={<BuyAc />} />
              <Route path="commercial-ac-dismantling" element={<Commercial />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </IconContext.Provider>
      </MotionConfig>
    </LazyMotion>
  )
}
