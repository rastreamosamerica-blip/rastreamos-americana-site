import './style.css'

/* ============================================================
   NAVBAR — scroll effect + mobile toggle
   ============================================================ */
const navbar = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled')
  else navbar.classList.remove('scrolled')
})

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open')
  navLinks.classList.toggle('open')
})

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open')
    navLinks.classList.remove('open')
  })
})

/* ============================================================
   SMOOTH SCROLL — offset for fixed navbar
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href')
    if (targetId === '#' || targetId.length < 2) return
    const target = document.querySelector(targetId)
    if (!target) return
    e.preventDefault()
    const offset = 72
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  })
})

/* ============================================================
   ACTIVE NAV LINK — highlight on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id], header[id]')
const navLinkEls = navLinks.querySelectorAll('a')

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        navLinkEls.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
        })
      }
    })
  },
  { rootMargin: '-40% 0px -55% 0px' }
)

sections.forEach((s) => sectionObserver.observe(s))

/* ============================================================
   SCROLL ANIMATIONS — IntersectionObserver
   ============================================================ */
const animateEls = document.querySelectorAll('[data-animate]')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.animateDelay || 0
        setTimeout(() => entry.target.classList.add('visible'), Number(delay))
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)

animateEls.forEach((el) => observer.observe(el))

/* ============================================================
   COUNTER ANIMATION — hero stats
   ============================================================ */
const counters = document.querySelectorAll('[data-count]')

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const target = Number(el.dataset.count)
      const duration = 1800
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target).toString()
        if (progress < 1) requestAnimationFrame(tick)
        else el.textContent = target.toString()
      }
      requestAnimationFrame(tick)
      counterObserver.unobserve(el)
    })
  },
  { threshold: 0.5 }
)

counters.forEach((c) => counterObserver.observe(c))

/* ============================================================
   TIMELINE — progressive line + active steps
   ============================================================ */
const timelineLine = document.getElementById('timelineLine')
const timelineSteps = document.querySelectorAll('.timeline-step')

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timelineLine.classList.add('active')
        timelineSteps.forEach((step, i) => {
          setTimeout(() => step.classList.add('active'), i * 200)
        })
        timelineObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 }
)

if (timelineLine) timelineObserver.observe(timelineLine.parentElement)

/* ============================================================
   HERO SCROLL INDICATOR — fade on scroll
   ============================================================ */
const heroScroll = document.getElementById('heroScroll')
window.addEventListener('scroll', () => {
  if (heroScroll) {
    heroScroll.style.opacity = Math.max(0, 1 - window.scrollY / 300).toString()
  }
})

/* ============================================================
   CTA — WhatsApp redirect (form removed)
   ============================================================ */

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const footerYear = document.getElementById('footerYear')
if (footerYear) footerYear.textContent = new Date().getFullYear()

/* ============================================================
   GA4 — WhatsApp click conversion tracking
   ============================================================ */
document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click')
    }
  })
})
