import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Products from '../components/Products'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import GoToTop from '../components/GoToTop'

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Gallery />
      <Contact />
      <Footer />
      <GoToTop />
    </div>
  )
}

export default Home