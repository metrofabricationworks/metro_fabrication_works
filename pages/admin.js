'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import { LogOut, Plus, Trash2, Lock, Package } from 'lucide-react';

// ⚠️  Set NEXT_PUBLIC_ADMIN_PASSWORD in your .env.local file
// Never hardcode passwords in source code
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'doors',
    size: '',
    price: '',
    image: '',
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!ADMIN_PASSWORD) {
      setError('Admin password is not configured. Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local');
      return;
    }
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setError('');
      fetchProducts();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPasswordInput('');
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setMessage('❌ Name and price are required.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price),
        createdAt: new Date().toISOString(),
      });
      setMessage('✅ Product added successfully!');
      setFormData({ name: '', category: 'doors', size: '', price: '', image: '' });
      fetchProducts();
    } catch (err) {
      setMessage('❌ Error adding product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage('✅ Product deleted.');
    } catch (err) {
      setMessage('❌ Delete failed: ' + err.message);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-secondary transition text-gray-900 text-sm';

  // ── Login Screen ──
  if (!isAuthenticated) {
    return (
      <Layout title="Admin — Metro Fabrication Works">
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center">
                <Lock className="text-secondary" size={26} />
              </div>
            </div>
            <h1 className="font-display text-3xl text-center text-gray-900 mb-1 tracking-wide">ADMIN LOGIN</h1>
            <p className="text-center text-gray-400 text-sm mb-8">Metro Fabrication Works</p>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={inputClass}
                placeholder="Enter admin password"
                autoFocus
                required
              />
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Admin Dashboard ──
  return (
    <Layout title="Admin Dashboard — Metro Fabrication Works">
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl text-primary tracking-wide">ADMIN DASHBOARD</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your product listings</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition border border-gray-200 px-4 py-2 rounded-xl"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

          {message && (
            <div className="mb-6 bg-white border border-gray-100 text-gray-700 text-sm px-4 py-3 rounded-xl shadow-sm">
              {message}
            </div>
          )}

          {/* Add Product Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-10 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="text-secondary" size={20} /> Add New Product
            </h2>
            <form onSubmit={handleAdd} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="e.g. MS Safety Door Single Leaf" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Category *</label>
                <select name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputClass}>
                  <option value="doors">Doors</option>
                  <option value="gates">Gates</option>
                  <option value="grills">Grills</option>
                  <option value="staircase">Staircase</option>
                  <option value="rolling-shutter">Rolling Shutter</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Size</label>
                <input type="text" name="size" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} className={inputClass} placeholder="e.g. 3ft × 7ft" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Price (₹) *</label>
                <input type="number" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className={inputClass} placeholder="e.g. 8500" required />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Image URL</label>
                <input type="url" name="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className={inputClass} placeholder="https://..." />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <button type="submit" disabled={loading} className="bg-secondary hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition flex items-center gap-2">
                  <Plus size={18} /> {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Package className="text-secondary" size={18} />
              <h2 className="font-semibold text-gray-900">All Products ({products.length})</h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Package size={36} className="mx-auto mb-3 opacity-30" />
                <p>No products added yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {product.image ? (
                                <Image src={product.image} alt={product.name} width={40} height={40} className="object-cover w-full h-full" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">IMG</div>
                              )}
                            </div>
                            <span className="font-medium text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary capitalize">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-500">{product.size || '—'}</td>
                        <td className="px-4 py-4 font-semibold text-secondary">₹{product.price?.toLocaleString()}</td>
                        <td className="px-4 py-4 text-right">
                          <button onClick={() => handleDelete(product.id)} className="text-gray-300 hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-50">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}