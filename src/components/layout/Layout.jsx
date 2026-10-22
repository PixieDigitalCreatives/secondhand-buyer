import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { m } from 'motion/react'
import Header from './Header'
import Footer from './Footer'
import FloatingActions from './FloatingActions'
import ScrollProgress from '../ui/ScrollProgress'
import {
  scrollToElement,
  scrollToTop,
  startSmoothScroll,
  stopSmoothScroll,
} from '@/lib/smoothScroll'

// New page starts at the top; links with a #hash glide to that section.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    startSmoothScroll()
    return stopSmoothScroll
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) scrollToElement(el)
      })
      return () => cancelAnimationFrame(frame)
    }
    scrollToTop()
  }, [pathname, hash])

  return null
}

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <ScrollProgress />
      <Header />
      <m.main
        id="main"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        <Outlet />
      </m.main>
      <Footer />
      <FloatingActions />
    </>
  )
}
