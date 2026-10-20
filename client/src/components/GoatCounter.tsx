import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/**
 * One config value: the GoatCounter site code, such as "steadybooks".
 * Set VITE_GOATCOUNTER_CODE in the environment. An empty value loads nothing.
 */
const CODE = String(import.meta.env.VITE_GOATCOUNTER_CODE ?? "").trim();

function trackerIsConfigured(code: string) {
  return /^[a-z0-9]+$/i.test(code);
}

type GoatCounterApi = {
  no_onload?: boolean;
  count?: (vars: { path?: string }) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounterApi;
  }
}

/**
 * Loads GoatCounter only when VITE_GOATCOUNTER_CODE is a site code.
 * Counts the first view and each later SPA navigation, including the query string.
 */
export default function GoatCounter() {
  const [location] = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!trackerIsConfigured(CODE)) return;
    window.goatcounter = window.goatcounter ?? {};
    window.goatcounter.no_onload = true;
    if (document.querySelector("script[data-goatcounter]")) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!trackerIsConfigured(CODE)) return;
    const path = `${window.location.pathname}${window.location.search}`;
    let stopped = false;

    const send = () => {
      if (stopped || !window.goatcounter?.count) return false;
      if (lastPath.current === path) return true;
      window.goatcounter.count({ path });
      lastPath.current = path;
      return true;
    };

    if (send()) return;
    const timer = window.setInterval(() => {
      if (send()) window.clearInterval(timer);
    }, 200);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [location]);

  return null;
}
