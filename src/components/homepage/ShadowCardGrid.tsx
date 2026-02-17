'use client';

import data from '@/utils/Data/shadow.json';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function ShadowCardGrid() {
  const shadows = data as { id: number; name: string; code: string; categories: string[] }[];
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(`box-shadow: ${code};`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="container px-18 py-28 bg-[#ffffff] rounded-2xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {shadows.map((shadow, index) => (
          <motion.div
            key={shadow.id}
            onClick={() => handleCopy(shadow.code, shadow.id)}
            className="shadow-card w-full max-w-[200px] h-[130px] mx-auto bg-white backdrop-blur-sm border border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-800 cursor-pointer relative overflow-hidden"
            style={{ boxShadow: shadow.code }}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.03
              }
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -1, 1, 0],
              transition: {
                scale: { duration: 0.2 },
                rotate: { duration: 0.3 }
              }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent bg-white to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{
                x: '100%',
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
            />

            <span className="font-semibold relative z-10 text-sm">{shadow.name}</span>

            {/* Animated copied feedback */}
            {copiedId === shadow.id && (
              <motion.span
                className="text-xs text-primary mt-2 relative z-10"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                ✓ Copied!
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

