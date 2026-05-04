import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseFloat(e.target.dataset.delay || 0)
          setTimeout(() => e.target.classList.add('is-visible'), delay * 1000)
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
