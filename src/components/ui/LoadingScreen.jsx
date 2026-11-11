import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FCFBF8] text-forest-950 overflow-hidden pointer-events-none"
        >
          {/* Subtle warm golden ambient glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-gold-200/40 blur-[100px] pointer-events-none" />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Real Logo Image */}
            <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
              <img
                src="/brand/logo-icon.png"
                alt="Modular Traders Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(14,53,40,0.12)]"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-forest-950 uppercase text-center"
            >
              MODULAR
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[11px] md:text-xs font-sans tracking-[0.3em] text-gold-700 uppercase mt-1 text-center font-bold"
            >
              CULTIVATING TRUST
            </motion.p>

            {/* Elegant Loading Line */}
            <div className="w-32 h-[2px] bg-sand-200 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-gold-500 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
