import { useState, useEffect, useCallback, useRef } from 'react';

export type NetworkState = 'operational' | 'degraded' | 'error' | 'offline';

export interface NetworkStatus {
  state: NetworkState;
  statusCode: number | null;
  latency: number | null;
  latencyHistory: number[];
  message: string;
  lastChecked: Date | null;
}

const POLL_INTERVAL = 15000;
const SLOW_THRESHOLD = 1500;
const HEALTH_URL = '/health.json';
const HISTORY_SIZE = 20;

function resolveState(online: boolean, code: number | null, latency: number | null, history: number[]): NetworkStatus {
  if (!online) {
    return {
      state: 'offline',
      statusCode: null,
      latency: null,
      latencyHistory: history,
      message: "You're offline",
      lastChecked: new Date(),
    };
  }

  if (code === null) {
    return {
      state: 'error',
      statusCode: null,
      latency: null,
      latencyHistory: history,
      message: 'Unable to reach server',
      lastChecked: new Date(),
    };
  }

  if (code >= 500) {
    return {
      state: 'error',
      statusCode: code,
      latency,
      latencyHistory: history,
      message: `Status: ${code} — Server error, please try again later`,
      lastChecked: new Date(),
    };
  }

  if (code >= 300 || (latency !== null && latency > SLOW_THRESHOLD)) {
    return {
      state: 'degraded',
      statusCode: code,
      latency,
      latencyHistory: history,
      message: `Status: ${code} — Some features may be slower than usual`,
      lastChecked: new Date(),
    };
  }

  return {
    state: 'operational',
    statusCode: code,
    latency,
    latencyHistory: history,
    message: `Status: ${code} — Everything is working fine`,
    lastChecked: new Date(),
  };
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    state: 'operational',
    statusCode: null,
    latency: null,
    latencyHistory: [],
    message: 'Checking…',
    lastChecked: null,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const historyRef = useRef<number[]>([]);

  const check = useCallback(async () => {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;

    if (!online) {
      setStatus(resolveState(false, null, null, historyRef.current));
      return;
    }

    try {
      const start = performance.now();
      const res = await fetch(`${HEALTH_URL}?_=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
      });
      const latency = Math.round(performance.now() - start);
      historyRef.current = [...historyRef.current.slice(-(HISTORY_SIZE - 1)), latency];
      setStatus(resolveState(true, res.status, latency, historyRef.current));
    } catch {
      setStatus(resolveState(true, null, null, historyRef.current));
    }
  }, []);

  useEffect(() => {
    check();
    timerRef.current = setInterval(check, POLL_INTERVAL);

    const goOnline = () => check();
    const goOffline = () => setStatus(resolveState(false, null, null, historyRef.current));

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, [check]);

  return status;
}

