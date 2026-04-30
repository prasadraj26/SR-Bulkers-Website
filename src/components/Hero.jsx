import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

import traillerTank from '../assets/images/trailler tank.webp'
import sideImage    from '../assets/images/side.webp'
import bul2         from '../assets/images/bul2.webp'

const slideData = [
  {
    eyebrow: 'Over 13 Years of Excellence',
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

const AUTOPLAY_DURATION = 4000

const Hero = () => {
  const autoPlayRef   = useRef(null)
  const progressRaf   = useRef(null)
  const startTimeRef  = useRef(null)
  const pauseTimerRef = useRef(null)
  const navigate      = useNavigate()

  const [activeIndex,    setActiveIndex]    = useState(0)
  const [isAutoPlaying,  setIsAutoPlaying]  = useState(true)
  const [progress,       setProgress]       = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction,      setDirection]      = useState(1) // 1 = forward, -1 = back

  const totalSlides = slideData.length

  // ─── 3D position helper ──────────────────────────────────────────────
  const getSlideStyle = useCallback((index) => {
    let offset = index - activeIndex
    // shortest path around the loop
    if (offset > totalSlides / 2)  offset -= totalSlides
    if (offset < -totalSlides / 2) offset += totalSlides

    const absOff = Math.abs(offset)

    if (offset === 0) {
      // Centre / active
      return {
        transform:  'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        opacity:    1,
        filter:     'brightness(1)',
        zIndex:     10,
        pointerEvents: 'none',
      }
    } else if (offset === 1 || offset === -(totalSlides - 1)) {
      // Right neighbour
      return {
        transform:  'translateX(62%) translateZ(-160px) rotateY(-22deg) scale(0.82)',
        opacity:    0.6,
        filter:     'brightness(0.55)',
        zIndex:     5,
        cursor:     'pointer',
      }
    } else if (offset === -1 || offset === (totalSlides - 1)) {
      // Left neighbour
      return {
        transform:  'translateX(-62%) translateZ(-160px) rotateY(22deg) scale(0.82)',
        opacity:    0.6,
        filter:     'brightness(0.55)',
        zIndex:     5,
        cursor:     'pointer',
      }
    } else {
      // Hidden / far
      return {
        transform:  `translateX(${offset > 0 ? '90%' : '-90%'}) translateZ(-280px) scale(0.65)`,
        opacity:    0,
        zIndex:     1,
        pointerEvents: 'none',
      }
    }
  }, [activeIndex, totalSlides])

  // ─── Navigation ──────────────────────────────────────────────────────
  const goToSlide = useCallback((index, dir = 1) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(dir)
    setActiveIndex(index)
    setProgress(0)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    goToSlide((activeIndex + 1) % totalSlides, 1)
  }, [activeIndex, totalSlides, isTransitioning, goToSlide])

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    goToSlide((activeIndex - 1 + totalSlides) % totalSlides, -1)
  }, [activeIndex, totalSlides, isTransitioning, goToSlide])

  // ─── Auto-play controls ───────────────────────────────────────────────
  const pauseAutoPlay = useCallback(() => {
    clearTimeout(pauseTimerRef.current)
    setIsAutoPlaying(false)
    if (autoPlayRef.current)  { clearInterval(autoPlayRef.current); autoPlayRef.current = null }
    if (progressRaf.current)  { cancelAnimationFrame(progressRaf.current); progressRaf.current = null }
    setProgress(0)
  }, [])

  const resumeAutoPlay = useCallback(() => setIsAutoPlaying(true), [])

  // ─── Progress bar ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAutoPlaying) { setProgress(0); return }
    let rafId
    const start = performance.now()
    const tick = (now) => {
      const pct = Math.min(((now - start) / AUTOPLAY_DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isAutoPlaying, activeIndex])

  // ─── Auto-advance ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAutoPlaying) return
    autoPlayRef.current = setInterval(() => {
      if (!isTransitioning) {
        goToSlide((activeIndex + 1) % totalSlides, 1)
      }
    }, AUTOPLAY_DURATION)
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [isAutoPlaying, activeIndex, totalSlides, isTransitioning, goToSlide])

  // ─── Keyboard navigation ──────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { pauseAutoPlay(); handleNext(); setTimeout(resumeAutoPlay, 5000) }
      if (e.key === 'ArrowLeft')  { pauseAutoPlay(); handlePrev(); setTimeout(resumeAutoPlay, 5000) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev, pauseAutoPlay, resumeAutoPlay])

  // ─── Intersection Observer for Autoplay ───────────────────────────────
  useEffect(() => {
    const section = document.getElementById('home')
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) resumeAutoPlay()
        else pauseAutoPlay()
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [pauseAutoPlay, resumeAutoPlay])

  // ─── Section routing ──────────────────────────────────────────────────
  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'services') navigate('/services')
    else if (sectionId === 'about') navigate('/about')
    else document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDotClick = (index) => {
    if (index === activeIndex || isTransitioning) return
    pauseAutoPlay()
    goToSlide(index, index > activeIndex ? 1 : -1)
    setTimeout(resumeAutoPlay, 5000)
  }

  const handleArrowClick = (dir) => {
    pauseAutoPlay()
    dir === 'next' ? handleNext() : handlePrev()
    setTimeout(resumeAutoPlay, 5000)
  }

  // ─── Render ───────────────────────────────────────────────────────────
  return (
    <section
      id="home"
      className="hero-section"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onTouchStart={pauseAutoPlay}
      onTouchEnd={() => {
        pauseTimerRef.current = setTimeout(resumeAutoPlay, 1200)
      }}
    >
      {/* Left accent spine */}
      <div className="slide-index-line" />

      {/* 3-D scene */}
      <div className="carousel-3d-scene">
        {slideData.map((slide, index) => {
          const style = getSlideStyle(index)
          const isActive = index === activeIndex
          const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides
          const nextIndex = (activeIndex + 1) % totalSlides
          const isVisible = [activeIndex, prevIndex, nextIndex].includes(index)

          return (
            <div
              key={index}
              className={`carousel-3d-slide${isActive ? ' is-active' : ''}`}
              style={style}
              onClick={() => {
                if (!isActive) {
                  const offset = ((index - activeIndex) + totalSlides) % totalSlides
                  const dir = offset <= totalSlides / 2 ? 1 : -1
                  pauseAutoPlay()
                  goToSlide(index, dir)
                  setTimeout(resumeAutoPlay, 5000)
                }
              }}
            >
              {isVisible && (
                <>
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="slide-bg"
                    loading={isActive ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isActive ? 'high' : 'low'}
                    onError={(e) => { e.target.style.backgroundColor = '#0a0f1e' }}
                  />

                  {/* Gradient overlay */}
                  <div className="slide-gradient" />

                  {/* Content (only shown for active) */}
                  <div className={`slide-content${isActive ? ' content-visible' : ''}`}>
                    <span className="slide-eyebrow">{slide.eyebrow}</span>

                    <h1 className="slide-title">
                      {slide.title.split(' ').map((word, i) =>
                        i === 0
                          ? <span key={i} className="accent">{word} </span>
                          : word + ' '
                      )}
                    </h1>

                    <p className="slide-subtitle">{slide.subtitle}</p>

                    <button
                      className="slide-cta"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleScrollToSection(slide.ctaAction)
                        pauseAutoPlay()
                        setTimeout(resumeAutoPlay, 5000)
                      }}
                    >
                      {slide.ctaLabel}
                      <span className="cta-arrow">→</span>
                    </button>
                  </div>

                  {/* Side-slide click hint icon */}
                  {!isActive && (
                    <div className="slide-click-hint">
                      {((index - activeIndex + totalSlides) % totalSlides) <= totalSlides / 2 ? '›' : '‹'}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        className="carousel-arrow prev"
        onClick={() => handleArrowClick('prev')}
        disabled={isTransitioning}
      >‹</button>
      <button
        aria-label="Next slide"
        className="carousel-arrow next"
        onClick={() => handleArrowClick('next')}
        disabled={isTransitioning}
      >›</button>

      {/* Dot indicators */}
      <div className="carousel-indicators">
        {slideData.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot${index === activeIndex ? ' active' : ''}`}
            onClick={() => handleDotClick(index)}
            disabled={isTransitioning}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="slide-counter">
        <span className="counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
        <div className="counter-sep" />
        <span className="counter-total">{String(slideData.length).padStart(2, '0')}</span>
      </div>

      {/* Progress bar */}
      <div className="hero-progress">
        <div className="hero-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}

export default Hero
