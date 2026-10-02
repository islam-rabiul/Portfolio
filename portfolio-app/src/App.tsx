import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

// Helper component to scroll window to top on route navigation or handle hash scrolls
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col relative bg-background text-foreground transition-colors duration-500">
          
          {/* Theme Figures Decorative Background Shapes */}
          <div className="theme-figures" aria-hidden="true">
            <span className="theme-figure theme-figure-left" />
            <span className="theme-figure theme-figure-center" />
            <span className="theme-figure theme-figure-right" />
          </div>

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Route View */}
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />

        </div>
      </Router>
    </ThemeProvider>
  );
}
