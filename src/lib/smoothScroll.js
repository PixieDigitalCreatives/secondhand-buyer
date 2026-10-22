import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// One Lenis instance for the whole app. Lenis drives the real window scroll
// position, so Motion's useScroll and whileInView keep working unchanged.
let lenis = null

const HEADER_OFFSET = -96

export function startSmoothScroll() {
  if (lenis) return lenis
  lenis = new Lenis({
    autoRaf: true,
    // Heavy, glassy feel on wheel and trackpad; touch keeps native scrolling.
    lerp: 0.085,
    smoothWheel: true,
    syncTouch: false,
    // In-page #links glide to their section and clear the floating header.
    anchors: { offset: HEADER_OFFSET },
    stopInertiaOnNavigate: true,
  })
  return lenis
}

export function stopSmoothScroll() {
  lenis?.destroy()
  lenis = null
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo({ top: 0, behavior: 'instant' })
}

export function scrollToElement(el) {
  if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET })
  else el.scrollIntoView({ block: 'start' })
}

// Freeze page scroll while an overlay (mobile menu) is open.
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
