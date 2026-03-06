import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import './Products.css'

// Correct way to import images in React/Vite
import backImg from '../assets/images/back.png'
import sideImg from '../assets/images/side.png'
import siloImg from '../assets/images/silo.png'

const Products = () => {
  const products = [
    {
      name: 'Bulkers',
      description: 'Heavy-duty bulkers with hydraulic systems for efficient material transport.',
      category: 'transport',
      image: backImg  // Use the imported variable
    },

    {
      name: 'Silos',
      description: 'We specialize in designing, manufacturing, and installing high-quality industrial silos tailored to meet the storage needs of various industries',
      category: 'Storage',
      image: siloImg  // Use the imported variable
    },
  ]

  // Animation variants for scroll effect
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="products" className="products-section">
      <div className="container">
        <motion.div 
          className="products-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="products-title"
            variants={titleVariants}
          >
            Our Products
          </motion.h2>
          <motion.p 
            className="products-subtitle"
            variants={subtitleVariants}
          >
            Explore our range of high-quality truck bodies and trailers built to meet diverse industrial needs.
          </motion.p>
        </motion.div>

        <motion.div 
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="product-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="product-category">{product.category}</div>
              </div>
              
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <motion.div 
                  className="view-button"
                  whileHover={{ x: 5 }}
                >
                  <span>View Details</span>
                  <FaEye />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Products