'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';

const ADMIN_PASSWORD = "metro123";   // ← Change this to your own strong password

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'doors',
    size: '',
    price: '',
    image: ''
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check if already logged in (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
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
    const snapshot = await getDocs(collection(db, 'products'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'products'), {
        name: formData.name,
        category: formData.category,
        size: formData.size,
        price: parseInt(formData.price),
        image: formData.image
      });

      setMessage('✅ Product added successfully!');
      setFormData({ name: '', category: 'doors', size: '', price: '', image: '' });
      fetchProducts();
    } catch (err) {
      setMessage('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <Layout title="Admin Login">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && <p className="text-red-600 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-secondary hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
              >
                Login to Admin Panel
              </button>
            </form>

            
          </div>
        </div>
      </Layout>
    );
  }

  // Main Admin Panel (after login)
  return (
    <Layout title="Admin Panel - Metro Fabrication Works">
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>

          {/* Add Product Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

            {message && <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700">{message}</div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form fields same as before */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl">
                  <option value="doors">Doors</option>
                  <option value="gates">Gates</option>
                  <option value="grills">Grills</option>
                  <option value="staircase">Staircase</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" required />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border rounded-xl" 
                  placeholder="https://drive.google.com/uc?export=view&id=FILE_ID"
                />
                {formData.image && (
                  <div className="mt-3">
                    <img src={formData.image} alt="preview" className="max-h-48 rounded-lg border" />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <button type="submit" disabled={loading} className="w-full bg-secondary hover:bg-blue-700 text-white font-semibold py-4 rounded-xl">
                  {loading ? "Adding Product..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>

          {/* Products List */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">All Products ({products.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow">
                  {product.image && (
                    <div className="relative h-48">
                      <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category} • ₹{product.price}</p>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="mt-4 text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}