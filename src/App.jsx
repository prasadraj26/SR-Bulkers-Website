import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
      delay: 100,
      easing: 'ease-in-out',
      mirror: true
    })
    
    // Refresh AOS on route change
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }, [])

  return <Home />
}

export default App