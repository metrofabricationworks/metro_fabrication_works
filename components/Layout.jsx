import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = "Metro Fabrication Works - Hyderabad", description }) {
  const metaDesc = description ||
    "Metro Fabrication Works — Premium rolling shutters, gates, doors, grills, staircase railings & welding services in Musheerabad, Hyderabad. Call +91 9966552243 for a free quote.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="rolling shutter hyderabad, fabrication works hyderabad, gates doors grills musheerabad, welding works hyderabad" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Metro Fabrication Works",
              "description": "Professional metal fabrication services in Hyderabad — rolling shutters, gates, doors, grills, staircases & welding.",
              "telephone": "+919966552243",
              "email": "metrofabricationhyd@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Musheerabad",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.41722,
                "longitude": 78.49498
              },
              "openingHours": "Mo-Sa 09:00-19:00",
              "foundingDate": "2000"
            })
          }}
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}