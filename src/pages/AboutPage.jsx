import '../components/About.css'

const AboutPage = () => {
  return (
    <section className="about-section">
      <div className="about-container">

        <div className="section-header">
          <h2 className="section-title">About SR Bulkers</h2>
          <p className="section-subtitle">
            SR Bulkers is a leading manufacturer of cement bulkers and trailers,
            based in Mettur, Tamil Nadu. Established in 2012, we focus on quality,
            durability, and customer satisfaction.
          </p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#555', lineHeight: '1.7' }}>
          <p>
            With over 12 years of experience, SR Bulkers has earned trust by delivering
            strong, reliable bulker solutions for construction and logistics industries.
          </p>

          <p>
            Our manufacturing process emphasizes quality materials, skilled workmanship,
            and thorough inspection to ensure long service life and safety.
          </p>

          <p>
            We are committed to timely delivery and dependable after-sales support,
            ensuring long-term customer satisfaction.
          </p>
        </div>

      </div>
    </section>
  )
}

export default AboutPage
