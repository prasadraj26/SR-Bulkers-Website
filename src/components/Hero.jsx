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
  const trackRef = useRef(null)
  const autoPlayRef = useRef(null)
  const progressRaf = useRef(null)
  const startTimeRef = useRef(null)
  const navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSlides = slideData.length

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setActiveIndex(index)
    
    // Reset progress
    setProgress(0)
    
    // Update scroll position
    const track = trackRef.current
    if (track) {
      const slideWidth = track.offsetWidth
      track.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      })
    }
    
    // Reset transition lock after animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
  }, [isTransitioning])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    const nextIndex = (activeIndex + 1) % totalSlides
    goToSlide(nextIndex)
  }, [activeIndex, totalSlides, isTransitioning, goToSlide])

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides
    goToSlide(prevIndex)
  }, [activeIndex, totalSlides, isTransitioning, goToSlide])

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
    if (progressRaf.current) {
      cancelAnimationFrame(progressRaf.current)
      progressRaf.current = null
    }
  }, [])

  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true)
  }, [])

  // Progress bar animation
  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0)
      return
    }

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
    return () => {
      if (progressRaf.current) {
        cancelAnimationFrame(progressRaf.current)
      }
    }
  }, [isAutoPlaying, activeIndex])

  // Auto advance
  useEffect(() => {
    if (!isAutoPlaying) return
    
    autoPlayRef.current = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (activeIndex + 1) % totalSlides
        goToSlide(nextIndex)
      }
    }, AUTOPLAY_DURATION)
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, activeIndex, totalSlides, isTransitioning, goToSlide])

  // Scroll observer
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      if (isTransitioning) return
      
      const scrollLeft = track.scrollLeft
      const slideWidth = track.offsetWidth
      const newIndex = Math.round(scrollLeft / slideWidth)
      
      if (newIndex >= 0 && newIndex < totalSlides && newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    track.addEventListener('scroll', handleScroll)
    return () => track.removeEventListener('scroll', handleScroll)
  }, [activeIndex, totalSlides, isTransitioning])

  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'services') {
      navigate('/services')
    } else if (sectionId === 'about') {
      navigate('/about')
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDotClick = (index) => {
    if (index === activeIndex || isTransitioning) return
    pauseAutoPlay()
    goToSlide(index)
    setTimeout(resumeAutoPlay, 5000)
  }

  const handleArrowClick = (direction) => {
    pauseAutoPlay()
    if (direction === 'next') {
      handleNext()
    } else {
      handlePrev()
    }
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
        {slideData.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide${index === activeIndex ? ' is-active' : ''}`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="slide-bg"
              loading={index === activeIndex ? "eager" : "lazy"}
              onError={(e) => { e.target.style.backgroundColor = '#0a0f1e' }}
            />

            <div className="slide-content">
              <span className="slide-eyebrow">{slide.eyebrow}</span>

              <h1 className="slide-title">
                {slide.title.split(' ').map((word, i) => 
                  i === 0 ? <span key={i} className="accent">{word} </span> : word + ' '
                )}
              </h1>

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
        onClick={() => handleArrowClick('prev')}
        disabled={isTransitioning}
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        className="carousel-arrow next"
        onClick={() => handleArrowClick('next')}
        disabled={isTransitioning}
      >
        ›
      </button>

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
        <span className="counter-current">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <div className="counter-sep" />
        <span className="counter-total">
          {String(slideData.length).padStart(2, '0')}
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