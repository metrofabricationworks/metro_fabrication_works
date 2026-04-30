import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, DoorOpen, Warehouse, Grid3X3,Layers, Flame, Award, Users, Clock} from 'lucide-react';

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
  {
    name: 'Rolling Shutter',
    href: '/rolling-shutter',
    icon: Shield,
    description: 'Heavy duty & premium rolling shutters',
    color: 'bg-blue-600'
  },
  {
    name: 'Doors',
    href: '/doors',
    icon: DoorOpen,
    description: 'Custom main doors & interior doors',
    color: 'bg-emerald-600'
  },
  {
    name: 'Gates',
    href: '/gates',
    icon: Warehouse, // fixed
    description: 'Sliding & swing gates',
    color: 'bg-purple-600'
  },
  {
    name: 'Grills',
    href: '/grills',
    icon: Grid3X3, // fixed (capital X)
    description: 'Window grills & safety grills',
    color: 'bg-orange-600'
  },
  {
    name: 'Staircase',
    href: '/staircase',
    icon: Layers,
    description: 'SS & MS staircase railings',
    color: 'bg-red-600'
  },
  {
    name: 'Welding Works',
    href: '/welding-works',
    icon: Flame,
    description: 'All types of fabrication & welding',
    color: 'bg-amber-600'
  }
];

export default function Home() {
  return (
    <Layout title="Metro Fabrication Works - Hyderabad">
      <Carousel />

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional metal fabrication services with quality materials and expert craftsmanship in Hyderabad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href={category.href} className="group">
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-secondary transition-all hover:shadow-lg">
                    
                    <div className={`${category.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white stroke-[1.5]" />
                    </div>

                    <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                      {category.name}
                    </h3>

                    <p className="text-gray-600">
                      {category.description}
                    </p>

                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose Metro Fabrication Works?
            </h2>
            <p className="text-gray-600 mt-3">
              Trusted fabrication services in Musheerabad, Hyderabad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Award, title: "Premium Quality", desc: "We use only high-grade materials for long-lasting durability" },
              { icon: Users, title: "Expert Craftsmanship", desc: "Skilled team with years of experience in metal fabrication" },
              { icon: Clock, title: "Fast Turnaround", desc: "Quick delivery and professional installation" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center p-6">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}