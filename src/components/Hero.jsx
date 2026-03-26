import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

import traillerTank from '../assets/images/trailler tank.png'
import sideImage    from '../assets/images/side.png'
import bul2         from '../assets/images/bul2.png'

const slideData = [
  {
    eyebrow: 'Over 13 Years of Excellence',
    title: 'Manufacturing & Servicing of Fly Ash Bulkers',
    subtitle: 'Custom truck bodies engineered for durability and performance in demanding industrial environments.',
    ctaLabel: 'Learn More',
    image: bul2,
    ctaAction: 'about',
    tag: 'Flagship',
  },
  {
    eyebrow: 'Premium Series',
    title: 'Premium Quality Trailers',
    subtitle: 'Engineered for heavy-duty performance and long-lasting durability on every road.',
    ctaLabel: 'Contact Us',
    image: sideImage,
    ctaAction: 'quote',
    tag: 'Best Seller',
  },
  {
    eyebrow: 'Built to Your Spec',
    title: 'Custom Built Solutions',
    subtitle: 'Tailored to meet your specific requirements with precision engineering and quality materials.',
    ctaLabel: 'View Services',
    image: traillerTank,
    ctaAction: 'services',
    tag: 'Custom',
  },
]

const AUTOPLAY_DURATION = 4500

const Hero = () => {
  const autoPlayRef  = useRef(null)
  const progressRaf  = useRef(null)
  const startTimeRef = useRef(null)
  const navigate     = useNavigate()

  const [activeIndex,   setActiveIndex]   = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress,      setProgress]      = useState(0)
  const [animKey,       setAnimKey]       = useState(0)

  const total = slideData.length

  const goTo = useCallback((index) => {
    setActiveIndex(index)
    setAnimKey(k => k + 1)
  }, [])

  const handleNext = useCallback(() => {
    goTo(prev => {
      const n = (prev + 1) % total
      goTo(n)
      return n
    })
    setActiveIndex(prev => (prev + 1) % total)
    setAnimKey(k => k + 1)
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + total) % total)
    setAnimKey(k => k + 1)
  }, [total])

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
    clearInterval(autoPlayRef.current)
    cancelAnimationFrame(progressRaf.current)
    setProgress(0)
  }, [])

  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true)
  }, [])

  /* Progress bar RAF */
  useEffect(() => {
    if (!isAutoPlaying) { setProgress(0); return }
    startTimeRef.current = performance.now()
    const tick = (now) => {
      const pct = Math.min(((now - startTimeRef.current) / AUTOPLAY_DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) progressRaf.current = requestAnimationFrame(tick)
    }
    progressRaf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRaf.current)
  }, [isAutoPlaying, activeIndex])

  /* Auto-advance */
  useEffect(() => {
    if (!isAutoPlaying) return
    autoPlayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total)
      setAnimKey(k => k + 1)
    }, AUTOPLAY_DURATION)
    return () => clearInterval(autoPlayRef.current)
  }, [isAutoPlaying, total])

  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'services') {
      navigate('/services')
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDotClick = (index) => {
    setActiveIndex(index)
    setAnimKey(k => k + 1)
    pauseAutoPlay()
    setTimeout(resumeAutoPlay, 5000)
  }

  /* Compute prev/next indices */
  const prevIndex = (activeIndex - 1 + total) % total
  const nextIndex = (activeIndex + 1) % total

  const getCardClass = (index) => {
    if (index === activeIndex) return 'hero-card is-active'
    if (index === prevIndex)   return 'hero-card is-prev'
    if (index === nextIndex)   return 'hero-card is-next'
    return 'hero-card is-hidden'
  }

  return (
    <section
      id="home"
      className="hero-section"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Ambient background — blurred version of active slide */}
      <div
        className="hero-ambient"
        style={{ backgroundImage: `url(${slideData[activeIndex].image})` }}
      />

      {/* Top bar */}
      <div className="hero-topbar">
        <span className="hero-label">Theme</span>
        <span className="hero-counter-top">
          <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
          <span>/{String(total).padStart(2, '0')}</span>
        </span>
      </div>

      {/* 3D Card Stage */}
      <div className="hero-stage">
        {/* Prev arrow */}
        <button
          className="hero-arrow hero-arrow--prev"
          aria-label="Previous"
          onClick={() => { handlePrev(); pauseAutoPlay(); setTimeout(resumeAutoPlay, 5000) }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Cards */}
        <div className="hero-cards">
          {slideData.map((slide, index) => (
            <div
              key={index}
              className={getCardClass(index)}
              onClick={() => {
                if (index !== activeIndex) {
                  setActiveIndex(index)
                  setAnimKey(k => k + 1)
                  pauseAutoPlay()
                  setTimeout(resumeAutoPlay, 5000)
                }
              }}
            >
              {/* Card image */}
              <div className="hero-card__img-wrap">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero-card__img"
                />
                <div className="hero-card__overlay" />
              </div>

              {/* Card tag badge */}
              <div className="hero-card__tag">{slide.tag}</div>

              {/* Card text — only visible on active */}
              {index === activeIndex && (
                <div className="hero-card__content" key={animKey}>
                  <span className="hero-card__eyebrow">{slide.eyebrow}</span>
                  <h1 className="hero-card__title">{slide.title}</h1>
                  <p className="hero-card__subtitle">{slide.subtitle}</p>
                  <button
                    className="hero-card__cta"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleScrollToSection(slide.ctaAction)
                      pauseAutoPlay()
                      setTimeout(resumeAutoPlay, 5000)
                    }}
                  >
                    {slide.ctaLabel}
                    <span className="hero-card__cta-arrow">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}

              {/* Side card label (prev/next) */}
              {index !== activeIndex && (
                <div className="hero-card__side-label">{slide.title}</div>
              )}
            </div>
          ))}
        </div>

        {/* Next arrow */}
        <button
          className="hero-arrow hero-arrow--next"
          aria-label="Next"
          onClick={() => { handleNext(); pauseAutoPlay(); setTimeout(resumeAutoPlay, 5000) }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="hero-dots">
        {slideData.map((_, index) => (
          <button
            key={index}
            className={`hero-dot${index === activeIndex ? ' is-active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="hero-progress">
        <div className="hero-progress__fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Left accent spine */}
      <div className="hero-spine" />
    </section>
  )
}

export default Hero