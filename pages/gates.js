'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Gates() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGates = async () => {
      try {
        const q = query(collection(db, 'products'), where('category', '==', 'gates'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (err) {
        console.error("Error fetching gates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGates();
  }, []);

  return (
    <Layout title="Custom Gates - Metro Fabrication Works">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Custom Gates</h1>
            <p className="mt-4 text-lg text-gray-600">Beautiful sliding, swing and compound gates</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              No gates available at the moment. Contact us for custom designs.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}