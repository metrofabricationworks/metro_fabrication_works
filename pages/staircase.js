'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MessageCircle, Phone } from 'lucide-react';

export default function Staircase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9966552243';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  useEffect(() => {
    const fetchStaircase = async () => {
      try {
        const q = query(collection(db, 'products'), where('category', '==', 'staircase'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (err) {
        console.error('Error fetching staircase products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaircase();
  }, []);

  return (
    <Layout
      title="Staircase Railings — Metro Fabrication Works Hyderabad"
      description="Modern SS, MS and glass staircase railings. Custom designs for residential and commercial spaces in Hyderabad. Metro Fabrication Works."
    >
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-wide mb-3">
            STAIRCASE <span className="text-secondary">RAILINGS</span>
          </h1>
          <p className="text-gray-400 text-lg">Modern SS, MS and glass staircase railings</p>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 max-w-md mx-auto">
              <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🪜</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Products Coming Soon</h2>
              <p className="text-gray-500 mb-8">
                We design and fabricate SS and MS staircase railings to your exact specs. Call us for custom pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
                  <Phone size={18} /> Call Now
                </a>
                <a href={`https://wa.me/${whatsapp}?text=Hi, I'm interested in staircase railings. Please share details.`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition">
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