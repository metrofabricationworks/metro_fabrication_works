'use client';
import { useState } from 'react';
import Layout from '../components/Layout';
import { User, Phone, FileText, MessageCircle, Hammer, CheckCircle } from 'lucide-react';

export default function WeldingWorks() {
  const [formData, setFormData] = useState({ name: '', phone: '', requirement: '' });
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9966552243';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.requirement) {
      alert('Please fill all fields.');
      return;
    }

    const message = `Welding Works Enquiry:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nRequirement: ${formData.requirement}\n\nPlease contact me as soon as possible.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setFormData({ name: '', phone: '', requirement: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass =
    'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-secondary transition text-gray-900 text-sm';

  const services = [
    'MIG / TIG / Arc Welding',
    'Structural Steel Fabrication',
    'Gate & Shutter Repair',
    'On-site Welding Services',
    'Custom Metal Fabrication',
    'Pipeline & Framework',
    'Aluminium Fabrication',
    'Stainless Steel Work',
  ];

  return (
    <Layout
      title="Professional Welding Services — Metro Fabrication Hyderabad"
      description="Expert MIG, TIG and arc welding services in Hyderabad. On-site welding, structural fabrication, gate repair and custom metal work. Metro Fabrication Works."
    >
      {/* Page header */}
      <div className="bg-primary py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-wide mb-3">
            WELDING &amp; <span className="text-secondary">FABRICATION</span>
          </h1>
          <p className="text-gray-400 text-lg">Expert fabrication and on-site welding solutions</p>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Quote Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-900">
                <FileText className="text-secondary" size={22} /> Request a Quote
              </h2>

              {submitted && (
                <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                  <CheckCircle size={18} /> Redirecting you to WhatsApp...
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Your mobile number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Requirement</label>
                  <textarea
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass}
                    placeholder="Example: Gate repair, structural welding, custom railing, on-site work..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-green-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition"
                >
                  <MessageCircle size={20} />
                  Send Enquiry on WhatsApp
                </button>
              </form>
            </div>

            {/* Services + Call CTA */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-gray-900">
                  <Hammer className="text-secondary" size={20} /> Our Welding Services
                </h3>
                <ul className="space-y-2.5">
                  {services.map((service) => (
                    <li key={service} className="flex items-center gap-3 text-gray-600 text-sm">
                      <CheckCircle size={16} className="text-secondary flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary rounded-2xl p-8 text-center border border-gray-800">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-secondary" size={22} />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Need Urgent Service?</h3>
                <p className="text-gray-400 text-sm mb-6">Call us directly — we respond quickly for urgent jobs.</p>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold transition"
                >
                  <Phone size={18} /> {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}