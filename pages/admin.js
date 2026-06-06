'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import { LogOut, Plus, Trash2, Lock, Package, ChevronDown } from 'lucide-react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

// ── All categories including every gate sub-type ──────────────────────────────
const CATEGORIES = [
  { value: 'doors',                label: 'Doors',                    group: 'Main' },
  { value: 'grills',               label: 'Grills',                   group: 'Main' },
  { value: 'staircase',            label: 'Staircase',                group: 'Main' },

  { value: 'gates-sliding',        label: 'Gates → Sliding',          group: 'Gates' },
  { value: 'gates-foldable-single',label: 'Gates → Foldable (Single)',group: 'Gates' },
  { value: 'gates-foldable-double',label: 'Gates → Foldable (Double)',group: 'Gates' },
];

// Human-readable label for the table
const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map(c => [c.value, c.label]));

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput]     = useState('');
  const [error, setError]                     = useState('');

  const [formData, setFormData] = useState({
    name: '', category: 'doors', size: '', price: '', image: '',
  });

  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [message, setMessage]     = useState('');
  const [filterCat, setFilterCat] = useState('all');

  // Image preview state
  const [imgPreviewOk, setImgPreviewOk] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('adminAuthenticated') === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!ADMIN_PASSWORD) {
      setError('Admin password not configured. Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local');
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
      setProducts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
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
      setImgPreviewOk(false);
      fetchProducts();
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product? Cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(prev => prev.filter(p => p.id !== id));
      setMessage('✅ Product deleted.');
    } catch (err) {
      setMessage('❌ Delete failed: ' + err.message);
    }
  };

  const field = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const filteredProducts = filterCat === 'all'
    ? products
    : products.filter(p => p.category === filterCat);

  const inputClass  = 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-secondary transition text-gray-900 text-sm';
  const selectClass = 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-secondary transition text-gray-900 text-sm appearance-none cursor-pointer';

  // ── LOGIN ─────────────────────────────────────────────────────────────────
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
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password" value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className={inputClass} placeholder="Enter admin password"
                autoFocus required
              />
              <button type="submit" className="w-full bg-secondary hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition">
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
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
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition border border-gray-200 px-4 py-2 rounded-xl">
              <LogOut size={16} /> Logout
            </button>
          </div>

          {message && (
            <div className="mb-6 bg-white border border-gray-100 text-gray-700 text-sm px-4 py-3 rounded-xl shadow-sm">
              {message}
            </div>
          )}

          {/* ── ADD PRODUCT FORM ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="text-secondary" size={20} /> Add New Product
            </h2>

            <form onSubmit={handleAdd}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">

                {/* Product name — full width */}
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Product Name *</label>
                  <input type="text" value={formData.name}
                    onChange={e => field('name', e.target.value)}
                    className={inputClass} placeholder="e.g. Heavy Duty MS Sliding Gate — Double Leaf" required />
                </div>

                {/* Category — with optgroup for Gates sub-types */}
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Category *</label>
                  <select value={formData.category}
                    onChange={e => field('category', e.target.value)}
                    className={selectClass}>
                    <optgroup label="── Main Categories ──">
                      <option value="doors">Doors</option>
                      <option value="grills">Grills</option>
                      <option value="staircase">Staircase</option>
                    </optgroup>
                    <optgroup label="── Gates ──">
                      <option value="gates-sliding">Gates → Sliding</option>
                      <option value="gates-foldable-single">Gates → Foldable (Single)</option>
                      <option value="gates-foldable-double">Gates → Foldable (Double)</option>
                    </optgroup>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-9 text-gray-400 pointer-events-none" />

                  {/* Visual hint for selected gate sub-type */}
                  {formData.category.startsWith('gates-') && (
                    <p className="text-xs text-secondary mt-1.5 font-medium">
                      ✓ Will appear under Gates → {
                        { 'gates-sliding': 'Sliding', 'gates-foldable-single': 'Foldable (Single)', 'gates-foldable-double': 'Foldable (Double)' }[formData.category]
                      }
                    </p>
                  )}
                </div>

                {/* Size */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Size</label>
                  <input type="text" value={formData.size}
                    onChange={e => field('size', e.target.value)}
                    className={inputClass} placeholder="e.g. 10ft × 5ft" />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Price (₹) *</label>
                  <input type="number" value={formData.price}
                    onChange={e => field('price', e.target.value)}
                    className={inputClass} placeholder="e.g. 18000" required />
                </div>

                {/* Image URL + live preview */}
                <div className="sm:col-span-2 lg:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Image URL</label>
                  <input type="url" value={formData.image}
                    onChange={e => { field('image', e.target.value); setImgPreviewOk(false); }}
                    className={inputClass} placeholder="https://your-image-link.com/photo.jpg" />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload your photo to Google Drive / Imgur / any host, paste the link here.
                  </p>
                </div>

                {/* Image preview */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Image Preview</label>
                  <div className="w-full h-24 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                    {formData.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={formData.image}
                        alt="preview"
                        className="w-full h-full object-cover"
                        onLoad={() => setImgPreviewOk(true)}
                        onError={() => setImgPreviewOk(false)}
                      />
                    ) : (
                      <span className="text-gray-300 text-xs">No image</span>
                    )}
                  </div>
                  {formData.image && !imgPreviewOk && (
                    <p className="text-xs text-red-400 mt-1">⚠ Image URL may be invalid</p>
                  )}
                  {imgPreviewOk && (
                    <p className="text-xs text-green-500 mt-1">✓ Image looks good</p>
                  )}
                </div>

              </div>

              <button type="submit" disabled={loading}
                className="bg-secondary hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition flex items-center gap-2">
                <Plus size={18} /> {loading ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>

          {/* ── PRODUCT TABLE ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Table header + filter */}
            <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <Package className="text-secondary" size={18} />
                <h2 className="font-semibold text-gray-900">
                  All Products ({filteredProducts.length}{filterCat !== 'all' ? ` of ${products.length}` : ''})
                </h2>
              </div>

              {/* Filter dropdown */}
              <div className="relative w-full sm:w-56">
                <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 appearance-none focus:border-secondary transition pr-7">
                  <option value="all">All Categories</option>
                  <optgroup label="── Main ──">
                    <option value="doors">Doors</option>
                    <option value="grills">Grills</option>
                    <option value="staircase">Staircase</option>
                  </optgroup>
                  <optgroup label="── Gates ──">
                    <option value="gates-sliding">Gates → Sliding</option>
                    <option value="gates-foldable-single">Gates → Foldable (Single)</option>
                    <option value="gates-foldable-double">Gates → Foldable (Double)</option>
                  </optgroup>
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Package size={36} className="mx-auto mb-3 opacity-30" />
                <p>{filterCat === 'all' ? 'No products added yet.' : `No products in this category.`}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Size</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 w-10" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                              {product.image ? (
                                <Image src={product.image} alt={product.name} width={40} height={40} className="object-cover w-full h-full" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">IMG</div>
                              )}
                            </div>
                            <span className="font-medium text-gray-900 line-clamp-2 max-w-xs">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${product.category?.startsWith('gates-')
                              ? 'bg-orange-50 text-orange-600 border border-orange-100'
                              : 'bg-secondary/10 text-secondary'}`}>
                            {CATEGORY_LABELS[product.category] || product.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">{product.size || '—'}</td>
                        <td className="px-4 py-4 font-semibold text-secondary">₹{product.price?.toLocaleString()}</td>
                        <td className="px-4 py-4 text-right">
                          <button onClick={() => handleDelete(product.id)}
                            className="text-gray-300 hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-50">
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
