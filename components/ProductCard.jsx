'use client';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function ProductCard({ product }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in:\n\nProduct: ${product.name}\nCategory: ${product.category}\nSize: ${product.size || 'Custom'}\nPrice: ₹${product.price}\n\nPlease send more details and availability.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover group">
      <div className="relative h-56 w-full bg-gray-100">
        <Image
          src={product.image || "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.size || 'Custom Size Available'}</p>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold text-secondary">₹{product.price?.toLocaleString()}</span>
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-full bg-accent hover:bg-green-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all active:scale-95"
        >
          <MessageCircle size={20} />
          Enquiry on WhatsApp
        </button>
      </div>
    </div>
  );
}