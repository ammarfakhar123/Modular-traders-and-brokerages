import React from 'react';
import HeroCinematic from '@/components/home/HeroCinematic';
import IntroSection from '@/components/home/IntroSection';
import CoreValuesSection from '@/components/home/CoreValuesSection';
import RiceVideoShowcaseSection from '@/components/home/RiceVideoShowcaseSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import CtaBandSection from '@/components/home/CtaBandSection';

export default function HomePage({ onOpenQuote, onOpenQuoteWithProduct }) {
  return (
    <main className="w-full">
      {/* 1. Cinematic Animated Hero */}
      <HeroCinematic onOpenQuote={onOpenQuote} onOpenQuoteWithProduct={onOpenQuoteWithProduct} />

      {/* 2. Short Intro & Agricultural Heritage */}
      <IntroSection onOpenQuote={onOpenQuote} />

      {/* 3. Core Values */}
      <CoreValuesSection />

      {/* 4. Featured Products Grid */}
      <FeaturedProductsSection onOpenQuote={onOpenQuote} onOpenQuoteWithProduct={onOpenQuoteWithProduct} />

      {/* 5. Center Cinematic Video Showcase Section (Looping background video without voice) */}
      <RiceVideoShowcaseSection onOpenQuote={onOpenQuote} />

      {/* 6. Strong CTA Band */}
      <CtaBandSection onOpenQuote={onOpenQuote} />
    </main>
  );
}
