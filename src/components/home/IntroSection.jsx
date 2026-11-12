import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import PakistanRiceMap from './PakistanRiceMap';

export default function IntroSection({ onOpenQuote }) {
  // Pure Pakistani Rice Cultivation Basins & Milling Heritage
  const riceBelts = [
    {
      id: 'punjab-basmati',
      name: 'Punjab Basmati Bowl (Kalar Belt)',
      region: 'Gujranwala, Hafizabad, Sheikhupura & Sialkot',
      variety: 'Super Kernel Basmati & PK-348 Long Grain Rice',
      terroir: 'Fertile alluvial plains nourished by cool Himalayan glacial waters from the Chenab & Ravi rivers.',
      characteristics: 'Extra-long slender grains, natural floral fragrance, and clean, fluffy separation after cooking.',
    },
    {
      id: 'sindh-irri',
      name: 'Sindh Rice Delta (Indus Basin)',
      region: 'Larkana, Jacobabad, Dadu & Thatta',
      variety: 'IRRI-6 Long Grain White, IRRI-9 Slender & Sindh Basmati / D-98',
      terroir: 'Nutrient-dense Indus River delta soil combined with warm sunshine for robust grain growth.',
      characteristics: 'Firm kernel structure, low breakage, rich regional taste, and reliable cooking consistency.',
    },
    {
      id: 'karachi-milling',
      name: 'Traditional Aging & Precision Milling',
      region: 'Verified Milling & Cleaning Partners',
      variety: 'Parboiled (Sella), Raw White & Aged Aromatic Grades',
      terroir: 'Carefully controlled natural maturation paired with modern optical color sorting and polishing.',
      characteristics: 'Consistent grain length, clean visual appearance, and preserved nutritional aroma.',
    },
  ];

  const [activeBelt, setActiveBelt] = useState(riceBelts[0]);

  const handleSelectBelt = (beltId) => {
    const found = riceBelts.find((b) => b.id === beltId);
    if (found) setActiveBelt(found);
  };

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#FAF8F3] border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Balanced Rice Origin Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-[#B8860B]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
                Pakistani Rice Heritage &bull; Growing Regions
              </span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.15]">
              Cultivated in Pakistan&apos;s <br />
              <span className="text-[#155437]">Finest Rice Growing Soils</span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              From the aromatic <strong>Kalar Basmati fields of Punjab</strong> to the fertile <strong>Indus River plains of Sindh</strong>, Modular Traders sources directly from respected local growers and millers — preserving Pakistan&apos;s authentic grain quality and traditional flavor.
            </p>

            {/* Interactive Rice Basin Info Card (Clean & Concise) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D5E5DC] shadow-xs space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#155437]" />
                  <h3 className="font-sans text-base font-bold text-[#072B1F]">
                    {activeBelt.name}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#B8860B] font-semibold">
                  {activeBelt.region}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <div>
                  <strong className="text-[#072B1F]">Primary Varieties:</strong> {activeBelt.variety}
                </div>
                <div>
                  <strong className="text-[#072B1F]">Soil &amp; Water:</strong> {activeBelt.terroir}
                </div>
                <div>
                  <strong className="text-[#072B1F]">Grain Character:</strong> {activeBelt.characteristics}
                </div>
              </div>

              {/* Clean Selector Tabs */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {riceBelts.map((belt) => (
                  <button
                    key={belt.id}
                    onClick={() => setActiveBelt(belt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeBelt.id === belt.id
                        ? 'bg-[#072B1F] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {belt.id === 'punjab-basmati' ? 'Punjab Basmati' : belt.id === 'sindh-irri' ? 'Sindh IRRI' : 'Milling & Aging'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Link
                to="/products"
                className="bg-[#072B1F] hover:bg-[#155437] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
              >
                <span>View Rice Varieties</span>
                <ArrowRight className="w-4 h-4 text-[#CFA744]" />
              </Link>

              <button
                onClick={onOpenQuote}
                className="bg-white hover:bg-slate-50 text-[#072B1F] border border-[#D5E5DC] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-2xs cursor-pointer"
              >
                Inquire on Rice Sourcing
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Official Pakistan Rice Map */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PakistanRiceMap activeBeltId={activeBelt.id} onSelectBelt={handleSelectBelt} />
          </div>
        </div>
      </div>
    </section>
  );
}
