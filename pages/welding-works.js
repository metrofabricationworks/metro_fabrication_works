'use client';
import { useState } from 'react';
import Layout from '../components/Layout';
import { User, Phone, FileText, MessageCircle, Hammer } from 'lucide-react';

export default function WeldingWorks() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: ''
  });

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.requirement) {
      alert("Please fill all fields");
      return;
    }

    const message = `Welding Works Enquiry:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nRequirement: ${formData.requirement}\n\nPlease contact me as soon as possible.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');

    // Reset form
    setFormData({ name: '', phone: '', requirement: '' });
  };

  return (
    <Layout title="Welding Works - Metro Fabrication Works">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Professional Welding Services</h1>
            <p className="mt-4 text-lg text-gray-600">Expert fabrication and on-site welding solutions</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Request Form */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="text-secondary" /> Request Quote
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Your mobile number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Describe Your Requirement</label>
                  <textarea
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary resize-y"
                    placeholder="Example: Gate repair, structural welding, custom railing..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-green-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition"
                >
                  <MessageCircle size={22} />
                  Send Enquiry on WhatsApp
                </button>
              </form>
            </div>

            {/* Services Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow p-8">
                <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <Hammer className="text-secondary" /> Our Welding Services
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• MIG / TIG / Arc Welding</li>
                  <li>• Structural Steel Fabrication</li>
                  <li>• Gate & Shutter Repair</li>
                  <li>• On-site Welding Services</li>
                  <li>• Custom Metal Fabrication</li>
                  <li>• Pipe Line & Frame Works</li>
                </ul>
              </div>

              <div className="bg-secondary text-white rounded-3xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Need Immediate Service?</h3>
                <p className="mb-6">Call us directly for urgent welding requirements</p>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+919999999999'}`}
                  className="inline-flex items-center gap-3 bg-white text-secondary px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"
                >
                  <Phone size={22} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}