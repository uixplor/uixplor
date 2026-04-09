import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { geistMono, poppins } from "../utils/fonts";
import "@/styles/globals.css";
import WebLayout from "@/layouts/webLayout";
import OfflineView from "@/components/offline/OfflineView";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isOffline, setIsOffline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
    }

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    const handleRouteChangeStart = () => {
      if (!navigator.onLine) {
        router.events.emit("routeChangeError");
        throw "Offline mode: Navigation Cancelled (Don't worry, this is intentional)";
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>UIXplor</title>
      </Head>

      <div className={`${poppins.className} ${geistMono.variable} antialiased`}>
        <WebLayout>
          {isOffline ? <OfflineView /> : <Component {...pageProps} />}
        </WebLayout>

        <Analytics />
        <SpeedInsights />
      </div>
    </>
  );
}
