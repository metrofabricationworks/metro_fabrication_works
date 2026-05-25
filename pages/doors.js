'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MessageCircle, Phone } from 'lucide-react';

export default function Doors() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9966552243';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const q = query(collection(db, 'products'), where('category', '==', 'doors'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (err) {
        console.error('Error fetching doors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoors();
  }, []);

  return (
    <Layout
      title="Custom Metal Doors — Metro Fabrication Works Hyderabad"
      description="High-quality main doors, safety doors and interior metal doors. Custom sizes and designs. Metro Fabrication Works, Musheerabad, Hyderabad."
    >
      {/* Page header */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-wide mb-3">
            CUSTOM <span className="text-secondary">DOORS</span>
          </h1>
          <p className="text-gray-400 text-lg">
            High-quality main doors, safety doors & interior doors
          </p>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24 max-w-md mx-auto">
              <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚪</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Products Coming Soon
              </h2>
              <p className="text-gray-500 mb-8">
                We have a wide range of custom doors available. Contact us directly for designs, sizes, and pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  <Phone size={18} /> Call Now
                </a>
                <a
                  href={`https://wa.me/${whatsapp}?text=Hi, I'm interested in custom doors. Please share details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                >
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
        </div>
      </div>
    </Layout>
  );
}