'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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

  const isActive = (href) => router.pathname === href;

  return (
    <header className="bg-primary text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center font-display text-white text-lg leading-none">
              M
            </div>
            <span className="font-display text-2xl tracking-wide text-white group-hover:text-secondary transition-colors">
              METRO FABRICATION
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isActive(item.href) ? 'text-secondary' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-all font-semibold text-sm"
            >
              <Phone size={16} /> {phone}
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-300 hover:text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-800 pt-4">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`py-2.5 px-3 rounded-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-secondary/10 text-secondary'
                      : 'text-gray-300 hover:text-secondary hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={`tel:${phone}`}
                className="mt-3 flex items-center justify-center gap-2 bg-secondary text-white py-3 rounded-xl font-semibold"
              >
                <Phone size={18} /> Call Now: {phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}