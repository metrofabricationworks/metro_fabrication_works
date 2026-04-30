import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9966552243';

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Metro Fabrication Works</h3>
            <p className="text-gray-300 mb-6">
              Professional metal fabrication services in telangana since 2000.
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-300">
                <Phone size={20} /> {phone}
              </p>
              <p className="flex items-center gap-3 text-gray-300">
                <Mail size={20} /> metrofabricationhyd@gmail.com
              </p>
              <p className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} /> Hyderabad, Telangana
              </p>
            </div>
          </div>

          {/* Google Maps */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Our Location</h4>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-700 bg-gray-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.88672359717!2d78.4949788742931!3d17.41722300194665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99965860e47f%3A0x54cc0fa96dcae0f1!2sMetro%20Fabrication%20Works!5e0!3m2!1sen!2sin!4v1777460084153!5m2!1sen!2sin%22"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              📍 Your Shop Location, Musheerabad, Hyderabad
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          © 2026 Metro Fabrication Works, Hyderabad. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}