'use client';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Calculator, MessageCircle, Info } from 'lucide-react';

export default function RollingShutter() {
  const [formData, setFormData] = useState({
    type: 'new',
    operation: 'manual',
    heightFeet: '',
    heightInches: '0',
    widthFeet: '',
    widthInches: '0',
  });

  const [calculation, setCalculation] = useState(null);

  const rates = {
    old: { manual: 130, gear: 180, remote: 250 },
    new: { manual: 220, gear: 280, remote: 320 },
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCalculation(null);
  };

  const calculatePrice = () => {
    const { type, operation, heightFeet, heightInches, widthFeet, widthInches } = formData;

    if (!heightFeet || !widthFeet) {
      alert('Please enter both height and width.');
      return;
    }

    // Keep feet and inches SEPARATE — never merge them into a decimal
    const hFt  = parseInt(heightFeet)  || 0;
    const hIn  = parseInt(heightInches) || 0;
    const wFt  = parseInt(widthFeet)   || 0;
    const wIn  = parseInt(widthInches)  || 0;

    // For area calculation only, convert to decimal feet internally
    const heightDecimal = hFt + hIn / 12;
    const widthDecimal  = wFt + wIn / 12;
    const area          = heightDecimal * widthDecimal;
    const rate          = rates[type][operation];
    const totalPrice    = Math.round(area * rate);

    setCalculation({
      heightFt: hFt, heightIn: hIn,
      widthFt:  wFt, widthIn:  wIn,
      area:     area.toFixed(2),
      rate,
      totalPrice,
    });
  };

  const fmtSize = (ft, inches) =>
    inches > 0 ? `${ft}ft ${inches}in` : `${ft}ft`;

  const handleWhatsApp = () => {
    if (!calculation) return alert('Please calculate price first.');

    const typeLabel = formData.type === 'new' ? 'New Style' : 'Old Style';
    const opLabel   = { manual: 'Manual', gear: 'Gear System', remote: 'Remote Control' }[formData.operation];

    const message =
      `Rolling Shutter Enquiry\n` +
      `Type: ${typeLabel}\n` +
      `Operation: ${opLabel}\n` +
      `Height: ${fmtSize(calculation.heightFt, calculation.heightIn)}\n` +
      `Width:  ${fmtSize(calculation.widthFt,  calculation.widthIn)}\n` +
      `Area:   ${calculation.area} sqft\n` +
      `Rate:   ₹${calculation.rate}/sqft\n` +
      `Estimated Total: ₹${calculation.totalPrice}\n\n` +
      `Please contact me.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const inputClass   = 'w-full p-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:border-secondary transition text-sm';
  const selectClass  = 'w-full p-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:border-secondary transition text-sm';
  const inchesClass  = 'p-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-secondary transition w-24';

  return (
    <Layout
      title="Rolling Shutter Price Calculator — Metro Fabrication Hyderabad"
      description="Calculate rolling shutter price instantly. New & old style, manual, gear and remote options. Metro Fabrication Works, Hyderabad."
    >
      {/* Page header */}
      <div className="bg-primary py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-wide mb-2">
            ROLLING SHUTTER<span className="text-secondary"> CALCULATOR</span>
          </h1>
          <p className="text-gray-400">Enter your size and get an instant price estimate</p>
        </div>
      </div>

      <div className="bg-gray-50 py-8 md:py-14 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* ── DIMENSION DIAGRAM ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <Info size={16} className="text-secondary" />
              How to measure your shutter
            </h3>

            {/* SVG diagram of a rolling shutter with labelled Width and Height */}
            <div className="flex justify-center">
              <svg viewBox="0 0 320 240" className="w-full max-w-xs md:max-w-sm" aria-label="Rolling shutter dimension diagram">
                {/* Wall */}
                <rect x="10" y="10" width="300" height="220" rx="4" fill="#1a1a1a" />

                {/* Shutter box at top */}
                <rect x="30" y="18" width="260" height="24" rx="3" fill="#f97316" />
                <text x="160" y="34" textAnchor="middle" fill="white" fontSize="11" fontFamily="DM Sans, sans-serif" fontWeight="600">SHUTTER BOX</text>

                {/* Shutter slats */}
                {[0,1,2,3,4,5,6,7].map(i => (
                  <rect key={i} x="30" y={46 + i * 18} width="260" height="16" rx="1"
                    fill={i % 2 === 0 ? '#2a2a2a' : '#333'} stroke="#444" strokeWidth="0.5" />
                ))}
                {/* Partial bottom slat */}
                <rect x="30" y={46 + 8 * 18} width="260" height="10" rx="1" fill="#2a2a2a" stroke="#444" strokeWidth="0.5" />

                {/* Floor */}
                <rect x="10" y="218" width="300" height="12" rx="2" fill="#444" />

                {/* ── WIDTH arrow (horizontal, above shutter) ── */}
                {/* line */}
                <line x1="30" y1="8" x2="290" y2="8" stroke="#f97316" strokeWidth="1.5" />
                {/* left arrowhead */}
                <polygon points="30,8 38,4 38,12" fill="#f97316" />
                {/* right arrowhead */}
                <polygon points="290,8 282,4 282,12" fill="#f97316" />
                {/* label */}
                <rect x="128" y="1" width="64" height="14" rx="3" fill="#f97316" />
                <text x="160" y="11.5" textAnchor="middle" fill="white" fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="700">WIDTH</text>

                {/* ── HEIGHT arrow (vertical, right side) ── */}
                {/* line */}
                <line x1="306" y1="42" x2="306" y2="218" stroke="#f97316" strokeWidth="1.5" />
                {/* top arrowhead */}
                <polygon points="306,42 302,52 310,52" fill="#f97316" />
                {/* bottom arrowhead */}
                <polygon points="306,218 302,208 310,208" fill="#f97316" />
                {/* label — rotated */}
                <rect x="296" y="118" width="52" height="14" rx="3" fill="#f97316"
                  transform="rotate(-90, 322, 125)" />
                <text x="322" y="125" textAnchor="middle" fill="white" fontSize="9"
                  fontFamily="DM Sans, sans-serif" fontWeight="700"
                  transform="rotate(-90, 322, 125)">HEIGHT</text>

                {/* Guide notes */}
                <text x="160" y="234" textAnchor="middle" fill="#888" fontSize="8" fontFamily="DM Sans, sans-serif">
                  Measure from floor to bottom of shutter box
                </text>
              </svg>
            </div>

            <p className="text-xs text-gray-400 text-center mt-3">
              Measure <strong className="text-gray-600">Width</strong> (opening width) and{' '}
              <strong className="text-gray-600">Height</strong> (floor to shutter box bottom)
            </p>
          </div>

          {/* ── CALCULATOR CARD ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">

              {/* Input Form */}
              <div>
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2 text-gray-900">
                  <Calculator className="text-secondary" size={22} /> Configuration
                </h2>

                <div className="space-y-4">
                  {/* Shutter Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Shutter Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className={selectClass}>
                      <option value="new">New Style Shutter</option>
                      <option value="old">Old Style Shutter</option>
                    </select>
                  </div>

                  {/* Operation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Operation Type</label>
                    <select name="operation" value={formData.operation} onChange={handleChange} className={selectClass}>
                      <option value="manual">Manual</option>
                      <option value="gear">Gear System</option>
                      <option value="remote">Remote Control</option>
                    </select>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Height <span className="text-gray-400 font-normal">(floor → shutter box)</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input type="number" name="heightFeet" placeholder="0" min="0"
                          value={formData.heightFeet} onChange={handleChange} className={inputClass} />
                        <span className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none">ft</span>
                      </div>
                      <select name="heightInches" value={formData.heightInches} onChange={handleChange} className={inchesClass}>
                        {[...Array(12)].map((_, i) => (
                          <option key={i} value={i}>{i}&quot;</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Width <span className="text-gray-400 font-normal">(opening width)</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input type="number" name="widthFeet" placeholder="0" min="0"
                          value={formData.widthFeet} onChange={handleChange} className={inputClass} />
                        <span className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none">ft</span>
                      </div>
                      <select name="widthInches" value={formData.widthInches} onChange={handleChange} className={inchesClass}>
                        {[...Array(12)].map((_, i) => (
                          <option key={i} value={i}>{i}&quot;</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button onClick={calculatePrice}
                    className="w-full bg-secondary hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition">
                    Calculate Price
                  </button>
                </div>
              </div>

              {/* Result */}
              <div>
                <h2 className="text-xl font-semibold mb-5 text-gray-900">Price Details</h2>

                {calculation ? (
                  <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                    <div className="space-y-3 text-sm">
                      {[
                        ['Height', fmtSize(calculation.heightFt, calculation.heightIn)],
                        ['Width',  fmtSize(calculation.widthFt,  calculation.widthIn)],
                        ['Area',   `${calculation.area} sqft`],
                        ['Rate',   `₹${calculation.rate} / sqft`],
                      ].map(([label, val]) => (
                        <div key={label} className="flex justify-between text-gray-600">
                          <span>{label}</span>
                          <span className="font-semibold text-gray-900">{val}</span>
                        </div>
                      ))}

                      <div className="border-t border-gray-200 pt-3 mt-1 flex justify-between text-xl font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-secondary">₹{calculation.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-start gap-2 text-xs text-gray-400 bg-orange-50 border border-orange-100 rounded-xl p-3">
                      <Info size={13} className="text-secondary mt-0.5 flex-shrink-0" />
                      Estimate only. Final price may vary based on site conditions.
                    </div>

                    <button onClick={handleWhatsApp}
                      className="mt-4 w-full bg-accent hover:bg-green-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition">
                      <MessageCircle size={18} /> Get Quote on WhatsApp
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-200 h-72 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-3">
                    <Calculator size={34} className="opacity-30" />
                    <p className="text-sm">Fill in dimensions and click Calculate</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rate card */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
              <Info size={16} className="text-secondary" /> Rate Card (₹ per sqft)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Type', 'Manual', 'Gear', 'Remote'].map(h => (
                      <th key={h} className="pb-2 text-gray-500 font-medium pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-50">
                    <td className="py-2.5 font-medium pr-4">Old Style</td>
                    <td className="py-2.5 pr-4">₹130</td>
                    <td className="py-2.5 pr-4">₹180</td>
                    <td className="py-2.5">₹250</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium pr-4">New Style</td>
                    <td className="py-2.5 pr-4">₹220</td>
                    <td className="py-2.5 pr-4">₹280</td>
                    <td className="py-2.5">₹320</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}