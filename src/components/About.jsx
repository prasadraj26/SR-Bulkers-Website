import { motion } from 'framer-motion'
import { 
  FaCogs, 
  FaIndustry, 
  FaRobot, 
  FaMicrochip, 
  FaChartLine, 
  FaArrowRight,
  FaCubes,
  FaDatabase,
  FaBrain,
  FaBolt
} from 'react-icons/fa'
import './About.css'

const About = () => {
  const techFeatures = [
    {
      icon: <FaRobot />,
      title: "Robotic Precision",
      description: "AI-powered robotic systems ensure millimeter-perfect manufacturing with 99.9% accuracy."
    },
    {
      icon: <FaMicrochip />,
      title: "Smart Manufacturing",
      description: "IoT-enabled production lines with real-time monitoring and predictive maintenance."
    },
    {
      icon: <FaCubes />,
      title: "Digital Twins",
      description: "Virtual simulations before physical production for optimal design and performance."
    },
    {
      icon: <FaChartLine />,
      title: "Data Analytics",
      description: "Big data analytics driving continuous improvement and quality optimization."
    },
    {
      icon: <FaDatabase />,
      title: "Cloud Integration",
      description: "Seamless cloud-based systems for remote monitoring and management."
    },
    {
      icon: <FaBrain />,
      title: "AI Optimization",
      description: "Machine learning algorithms optimizing production efficiency and quality control."
    }
  ]

  const stats = [
    { number: "20+", label: "Years Excellence", icon: <FaIndustry /> },
    { number: "99.9%", label: "Quality Rate", icon: <FaBolt /> },
    { number: "5000+", label: "Projects Completed", icon: <FaCogs /> },
    { number: "24/7", label: "Smart Monitoring", icon: <FaChartLine /> }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const cubeVariants = {
    hidden: { rotateY: 0, scale: 0.8 },
    visible: {
      rotateY: 360,
      scale: 1,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  // Generate random data streams
  const dataStreams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`
  }))

  return (
    <section id="about" className="about-section">
      {/* Animated Tech Grid Background */}
      <div className="tech-grid-bg"></div>
      
      {/* Data Stream Animations */}
      {dataStreams.map(stream => (
        <div 
          key={stream.id}
          className="data-stream"
          style={{
            left: stream.left,
            animationDelay: stream.delay
          }}
        />
      ))}

      <div className="container about-container">
        {/* Left Content */}
        <motion.div 
          className="about-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="glow-circle"></div>
          
          <div className="content-wrapper">
            <motion.span className="section-tag" variants={itemVariants}>
              Advanced Manufacturing
            </motion.span>
            
            <motion.h2 className="about-title" variants={itemVariants}>
              Engineering the <span className="title-highlight">Future</span> of
              <br />Truck Technology
            </motion.h2>
            
            <motion.div className="tech-features">
              {techFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="tech-feature"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.button 
              className="tech-button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Explore Technology</span>
              <FaArrowRight className="button-icon" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Tech Visual */}
        <motion.div 
          className="tech-visual"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="visual-container">
            {/* 3D Floating Cube */}
            <motion.div 
              className="floating-cube"
              variants={cubeVariants}
              animate="visible"
              initial="hidden"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="cube-face"></div>
              ))}
            </motion.div>

            {/* Stats Overlay */}
            <motion.div 
              className="stats-overlay"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About