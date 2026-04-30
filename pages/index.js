import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Carousel = dynamic(
  () => import('../components/Carousel'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[420px] md:h-[520px] bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Metro Fabrication Works</h1>
        </div>
      </div>
    )
  }
);

const categories = [
  { name: 'Rolling Shutter', href: '/rolling-shutter', description: 'Heavy duty & premium rolling shutters' },
  { name: 'Doors', href: '/doors', description: 'Custom main doors & interior doors' },
  { name: 'Gates', href: '/gates', description: 'Sliding & swing gates' },
  { name: 'Grills', href: '/grills', description: 'Window grills & safety grills' },
  { name: 'Staircase', href: '/staircase', description: 'SS & MS staircase railings' },
  { name: 'Welding Works', href: '/welding-works', description: 'All types of fabrication & welding' }
];

export default function Home() {
  return (
    <Layout title="Metro Fabrication Works - Telangana">
      <Carousel />

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional metal fabrication services with quality materials and expert craftsmanship in Vijayawada
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <div className="bg-white rounded-2xl p-8 text-center card-hover h-full border border-gray-100 hover:border-secondary transition-all">
                  <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-white text-4xl">🔧</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose Metro Fabrication?</h2>
            <p className="text-gray-600 mt-3">Trusted by customers across Telangana</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Premium Quality", desc: "We use only high-grade materials for long-lasting durability" },
              { title: "Expert Craftsmanship", desc: "Skilled team with years of experience in fabrication" },
              { title: "Affordable Pricing", desc: "Best value for money with transparent pricing" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}