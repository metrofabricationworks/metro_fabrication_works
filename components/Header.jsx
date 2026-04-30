'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9966552243';

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rolling Shutter', href: '/rolling-shutter' },
    { name: 'Doors', href: '/doors' },
    { name: 'Gates', href: '/gates' },
    { name: 'Grills', href: '/grills' },
    { name: 'Staircase', href: '/staircase' },
    { name: 'Welding Works', href: '/welding-works' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">
            Metro Fabrication
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 hover:text-secondary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Phone size={18} /> {phone}
            </a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 hover:text-secondary"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t pt-4">
            <div className="flex flex-col gap-4 text-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-700 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a href={`tel:${phone}`} className="text-secondary font-medium flex items-center gap-2">
                <Phone size={18} /> Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}