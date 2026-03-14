import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Products.css'

import backImg from '../assets/images/back.png'
import sideImg from '../assets/images/trailler tank.png'
import siloImg from '../assets/images/silo.png'

const Products = () => {

  const products = [
    {
      name: 'Bulkers',
      description: 'Heavy-duty bulkers with hydraulic systems for efficient material transport.',
      category: 'Transport',
      image: sideImg,
      link: '/bulkers'
    },
    {
      name: 'Silos',
      description: 'We specialize in designing, manufacturing, and installing high-quality industrial silos.',
      category: 'Storage',
      image: siloImg,
      link: '/silos'
    },
  ]

  return (
    <section id="products" className="products-section">
      <div className="container">

        <div className="products-header">
          <h2 className="products-title">Our Products</h2>
          <p className="products-subtitle">
            Explore our range of high-quality truck bodies and trailers built to meet diverse industrial needs.
          </p>
        </div>

        <div className="products-grid">

          {products.map((product, index) => (
            <motion.div
              key={index}
              className="product-card"
              whileHover={{ scale: 1.03, y: -5 }}
            >

              <div className="product-image">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="product-category">{product.category}</div>
              </div>

              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                {/* LINK TO PRODUCT PAGE */}
                <Link to={product.link} className="view-button">
                  <span>View Details</span>
                  <FaEye />
                </Link>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Products