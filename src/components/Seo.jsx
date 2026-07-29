import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://srbulkers.in";
const DEFAULT_IMAGE = `${SITE_URL}/logo.webp`;

const Seo = ({
  title = "SR Bulkers | IAI Certified Cement Bulker Manufacturer in Mettur, Tamil Nadu",
  description = "SR Bulkers is an IAI Certified industrial fabrication and bulk transport company based in Mettur, Tamil Nadu. Since 2012, we manufacture Cement Bulkers, Fly Ash Bulkers, Taurus Trailers, Box Trailers and Storage Silos ranging from 36 CuM to 86 CuM.",
  keywords = "SR Bulkers, Cement Bulker Manufacturer, Fly Ash Bulker, Taurus Trailer, Box Trailer, Storage Silos, Industrial Fabrication, Bulk Cement Transportation, Bulk Logistics, Mettur, Salem, Tamil Nadu, Cement Tanker Manufacturer",
  canonical,
  image = DEFAULT_IMAGE,
  schema = null,
  noIndex = false,
}) => {
  const location = useLocation();

  const currentUrl =
    canonical || `${SITE_URL}${location.pathname === "/" ? "" : location.pathname}`;

  const schemas = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="SR Bulkers" />

      <meta
        name="robots"
        content={
          noIndex
            ? "noindex,nofollow"
            : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        }
      />

      <link rel="canonical" href={currentUrl} />

      {/* Geo */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Mettur, Tamil Nadu" />
      <meta name="geo.position" content="11.7870;77.8008" />
      <meta name="ICBM" content="11.7870,77.8008" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SR Bulkers" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile */}
      <meta name="theme-color" content="#0f172a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-title"
        content="SR Bulkers"
      />

      {/* JSON-LD */}
      {schemas.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
        >
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;