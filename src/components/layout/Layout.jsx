import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Lenis from 'lenis';

const Layout = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const [displayChildren, setDisplayChildren] = useState(currentOutlet);
  const [transitioning, setTransitioning] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Lenis Setup
    let lenis;
    if (scrollRef.current) {
      lenis = new Lenis({
        wrapper: scrollRef.current,
        content: scrollRef.current.firstElementChild,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayChildren(currentOutlet);
      setTransitioning(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]); // Removed currentOutlet from dep to prevent retriggering on outlet update before timer

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/40 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main
          ref={scrollRef}
          className={`flex-1 overflow-y-auto custom-scrollbar transition-opacity duration-150 ${
            transitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto p-6 page-enter min-h-max">
            {displayChildren}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
