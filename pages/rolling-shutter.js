'use client';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Calculator, MessageCircle } from 'lucide-react';

export default function RollingShutter() {
  const [formData, setFormData] = useState({
    type: 'new',
    operation: 'manual',
    heightFeet: '',
    heightInches: '0',
    widthFeet: '',
    widthInches: '0'
  });

  const [calculation, setCalculation] = useState(null);

  const rates = {
    old: { manual: 130, gear: 180, remote: 250 },
    new: { manual: 220, gear: 280, remote: 320 }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setCalculation(null);
  };

  const calculatePrice = () => {
    const { type, operation, heightFeet, heightInches, widthFeet, widthInches } = formData;

    if (!heightFeet || !widthFeet) {
      alert("Please enter both height and width");
      return;
    }

    const height = parseFloat(heightFeet) + (parseFloat(heightInches) || 0) / 12;
    const width = parseFloat(widthFeet) + (parseFloat(widthInches) || 0) / 12;
    const area = height * width;
    const rate = rates[type][operation];
    const totalPrice = Math.round(area * rate);

    setCalculation({ height: height.toFixed(2), width: width.toFixed(2), area: area.toFixed(2), rate, totalPrice });
  };

  const handleWhatsApp = () => {
    if (!calculation) return alert("Please calculate price first");

    const message = `Rolling Shutter Enquiry:\nType: ${formData.type.toUpperCase()}\nOperation: ${formData.operation.toUpperCase()}\nSize: ${calculation.height}ft × ${calculation.width}ft\nArea: ${calculation.area} sqft\nRate: ₹${calculation.rate}/sqft\nTotal: ₹${calculation.totalPrice}\n\nPlease contact me.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Layout title="Rolling Shutter Price Calculator - Metro Fabrication">
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Rolling Shutter Calculator</h1>
            <p className="text-gray-600 text-lg">Get instant price for your requirement</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Input Form */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Calculator className="text-secondary" /> Configuration
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Shutter Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-secondary">
                      <option value="new">New Shutter</option>
                      <option value="old">Old Style</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Operation Type</label>
                    <select name="operation" value={formData.operation} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-secondary">
                      <option value="manual">Manual</option>
                      <option value="gear">Gear System</option>
                      <option value="remote">Remote Control</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Height (Feet)</label>
                      <div className="flex gap-2">
                        <input type="number" name="heightFeet" placeholder="Feet" value={formData.heightFeet} onChange={handleChange} className="w-full p-3 border rounded-xl" />
                        <select name="heightInches" value={formData.heightInches} onChange={handleChange} className="p-3 border rounded-xl">
                          {[...Array(12)].map((_, i) => <option key={i} value={i}>{i}"</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Width (Feet)</label>
                      <div className="flex gap-2">
                        <input type="number" name="widthFeet" placeholder="Feet" value={formData.widthFeet} onChange={handleChange} className="w-full p-3 border rounded-xl" />
                        <select name="widthInches" value={formData.widthInches} onChange={handleChange} className="p-3 border rounded-xl">
                          {[...Array(12)].map((_, i) => <option key={i} value={i}>{i}"</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button onClick={calculatePrice} className="w-full bg-secondary hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition">
                    Calculate Price
                  </button>
                </div>
              </div>

              {/* Result */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Price Details</h2>
                {calculation ? (
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <div className="space-y-4 text-lg">
                      <div className="flex justify-between"><span>Height:</span> <span className="font-medium">{calculation.height} ft</span></div>
                      <div className="flex justify-between"><span>Width:</span> <span className="font-medium">{calculation.width} ft</span></div>
                      <div className="flex justify-between"><span>Area:</span> <span className="font-medium">{calculation.area} sqft</span></div>
                      <div className="flex justify-between"><span>Rate:</span> <span className="font-medium">₹{calculation.rate}/sqft</span></div>
                      <div className="border-t pt-4 flex justify-between text-2xl font-bold text-secondary">
                        <span>Total Price:</span> <span>₹{calculation.totalPrice}</span>
                      </div>
                    </div>

                    <button onClick={handleWhatsApp} className="mt-8 w-full bg-accent hover:bg-green-600 text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold">
                      <MessageCircle size={22} /> Get Quote on WhatsApp
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 h-80 rounded-2xl flex items-center justify-center text-gray-500">
                    Fill dimensions and click Calculate
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}