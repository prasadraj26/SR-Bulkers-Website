import React, { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import GoToTop from '../components/GoToTop'
import Seo from '../components/Seo'

const About = lazy(() => import('../components/About'))
const Products = lazy(() => import('../components/Products'))
const Gallery = lazy(() => import('../components/Gallery'))
const QuoteForm = lazy(() => import('../components/QuoteForm'))
const Footer = lazy(() => import('../components/Footer'))

const Home = () => {
  const homeFaqs = [
    { question: 'What does SR Bulkers manufacture?', answer: 'SR Bulkers manufactures cement bulkers, fly ash bulkers, Taurus trailers, box trailers, industrial trailers, and storage silos for heavy industries and bulk logistics operations.' },
    { question: 'Where is SR Bulkers located?', answer: 'SR Bulkers is based in Mettur, Salem, Tamil Nadu, and serves clients across Tamil Nadu, Karnataka, and other parts of South India.' },
    { question: 'What is the capacity range of SR Bulkers products?', answer: 'The company manufactures bulker solutions from 36 cubic meters to 86 cubic meters, with custom options available for varied transport needs.' },
    { question: 'Does SR Bulkers offer custom fabrication?', answer: 'Yes. SR Bulkers provides custom industrial fabrication for bulkers, trailers, and storage systems tailored to client-specific requirements.' },
    { question: 'What industries does SR Bulkers serve?', answer: 'SR Bulkers serves cement, fly ash, industrial transport, heavy engineering, and bulk logistics sectors.' },
    { question: 'Is SR Bulkers an IAI certified manufacturer?', answer: 'Yes. SR Bulkers is an IAI certified manufacturing company with a strong focus on quality, durability, and safe transport equipment.' },
    { question: 'What are the main services offered by SR Bulkers?', answer: 'The company offers bulk cement transportation, loose cement transportation, fly ash transportation, heavy vehicle fabrication, trailer fabrication, and industrial fabrication.' },
    { question: 'Can SR Bulkers manufacture storage silos?', answer: 'Yes. SR Bulkers fabricates storage silos designed for bulk material handling and industrial storage applications.' },
    { question: 'Do you manufacture Taurus trailers?', answer: 'Yes. SR Bulkers offers Taurus trailer fabrication as part of its heavy trailer and industrial transport product range.' },
    { question: 'Why choose SR Bulkers for bulk transport equipment?', answer: 'The company combines engineering experience, fabrication capability, and practical logistics knowledge to deliver durable and dependable transport solutions.' },
    { question: 'What is fly ash transportation?', answer: 'Fly ash transportation involves the safe movement of fly ash in specialized bulkers designed for industrial and power sector requirements.' },
    { question: 'How long has SR Bulkers been operating?', answer: 'SR Bulkers has been operating since 2012 and has developed a strong reputation for reliable fabrication and transport solutions.' },
    { question: 'Do you provide trailer fabrication services?', answer: 'Yes. SR Bulkers offers trailer fabrication for bulk transport, industrial use, and customized logistic applications.' },
    { question: 'What is a cement bulker?', answer: 'A cement bulker is a specialized transport container used for carrying bulk cement safely and efficiently from manufacturing plants to end users.' },
    { question: 'Can SR Bulkers supply custom bulkers for special applications?', answer: 'Yes. Custom bulker specifications can be developed around capacity, application, and operational requirements.' },
    { question: 'What is the difference between a bulker and a trailer?', answer: 'A bulker is a transport vessel or container designed for bulk material, while a trailer is the chassis platform that carries the load or container.' },
    { question: 'Does SR Bulkers support bulk logistics projects?', answer: 'Yes. The company supports bulk logistics operations with durable transport equipment and fabrication expertise.' },
    { question: 'What is the primary business type of SR Bulkers?', answer: 'SR Bulkers is an industrial fabrication and bulk transport company focused on manufacturing and logistics support.' },
    { question: 'Which regions does SR Bulkers serve?', answer: 'SR Bulkers primarily serves Tamil Nadu, Karnataka, and broader South India markets.' },
    { question: 'Is SR Bulkers suitable for industrial fabrication projects?', answer: 'Yes. The company handles industrial fabrication projects for bulk material handling, transport equipment, and structural equipment needs.' },
    { question: 'How does SR Bulkers approach quality?', answer: 'SR Bulkers focuses on strong build quality, dependable performance, and manufacturing standards suited to demanding industrial use.' },
    { question: 'Can I request a quote for custom bulkers or trailers?', answer: 'Yes. You can request a quote through the website contact section for custom fabrication and transport equipment requirements.' },
    { question: 'What is a bulk cement tanker manufacturer?', answer: 'A bulk cement tanker manufacturer designs and builds specialized tankers for transporting cement and other dry bulk materials.' },
    { question: 'What types of trailers are available from SR Bulkers?', answer: 'SR Bulkers offers Taurus trailers, box trailers, industrial trailers, and related heavy-duty transport solutions.' },
    { question: 'Does SR Bulkers build for heavy vehicle fabrication?', answer: 'Yes. The company provides heavy vehicle fabrication services for industrial and transport applications.' },
  ];

  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SR Bulkers',
      url: 'https://srbulkers.in',
      logo: 'https://srbulkers.in/favicon.svg',
      foundingDate: '2012',
      description: 'Industrial fabrication and bulk transport company manufacturing cement bulkers, fly ash bulkers, trailers, and storage silos in Mettur, Tamil Nadu.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '784, Bhavani Main Road, Navappatti',
        addressLocality: 'Mettur',
        addressRegion: 'Tamil Nadu',
        postalCode: '636452',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9487885503',
        contactType: 'sales',
        areaServed: ['IN', 'TN', 'KA'],
        availableLanguage: ['English', 'Tamil'],
      },
      sameAs: ['https://srbulkers.in'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'SR Bulkers',
      image: 'https://srbulkers.in/favicon.svg',
      url: 'https://srbulkers.in',
      telephone: '+91-9487885503',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '784, Bhavani Main Road, Navappatti',
        addressLocality: 'Mettur',
        addressRegion: 'Tamil Nadu',
        postalCode: '636452',
        addressCountry: 'IN',
      },
      description: 'Fabrication and transportation company specializing in bulk cement bulkers, fly ash bulkers, trailers, and storage silos.',
      areaServed: ['Mettur', 'Salem', 'Tamil Nadu', 'Karnataka', 'South India'],
      priceRange: '₹₹',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SR Bulkers',
      url: 'https://srbulkers.in',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://srbulkers.in/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="home">
      <Seo title="Bulk Cement Bulker Manufacturer in Mettur" description="SR Bulkers manufactures cement bulkers, fly ash bulkers, trailers, and storage silos for industrial and bulk logistics applications in Tamil Nadu and South India." schema={homeSchema} />
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="page-loader" />}>
        <About />
        <Products />
        <Gallery />
        <QuoteForm />
        <Footer />
      </Suspense>
      <section aria-labelledby="faq-heading" style={{ padding: '2.5rem 1rem 4rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 id="faq-heading" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0f172a' }}>Frequently Asked Questions</h2>
          <p style={{ marginBottom: '1.5rem', color: '#475569' }}>Helpful answers for customers searching for bulk transport, fabrication, and industrial storage solutions in Tamil Nadu.</p>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {homeFaqs.map((faq, index) => (
              <details key={index} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.9rem 1rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#0f172a' }}>{faq.question}</summary>
                <p style={{ marginTop: '0.7rem', color: '#334155', lineHeight: 1.6 }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <GoToTop />
    </div>
  )
}

export default Home
