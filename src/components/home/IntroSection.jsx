import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Droplets, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PakistanRiceMap from './PakistanRiceMap';

export default function IntroSection({ onOpenQuote }) {
  // Pakistan Premier Rice Belts (100% Focused on Rice Agriculture & Export)
  const riceBelts = [
    {
      id: 'punjab-basmati',
      name: 'Punjab Basmati Bowl (Kalar Belt)',
      region: 'Gujranwala, Hafizabad, Sheikhupura & Sialkot',
      variety: 'Super Kernel Basmati, 1121 & PK-348 Long Grain',
      terroir: 'Mineral-rich alluvial loam irrigated by Himalayan snowmelt from the Chenab & Ravi rivers.',
      characteristics: 'Natural aged floral aroma, slender kernel structure, and extraordinary post-cooking elongation up to 2.0x uncooked length.',
      dispatchRoute: 'Dispatched via containerized road/rail freight directly to Karachi Port & Port Qasim.',
    },
    {
      id: 'sindh-irri',
      name: 'Sindh Rice Delta (Indus Basin)',
      region: 'Larkana, Jacobabad, Dadu & Thatta',
      variety: 'IRRI-6 Long Grain White, IRRI-9 Slender & Sindh Basmati / D-98',
      terroir: 'Nutrient-dense Indus River delta silt with high summer heat units promoting firm grain density.',
      characteristics: 'Hard kernel integrity, low breakage profile, and unmatched resilience during long ocean transit voyages.',
      dispatchRoute: 'Direct southern corridor access to Port Muhammad Bin Qasim (PQ) and Karachi Port (KPT).',
    },
    {
      id: 'karachi-milling',
      name: 'Karachi Export Gateway & Seaports',
      region: 'Karachi Port (KPT) & Port Muhammad Bin Qasim (PQ)',
      variety: 'Containerized FCL Stuffing, Bulk Cargo Loading & Export Brokerage',
      terroir: 'Deepwater maritime terminals accommodating container liners and bulk breakbulk vessels.',
      characteristics: 'Complete export documentation, phytosanitary clearance, and transparent commercial coordination.',
      dispatchRoute: 'Direct maritime sailings to the Middle East, East & West Africa, Southeast Asia, and Europe.',
    },
  ];

  const [activeBelt, setActiveBelt] = useState(riceBelts[0]);

  const handleSelectBelt = (beltId) => {
    const found = riceBelts.find((b) => b.id === beltId);
    if (found) setActiveBelt(found);
  };

  return (
    <section id="about-section" className="py-20 sm:py-28 bg-[#FAF8F3] border-b border-[#D5E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Agricultural Provenance Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-[#B8860B]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#072B1F]">
                Provenance &bull; Sourcing Origins
              </span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#072B1F] leading-[1.14]">
              Cultivated in Pakistan&apos;s <br />
              <span className="text-[#155437]">Historic Agricultural Basins</span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Pakistan possesses some of the world’s most renowned agricultural terroir for rice cultivation. From the fragrant <strong>Kalar Basmati belt in Punjab</strong> &mdash; nourished by Himalayan glacial rivers &mdash; to the prolific <strong>Indus alluvial delta in Sindh</strong>, Modular Traders connects global importers directly with vetted regional millers and commodity producers.
            </p>

            {/* Interactive Sourcing Details Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#D5E5DC] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
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

              <div className="space-y-2.5 text-xs text-slate-700">
                <div>
                  <strong className="text-[#072B1F]">Key Varieties:</strong> {activeBelt.variety}
                </div>
                <div>
                  <strong className="text-[#072B1F]">Growing Environment:</strong> {activeBelt.terroir}
                </div>
                <div>
                  <strong className="text-[#072B1F]">Kernel Properties:</strong> {activeBelt.characteristics}
                </div>
                <div>
                  <strong className="text-[#072B1F]">Logistics Corridor:</strong> {activeBelt.dispatchRoute}
                </div>
              </div>

              {/* Selector Tabs */}
              <div className="pt-2 flex items-center gap-2">
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
                    {belt.id === 'punjab-basmati' ? 'Punjab Basmati' : belt.id === 'sindh-irri' ? 'Sindh IRRI' : 'Karachi Ports'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Link to Full Catalog */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/products"
                className="bg-[#072B1F] hover:bg-[#155437] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>View Full Rice Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#CFA744]" />
              </Link>

              <button
                onClick={onOpenQuote}
                className="bg-white hover:bg-slate-50 text-[#072B1F] border border-[#D5E5DC] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-2xs cursor-pointer"
              >
                Inquire on Sourcing
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
