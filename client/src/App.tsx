import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter, useLocation } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GoatCounter from "./components/GoatCounter";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import TaxReady from "./pages/TaxReady";
import Form1099 from "./pages/Form1099";

function useNormalizedLocation() {
  const [path, navigate] = useBrowserLocation();
  const pathname = path.split("?")[0].split("#")[0];
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return [normalized, navigate] as ReturnType<typeof useBrowserLocation>;
}

function HashScroll() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const scroll = () => {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    };
    scroll();
    const timer = window.setTimeout(scroll, 60);
    return () => window.clearTimeout(timer);
  }, [location]);

  return null;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/tax-ready" component={TaxReady} />
      <Route path="/1099" component={Form1099} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter hook={useNormalizedLocation}>
            <HashScroll />
            <GoatCounter />
            <AppRoutes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
