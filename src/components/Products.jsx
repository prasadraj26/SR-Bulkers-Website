import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Products.css'

import sideImg from '../assets/images/og.png'
import siloImg from '../assets/images/silo.webp'

const Products = () => {

  const products = [
    {
      name: 'BULKERS',
      description: 'Heavy-duty bulkers with hydraulic systems for efficient material transport.',
      category: 'Transport',
      image: sideImg,
      link: '/bulkers'
    },
    {
      name: 'SILOS',
      description: 'We specialize in designing, manufacturing, and installing high-quality industrial silos.',
      category: 'Storage',
      image: siloImg,
      link: '/silos'
    },
  ]

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  }

  return (
    <section id="products" className="prod-section">
      <div className="prod-container">

        {/* ── HEADER ── */}
        <motion.div
          className="prod-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <span className="prod-eyebrow">What We Build</span>
          <h2 className="prod-title">OUR PRODUCTS</h2>
          <p className="prod-subtitle">
            Explore our range of high-quality truck bodies and trailers built
            to meet diverse industrial needs.
          </p>
        </motion.div>

        {/* ── GRID ── */}
        <motion.div
          className="prod-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardContainerVariants}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="prod-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="prod-image">
                <img src={product.image} alt={product.name} className="prod-img" />
                <div className="prod-category">{product.category}</div>
              </div>

              <div className="prod-content">
                <h3 className="prod-name">{product.name}</h3>
                <p className="prod-description">{product.description}</p>
                <Link to={product.link} className="prod-view-btn">
                  <span>View Details</span>
                  <FaEye />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Products
