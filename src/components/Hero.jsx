import { useEffect, useMemo, useRef, useState } from 'react'
import './Hero.css'

// Import your local images
import traillerTank from '../assets/images/trailler tank.png'
import sideImage from '../assets/images/side.png'
import bul2 from '../assets/images/bul2.png'

const slideData = [
  {
    title: 'Manufacturing & Servicing of fly ash bulkers',
    subtitle: 'Custom truck bodies engineered for durability and performance. Over 12+ years of excellence in truck manufacturing.',
    ctaLabel: 'View Services',
    image: traillerTank,
    ctaAction: 'services', // Store the ID instead of function
  },
  {
    title: 'Premium Quality Trailers',
    subtitle: 'Engineered for heavy-duty performance and long-lasting durability.',
    ctaLabel: 'Contact Us',
    image: sideImage,
    ctaAction: 'quote',
  },
  {
    title: 'Custom Built Solutions',
    subtitle: 'Tailored to meet your specific requirements with precision engineering.',
    ctaLabel: 'Learn More',
    image: bul2,
    ctaAction: 'about',
  },
]

const Hero = () => {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef(null)

  const slides = useMemo(() => slideData, [])

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
      { root: track, threshold: 0.6 }
    )

    slidesEl.forEach((slide) => observer.observe(slide))

    return () => observer.disconnect()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext()
      }, 3000) // 3 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, activeIndex])

  const scrollTo = (index) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: track.offsetWidth * index, behavior: 'smooth' })
  }

  const handleNext = () => {
    scrollTo(activeIndex === slides.length - 1 ? 0 : activeIndex + 1)
  }

  const handlePrev = () => {
    scrollTo(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)
  }

  // Safe scroll function with error handling
  const handleScrollToSection = (sectionId) => {
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        console.log(`Section with id "${sectionId}" not found yet`)
        // Optionally, you could wait for the element to appear
        // or navigate to a different page
      }
    } catch (error) {
      console.error('Error scrolling to section:', error)
    }
  }

  // Pause auto-play on user interaction
  const handleUserInteraction = () => {
    setIsAutoPlaying(false)
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  return (
    <section 
      id="home" 
      className="hero-section" 
      data-purpose="hero-image-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        ref={trackRef}
        id="hero-carousel"
        className="carousel-track"
        data-purpose="carousel-track"
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide" data-purpose="carousel-slide">
            <img
              alt={`Slide ${index + 1} Background`}
              className="slide-bg"
              src={slide.image}
              onError={(e) => {
                console.error('Error loading image:', slide.image)
                e.target.style.backgroundColor = '#333' // Fallback color
              }}
            />
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button 
                className="slide-cta" 
                onClick={() => {
                  handleScrollToSection(slide.ctaAction)
                  handleUserInteraction()
                }}
              >
                {slide.ctaLabel}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous slide"
        className="carousel-arrow prev"
        id="prevBtn"
        onClick={() => {
          handlePrev()
          handleUserInteraction()
        }}
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        className="carousel-arrow next"
        id="nextBtn"
        onClick={() => {
          handleNext()
          handleUserInteraction()
        }}
      >
        ›
      </button>

      <div className="carousel-indicators" data-purpose="carousel-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
            data-slide={index}
            onClick={() => {
              scrollTo(index)
              handleUserInteraction()
            }}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className={`autoplay-indicator ${isAutoPlaying ? 'active' : ''}`}>
        <div className="autoplay-progress"></div>
      </div>
    </section>
  )
}

export default Hero