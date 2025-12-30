import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import ManageGallery from './admin/ManageGallery'
import ManageServices from './admin/ManageServices'
import ProtectedRoute from './components/ProtectedRoute'

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/manage-gallery" element={<ProtectedRoute><ManageGallery /></ProtectedRoute>} />
        <Route path="/admin/manage-services" element={<ProtectedRoute><ManageServices /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App