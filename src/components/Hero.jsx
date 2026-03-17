import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

import traillerTank from '../assets/images/trailler tank.png'
import sideImage    from '../assets/images/side.png'
import bul2         from '../assets/images/bul2.png'

const slideData = [
  {
    eyebrow: 'Over 12 Years of Excellence',
    title: 'Manufacturing & Servicing of Fly Ash Bulkers',
    subtitle: 'Custom truck bodies engineered for durability and performance in demanding industrial environments.',
    ctaLabel: 'Learn More',
    image: bul2,
    ctaAction: 'about',
  },
  {
    eyebrow: 'Premium Series',
    title: 'Premium Quality Trailers',
    subtitle: 'Engineered for heavy-duty performance and long-lasting durability on every road.',
    ctaLabel: 'Contact Us',
    image: sideImage,
    ctaAction: 'quote',
  },
  {
    eyebrow: 'Built to Your Spec',
    title: 'Custom Built Solutions',
    subtitle: 'Tailored to meet your specific requirements with precision engineering and quality materials.',
    ctaLabel: 'View Services',
    image: traillerTank,
    ctaAction: 'services',
  },
]

const AUTOPLAY_DURATION = 4000 // ms

const Hero = () => {
  const trackRef        = useRef(null)
  const progressRef     = useRef(null)
  const autoPlayRef     = useRef(null)
  const progressRaf     = useRef(null)
  const startTimeRef    = useRef(null)

  const navigate = useNavigate()

  const [activeIndex,    setActiveIndex]    = useState(0)
  const [isAutoPlaying,  setIsAutoPlaying]  = useState(true)
  const [progress,       setProgress]       = useState(0)

  const slides = useMemo(() => slideData, [])

  /* ── scroll to slide ── */
  const scrollTo = useCallback((index) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: track.offsetWidth * index, behavior: 'smooth' })
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex(prev => {
      const next = prev === slides.length - 1 ? 0 : prev + 1
      scrollTo(next)
      return next
    })
  }, [slides.length, scrollTo])

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => {
      const next = prev === 0 ? slides.length - 1 : prev - 1
      scrollTo(next)
      return next
    })
  }, [slides.length, scrollTo])

  /* ── pause / resume helpers ── */
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    clearInterval(autoPlayRef.current)
    cancelAnimationFrame(progressRaf.current)
  }

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true)
  }

  /* ── progress bar animation ── */
  useEffect(() => {
    if (!isAutoPlaying) { setProgress(0); return }

    startTimeRef.current = performance.now()

    const tick = (now) => {
      const elapsed = now - startTimeRef.current
      const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        progressRaf.current = requestAnimationFrame(tick)
      }
    }

    progressRaf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRaf.current)
  }, [isAutoPlaying, activeIndex])

  /* ── auto-advance ── */
  useEffect(() => {
    if (!isAutoPlaying) return
    autoPlayRef.current = setInterval(handleNext, AUTOPLAY_DURATION)
    return () => clearInterval(autoPlayRef.current)
  }, [isAutoPlaying, handleNext])

  /* ── IntersectionObserver to track which slide is visible ── */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const slidesEl = Array.from(track.children)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slidesEl.indexOf(entry.target)
            if (index >= 0) setActiveIndex(index)
          }
        })
      },
      { root: track, threshold: 0.55 }
    )

    slidesEl.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'services') {
      navigate('/services')
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDotClick = (index) => {
    scrollTo(index)
    setActiveIndex(index)
    pauseAutoPlay()
    setTimeout(resumeAutoPlay, 5000)
  }

  return (
    <section
      id="home"
      className="hero-section"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Left accent line */}
      <div className="slide-index-line" />

      {/* Carousel track */}
      <div ref={trackRef} className="carousel-track">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide${index === activeIndex ? ' is-active' : ''}`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="slide-bg"
              onError={(e) => { e.target.style.backgroundColor = '#0a0f1e' }}
            />

            <div className="slide-content">
              <span className="slide-eyebrow">{slide.eyebrow}</span>

              {/* h1 — scoped overrides in Hero.css via .hero-section .slide-title */}
              <h1 className="slide-title">{slide.title}</h1>

              <p className="slide-subtitle">{slide.subtitle}</p>

              <button
                className="slide-cta"
                onClick={() => {
                  handleScrollToSection(slide.ctaAction)
                  pauseAutoPlay()
                  setTimeout(resumeAutoPlay, 5000)
                }}
              >
                {slide.ctaLabel}
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        className="carousel-arrow prev"
        onClick={() => { handlePrev(); pauseAutoPlay(); setTimeout(resumeAutoPlay, 5000) }}
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        className="carousel-arrow next"
        onClick={() => { handleNext(); pauseAutoPlay(); setTimeout(resumeAutoPlay, 5000) }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator-dot${index === activeIndex ? ' active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="slide-counter">
        <span className="counter-current">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <div className="counter-sep" />
        <span className="counter-total">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div className="hero-progress">
        <div
          className="hero-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  )
}

export default Hero