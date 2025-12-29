import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import './Products.css'

const Products = () => {
  const products = [
    {
      name: 'Tipper Truck Body',
      description: 'Heavy-duty tipper bodies with hydraulic systems for efficient material transport.',
      category: 'Construction'
    },
    {
      name: 'Cargo Truck Body',
      description: 'Secure cargo bodies with customizable compartments and advanced security features.',
      category: 'Logistics'
    },
    {
      name: 'Container Truck Body',
      description: 'Container carriers with twist lock systems for safe container transportation.',
      category: 'Shipping'
    },
    {
      name: 'Flatbed Truck',
      description: 'Versatile flatbed trucks for oversized and heavy equipment transport.',
      category: 'Transport'
    },
    {
      name: 'Water Tanker',
      description: 'Stainless steel water tankers with varying capacities for liquid transport.',
      category: 'Utilities'
    },
    {
      name: 'Trailer Body',
      description: 'Custom trailers designed for specific hauling needs and load requirements.',
      category: 'Commercial'
    }
  ]

  return (
    <section id="products" className="white-section products-section">

      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">
            Explore our range of high-quality truck bodies and trailers built to meet diverse industrial needs.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="product-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="product-image">
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
        </div>
      </div>
    </section>
  )
}

export default Products