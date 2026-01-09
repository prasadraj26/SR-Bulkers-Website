import { motion } from 'framer-motion'
import { FaTruck, FaBox, FaTrailer, FaWrench, FaPaintRoller, FaTools } from 'react-icons/fa'
import './Services.css'

const Services = () => {
  const services = [
    { 
      icon: <FaTruck />, 
      title: 'Custom Truck Body Building',
      description: 'Tailored truck bodies designed to meet your specific business requirements and load capacities.'
    },
    { 
      icon: <FaBox />, 
      title: 'Cargo & Container Bodies',
      description: 'Secure and spacious cargo bodies with advanced locking systems and weather protection.'
    },
    { 
      icon: <FaTrailer />, 
      title: 'Trailer Manufacturing',
      description: 'Heavy-duty trailers engineered for maximum payload and road safety compliance.'
    },
    { 
      icon: <FaTools />, 
      title: 'Tipper & Hydraulic Bodies',
      description: 'Robust tipper bodies with reliable hydraulic systems for efficient material handling.'
    },
    { 
      icon: <FaWrench />, 
      title: 'Truck Repair & Modification',
      description: 'Comprehensive repair services and custom modifications to enhance truck performance.'
    },
    { 
      icon: <FaPaintRoller />, 
      title: 'Painting & Finishing',
      description: 'Professional painting services with corrosion-resistant coatings and custom graphics.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="services" className="dark-section services-section">

      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Our Services </h2>
          <p className="section-subtitle">
            Comprehensive truck manufacturing and maintenance services designed to keep your fleet running at peak performance.
          </p>
        </div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services