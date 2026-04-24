"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import ShadowCard from "./ShadowCard";

interface Shadow {
  id: string;
  name: string;
  css: string;
  category: string;
}

interface ShadowShowcaseProps {
  shadows: Shadow[];
}

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "token", label: "Tokens" },
  { key: "soft", label: "Soft" },
  { key: "layered", label: "Layered" },
  { key: "deep", label: "Deep" },
  { key: "neumorphic", label: "Neumorphic" },
  { key: "glow", label: "Glow" },
  { key: "inset", label: "Inset" },
];

export default function ShadowShowcase({ shadows }: ShadowShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredShadows = useMemo(() => {
    if (activeCategory === "all") return shadows;
    return shadows.filter((s) => s.category === activeCategory);
  }, [shadows, activeCategory]);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 sm:mb-12 justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count =
            cat.key === "all"
              ? shadows.length
              : shadows.filter((s) => s.category === cat.key).length;

          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-cubic-bezier(0.4,0,0.2,1) active:scale-95 ${
                isActive
                  ? "bg-[#1a1a2e] text-white shadow-var(--shadow-sm)"
                  : "bg-white text-[#1a1a2e]/60 hover:bg-[#f0f1f4] hover:text-[#1a1a2e]"
              }`}
              style={{
                border: isActive
                  ? "1px solid transparent"
                  : "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              {cat.label}
              <span
                className={`ml-1.5 text-xs ${
                  isActive ? "text-white/60" : "text-[#1a1a2e]/30"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Shadow Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
        layout
      >
        {filteredShadows.map((shadow, index) => (
          <ShadowCard
            key={shadow.id}
            id={shadow.id}
            name={shadow.name}
            css={shadow.css}
            category={shadow.category}
            index={index}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredShadows.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#1a1a2e]/40 text-lg">
            No shadows found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
