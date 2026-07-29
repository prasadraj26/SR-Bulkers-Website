import React, { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import GoToTop from '../components/GoToTop'

const About = lazy(() => import('../components/About'))
const Products = lazy(() => import('../components/Products'))
const Gallery = lazy(() => import('../components/Gallery'))
const QuoteForm = lazy(() => import('../components/QuoteForm'))
const Footer = lazy(() => import('../components/Footer'))

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="page-loader" />}>
        <About />
        <Products />
        <Gallery />
        <QuoteForm />
        <Footer />
      </Suspense>
      <GoToTop />
    </div>
  )
}

export default Home
