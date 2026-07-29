import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCompanyExperience } from '../utils/companyExperience'
import './Hero.css'

import h3 from '../assets/images/h3.jpg'
import h2 from '../assets/images/h2.jpg'
import h1 from '../assets/images/h1.png'

const slideData = [
  {
    eyebrow: `Over ${getCompanyExperience()} Years of Excellence`,
    title: 'Manufacturing & Servicing of Fly Ash Bulkers',
    subtitle: 'Custom truck bodies engineered for durability and performance in demanding industrial environments.',
    ctaLabel: 'Learn More',
    image: h1,
    ctaAction: 'about',
  },
  {
    eyebrow: 'Premium Series',
    title: 'Premium Quality Trailers',
    subtitle: 'Engineered for heavy-duty performance and long-lasting durability on every road.',
    ctaLabel: 'Contact Us',
    image: h2,
    ctaAction: 'quote',
  },
  {
    eyebrow: 'Built to Your Spec',
    title: 'Custom Built Solutions',
    subtitle: 'Tailored to meet your specific requirements with precision engineering and quality materials.',
    ctaLabel: 'View Services',
    image: h3,
    ctaAction: 'services',
  },
]

const AUTOPLAY_DURATION = 5000

const Hero = () => {
  const navigate  = useNavigate()
  const timerRef  = useRef(null)
  const [active, setActive] = useState(0)
  const total = slideData.length
  
  // Swipe refs
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const minSwipeDistance = 50

  const goTo = useCallback((index) => {
    setActive((index + total) % total)
  }, [total])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % total)
    }, AUTOPLAY_DURATION)
  }, [total])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const handleNav = (dir) => {
    goTo(active + dir)
    startTimer()
  }

  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'services') navigate('/services')
    else if (sectionId === 'about') navigate('/about')
    else document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      // Swipe left - next slide
      handleNav(1)
    } else if (isRightSwipe) {
      // Swipe right - previous slide
      handleNav(-1)
    }
    
    // Reset values
    touchStartX.current = 0
    touchEndX.current = 0
  }

  return (
    <section
      id="home"
      className="hero"
      role="region"
      aria-label="Hero slideshow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slideData.map((slide, i) => {
        const isActive = i === active
        return (
          <div
            key={i}
            className={`hero-slide${isActive ? ' hero-slide--active' : ''}`}
            {...(!isActive ? { inert: true } : {})}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
          >
            <img
              src={slide.image}
              alt={`SR Bulkers ${slide.title}`}
              className="hero-slide__bg"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="hero-slide__overlay" aria-hidden="true" />
            <div className="hero-slide__content">
              <span className="hero-eyebrow">{slide.eyebrow}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <button
                className="hero-cta"
                onClick={() => handleScrollToSection(slide.ctaAction)}
              >
                {slide.ctaLabel}
                <span aria-hidden="true"> →</span>
              </button>
            </div>
          </div>
        )
      })}

      {/* Arrows — visible on desktop, touch-swipe handles mobile */}
      <button
        className="hero-arrow hero-arrow--prev"
        onClick={() => handleNav(-1)}
        aria-label="Previous slide"
      >‹</button>
      <button
        className="hero-arrow hero-arrow--next"
        onClick={() => handleNav(1)}
        aria-label="Next slide"
      >›</button>

      {/* Dot indicators */}
      <div className="hero-dots" role="tablist" aria-label="Slide indicators">
        {slideData.map((slide, i) => (
          <button
            key={i}
            role="tab"
            className={`hero-dot${i === active ? ' hero-dot--active' : ''}`}
            onClick={() => { goTo(i); startTimer() }}
            aria-label={`Slide ${i + 1}: ${slide.title}`}
            aria-selected={i === active}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero