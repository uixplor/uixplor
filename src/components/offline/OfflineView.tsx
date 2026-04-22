import { useState } from "react";
import { motion } from "framer-motion";
import PageSEO from "@/components/seo/PageSEO";

export default function OfflineView() {
  const [isStillOffline, setIsStillOffline] = useState(false);

  const handleRetry = () => {
    if (typeof window !== "undefined") {
      if (navigator.onLine) {
        window.location.reload();
      } else {
        setIsStillOffline(true);
        setTimeout(() => setIsStillOffline(false), 2000);
      }
    }
  };

  return (
    <>
      <PageSEO
        title="Offline — No Connection"
        description="You appear to be offline. Check your internet connection and try again."
        path="/offline"
        noindex
      />

      <div
        className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden relative"
        style={{ background: "#0a0a0f" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
            top: "-10%",
            right: "-5%",
          }}
          animate={{ x: [0, -30, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            bottom: "-5%",
            left: "-8%",
          }}
          animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
            top: "60%",
            right: "10%",
          }}
          animate={{ x: [0, -15, 0], y: [0, -20, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="mb-8 px-4 py-1.5 rounded-full border text-[11px] font-semibold tracking-widest uppercase relative z-10"
          style={{
            borderColor: "rgba(34,211,238,0.35)",
            color: "#22d3ee",
            background: "rgba(34,211,238,0.08)",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          offline · no signal
        </motion.div>

        <motion.div
          className="mb-8 relative z-10"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl border relative"
            style={{
              background: "rgba(34,211,238,0.06)",
              borderColor: "rgba(34,211,238,0.2)",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: 40 + i * 24,
                  height: 40 + i * 24,
                  borderColor: `rgba(34,211,238,${0.3 - i * 0.08})`,
                }}
                animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
            <svg
              className="w-9 h-9 relative z-10"
              fill="none"
              stroke="#22d3ee"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          className="relative mb-6 select-none z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <div
            className="text-[64px] sm:text-[100px] lg:text-[130px] font-black leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.05)",
            }}
          >
            OFFLINE
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center text-[64px] sm:text-[100px] lg:text-[130px] font-black leading-none tracking-tighter"
            style={{
              background:
                "linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 60px rgba(34,211,238,0.25))",
            }}
          >
            OFFLINE
          </div>
        </motion.div>

        <motion.div
          className="mb-10 max-w-md relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            No Wi-Fi? No Life.
          </h1>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-1">
            Looks like you&apos;re disconnected from the matrix.
          </p>
          <p className="text-white/30 text-xs sm:text-sm">
            Check your internet and come back.
          </p>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 flex-wrap justify-center relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300"
              style={{
                background: isStillOffline
                  ? "#ef4444"
                  : "linear-gradient(135deg, #22d3ee, #818cf8)",
                color: isStillOffline ? "#ffffff" : "#0a0a0f",
              }}
              onMouseEnter={(e) =>
                !isStillOffline &&
                (e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(34,211,238,0.4)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {isStillOffline ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              )}

              {isStillOffline ? "Still Offline!" : "Retry Connection"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
