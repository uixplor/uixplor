'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNetworkStatus, type NetworkState } from '@/hooks/useNetworkStatus';

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hr ago';
  return `${hours} hrs ago`;
}

const DOT_COLORS: Record<NetworkState, string> = {
  operational: '#B8FB3C',
  degraded: '#fbbf24',
  error: '#f87171',
  offline: '#6b7280',
};

const GLOW_COLORS: Record<NetworkState, string> = {
  operational: 'rgba(184,251,60,0.4)',
  degraded: 'rgba(251,191,36,0.4)',
  error: 'rgba(248,113,113,0.5)',
  offline: 'rgba(107,114,128,0.3)',
};

const STATE_LABELS: Record<NetworkState, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  error: 'Error',
  offline: 'Offline',
};

const GRAPH_W = 200;
const GRAPH_H = 40;
const GRAPH_POINTS = 20;

function LatencySparkline({ history, color, glowColor }: { history: number[]; color: string; glowColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const pointsRef = useRef<number[]>([]);

  useEffect(() => {
    const padded = [...history];
    while (padded.length < GRAPH_POINTS) padded.unshift(0);
    pointsRef.current = padded.slice(-GRAPH_POINTS);
  }, [history]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = GRAPH_W * dpr;
    canvas.height = GRAPH_H * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, GRAPH_W, GRAPH_H);

    const pts = pointsRef.current;
    const maxVal = Math.max(...pts, 100);
    const padding = 4;
    const drawH = GRAPH_H - padding * 2;
    const stepX = GRAPH_W / (GRAPH_POINTS - 1);

    offsetRef.current = (offsetRef.current + 0.3) % stepX;

    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 4; i++) {
      const y = padding + (drawH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GRAPH_W, y);
      ctx.stroke();
    }

    const getY = (val: number) => padding + drawH - (val / maxVal) * drawH;

    const gradient = ctx.createLinearGradient(0, 0, 0, GRAPH_H);
    gradient.addColorStop(0, glowColor);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.moveTo(0, GRAPH_H);

    for (let i = 0; i < pts.length; i++) {
      const x = i * stepX;
      const y = getY(pts[i]);

      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        const prevX = (i - 1) * stepX;
        const prevY = getY(pts[i - 1]);
        const cpx1 = prevX + stepX * 0.4;
        const cpx2 = x - stepX * 0.4;
        ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
      }
    }

    ctx.lineTo(GRAPH_W, GRAPH_H);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const x = i * stepX;
      const y = getY(pts[i]);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = (i - 1) * stepX;
        const prevY = getY(pts[i - 1]);
        const cpx1 = prevX + stepX * 0.4;
        const cpx2 = x - stepX * 0.4;
        ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
      }
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (pts.length > 0) {
      const lastX = (pts.length - 1) * stepX;
      const lastY = getY(pts[pts.length - 1]);
      ctx.beginPath();
      ctx.arc(lastX, lastY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(lastX, lastY, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, [color, glowColor]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: GRAPH_W, height: GRAPH_H, display: 'block' }}
    />
  );
}

export default function StatusIndicator() {
  const status = useNetworkStatus();
  const [hovered, setHovered] = useState(false);
  const [, setTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 10000);
    return () => clearInterval(id);
  }, []);

  const color = DOT_COLORS[status.state];
  const glow = GLOW_COLORS[status.state];
  const showPulse = status.state === 'error' || status.state === 'offline';

  const avgLatency = status.latencyHistory.length > 0
    ? Math.round(status.latencyHistory.reduce((a, b) => a + b, 0) / status.latencyHistory.length)
    : null;

  const minLatency = status.latencyHistory.length > 0
    ? Math.min(...status.latencyHistory)
    : null;

  const maxLatency = status.latencyHistory.length > 0
    ? Math.max(...status.latencyHistory)
    : null;

  return (
    <div className="relative flex items-center">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative flex items-center justify-center w-8 h-8 rounded-full cursor-default"
        style={{ background: 'transparent' }}
        aria-label={`Server status: ${STATE_LABELS[status.state]}`}
        id="status-indicator"
      >
        {showPulse && (
          <span
            className="absolute rounded-full animate-ping"
            style={{
              width: 10,
              height: 10,
              backgroundColor: color,
              opacity: 0.5,
            }}
          />
        )}

        <motion.span
          className="relative block rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: color,
            boxShadow: `0 0 6px ${glow}, 0 0 12px ${glow}`,
          }}
          animate={{
            scale: showPulse ? [1, 1.15, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2 z-[100]"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="rounded-xl overflow-hidden min-w-[240px]"
              style={{
                background: 'rgba(12,12,18,0.95)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${color}20`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              <div className="px-4 pt-3 pb-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="block w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color, boxShadow: `0 0 4px ${glow}` }}
                  />
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color }}
                  >
                    {STATE_LABELS[status.state]}
                  </span>
                </div>

                <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {status.message}
                </p>
              </div>

              <div className="px-2">
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-center justify-between px-2 pt-1.5">
                    <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      Latency
                    </span>
                    {status.latency !== null && (
                      <span
                        className="text-[11px] font-bold tabular-nums"
                        style={{
                          color: status.latency > 1500
                            ? '#fbbf24'
                            : status.latency > 500
                              ? 'rgba(255,255,255,0.6)'
                              : '#B8FB3C',
                        }}
                      >
                        {status.latency}ms
                      </span>
                    )}
                  </div>
                  <LatencySparkline
                    history={status.latencyHistory}
                    color={color}
                    glowColor={glow}
                  />
                </div>
              </div>

              {avgLatency !== null && (
                <div className="px-4 pt-2 pb-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Min</span>
                        <span className="text-[10px] font-semibold tabular-nums" style={{ color: 'rgba(255,255,255,0.5)' }}>{minLatency}ms</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Avg</span>
                        <span className="text-[10px] font-semibold tabular-nums" style={{ color: 'rgba(255,255,255,0.5)' }}>{avgLatency}ms</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Max</span>
                        <span className="text-[10px] font-semibold tabular-nums" style={{ color: 'rgba(255,255,255,0.5)' }}>{maxLatency}ms</span>
                      </div>
                    </div>
                    <span className="text-[9px] tabular-nums" style={{ color: 'rgba(255,255,255,0.15)' }}>
                      {status.latencyHistory.length}/{GRAPH_POINTS}
                    </span>
                  </div>
                </div>
              )}

              {status.lastChecked && (
                <div
                  className="flex items-center justify-between px-4 py-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Last checked
                  </span>
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {timeAgo(status.lastChecked)}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
