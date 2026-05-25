import { Facebook, Instagram, Mail, Phone, MapPin, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9966552243';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  const services = [
    { name: 'Rolling Shutter', href: '/rolling-shutter' },
    { name: 'Doors', href: '/doors' },
    { name: 'Gates', href: '/gates' },
    { name: 'Grills', href: '/grills' },
    { name: 'Staircase', href: '/staircase' },
    { name: 'Welding Works', href: '/welding-works' },
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Top CTA strip */}
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-white text-lg">
            Need a free quote? Call or WhatsApp us today!
          </p>
          <div className="flex gap-3">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-white text-secondary px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
            >
              <Phone size={16} /> Call Now
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center font-display text-white text-lg">M</div>
              <span className="font-display text-2xl tracking-wide">METRO FABRICATION</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Professional metal fabrication services in Hyderabad, Telangana since 2000.
              Trusted by thousands of homes and businesses across the city.
            </p>
            <div className="space-y-3 text-sm">
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors">
                <Phone size={16} className="text-secondary" /> {phone}
              </a>
              <a href="mailto:metrofabricationhyd@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors">
                <Mail size={16} className="text-secondary" /> metrofabricationhyd@gmail.com
              </a>
              <p className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} className="text-secondary" /> Musheerabad, Hyderabad, Telangana
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-secondary mb-5">OUR SERVICES</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary inline-block" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-secondary mb-5">OUR LOCATION</h4>
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.88672359717!2d78.4949788742931!3d17.41722300194665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99965860e47f%3A0x54cc0fa96dcae0f1!2sMetro%20Fabrication%20Works!5e0!3m2!1sen!2sin!4v1777460084153!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              📍 Musheerabad, Hyderabad
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          © 2026 Metro Fabrication Works, Hyderabad. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}