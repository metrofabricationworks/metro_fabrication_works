'use client';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function ProductCard({ product }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  const handleWhatsApp = () => {
    const categoryLabel = {
      doors: 'Door',
      gates: 'Gate',
      grills: 'Grill',
      staircase: 'Staircase Railing',
      'rolling-shutter': 'Rolling Shutter',
      'gates-sliding': 'Sliding Gate',
      'gates-foldable-single': 'Foldable Gate (Single)',
      'gates-foldable-double': 'Foldable Gate (Double)',
    }[product.category] || product.category;

    // Build the WhatsApp message.
    // WhatsApp does not support sending images via wa.me links programmatically,
    // so we include the image URL in the message text so the team can view it.
    const imageNote = product.image
      ? `\nProduct Image: ${product.image}`
      : '';

    const message =
      `Hi Metro Fabrication Works,\n\n` +
      `I am interested in the following product:\n` +
      `Product: ${product.name}\n` +
      `Type: ${categoryLabel}\n` +
      `Size: ${product.size || 'Custom'}\n` +
      `Price: ₹${product.price?.toLocaleString()}\n` +
      `${imageNote}\n\n` +
      `Please send me more details and availability.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group flex flex-col">
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image
          src={product.image || fallbackImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-primary/80 text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize backdrop-blur-sm">
          {product.category?.replace(/-/g, ' ') || 'Product'}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs mb-3">{product.size || 'Custom Size Available'}</p>

        <div className="flex items-baseline gap-1 mb-4 mt-auto">
          <span className="text-xl font-bold text-secondary">₹{product.price?.toLocaleString()}</span>
          <span className="text-gray-400 text-xs">onwards</span>
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-full bg-accent hover:bg-green-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all active:scale-95 text-sm"
        >
          <MessageCircle size={16} />
          Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
}