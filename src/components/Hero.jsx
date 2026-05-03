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

const AUTOPLAY_DURATION = 5000

const Hero = () => {
  const navigate  = useNavigate()
  const timerRef  = useRef(null)
  const [active, setActive] = useState(0)
  const total = slideData.length

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

  return (
    <section
      id="home"
      className="hero"
      role="region"
      aria-label="Hero slideshow"
    >
      {slideData.map((slide, i) => {
        const isActive = i === active
        return (
          <div
            key={i}
            className={`hero-slide${isActive ? ' hero-slide--active' : ''}`}
            // 'inert' blocks focus AND hides from screen readers — the correct fix.
            // aria-hidden="true" on a parent with focusable children causes the console warning.
            {...(!isActive ? { inert: true } : {})}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
          >
            <img
              src={slide.image}
              alt=""
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