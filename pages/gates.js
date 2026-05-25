'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MessageCircle, Phone, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Sub-categories for Gates
const gateCategories = [
  {
    id: 'sliding',
    label: 'Sliding Gates',
    emoji: '↔️',
    description: 'Space-saving gates that slide horizontally. Ideal for driveways and large entrances.',
    firestoreValue: 'gates-sliding',
  },
  {
    id: 'foldable-single',
    label: 'Foldable Gate (Single)',
    emoji: '🔁',
    description: 'Single-leaf folding gates. Great for narrow openings and compact spaces.',
    firestoreValue: 'gates-foldable-single',
  },
  {
    id: 'foldable-double',
    label: 'Foldable Gate (Double)',
    emoji: '🔀',
    description: 'Double-leaf folding gates for wide entrances — smooth operation, strong build.',
    firestoreValue: 'gates-foldable-double',
  },
];

export default function Gates() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const phone    = process.env.NEXT_PUBLIC_BUSINESS_PHONE  || '+91 9966552243';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    setProducts([]);

    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category', '==', selectedCategory.firestoreValue)
        );
        const snapshot = await getDocs(q);
        setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching gates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <Layout
      title="Custom Gates — Metro Fabrication Works Hyderabad"
      description="Sliding gates, foldable single and double gates custom fabricated in Hyderabad. Metro Fabrication Works, Musheerabad."
    >
      {/* Page header */}
      <div className="bg-primary py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1 text-gray-400 hover:text-secondary transition text-sm mb-4"
            >
              <ChevronLeft size={16} /> Back to Gate Types
            </button>
          )}
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-wide">
            {selectedCategory ? (
              <>
                {selectedCategory.label.toUpperCase().split('(')[0]}
                {selectedCategory.label.includes('(') && (
                  <span className="text-secondary">({selectedCategory.label.split('(')[1]}</span>
                )}
              </>
            ) : (
              <>CUSTOM <span className="text-secondary">GATES</span></>
            )}
          </h1>
          {!selectedCategory && (
            <p className="text-gray-400 mt-2 text-base md:text-lg">Choose a gate type to see designs &amp; pricing</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── CATEGORY PICKER ── */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {gateCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-secondary/50 transition-all text-left p-7 card-hover"
                >
                  <div className="text-4xl mb-4">{cat.emoji}</div>
                  <h2 className="font-semibold text-gray-900 text-xl group-hover:text-secondary transition-colors mb-2">
                    {cat.label}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <span className="inline-flex items-center gap-1 text-secondary text-sm font-medium">
                    View Products <ChevronRight size={16} />
                  </span>
                  {/* orange bottom bar */}
                  <div className="mt-4 h-1 bg-secondary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>
          )}

          {/* ── PRODUCTS LIST ── */}
          {selectedCategory && (
            <>
              {loading ? (
                <div className="flex justify-center py-24">
                  <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 max-w-md mx-auto">
                  <div className="text-5xl mb-4">{selectedCategory.emoji}</div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Products Coming Soon</h2>
                  <p className="text-gray-500 mb-8">
                    We fabricate {selectedCategory.label} to custom sizes and designs.
                    Contact us directly for options and pricing.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={`tel:${phone}`}
                       className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
                      <Phone size={18} /> Call Now
                    </a>
                    <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${selectedCategory.label}. Please share designs and pricing.`)}`}
                       target="_blank" rel="noopener noreferrer"
                       className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition">
                      <MessageCircle size={18} /> WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}