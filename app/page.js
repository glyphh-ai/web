'use client';

import { useEffect, useRef } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Swarm from './components/Swarm';
import Commands from './components/Commands';
import Features from './components/Features';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import Download from './components/Download';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import JumpingDot from './components/JumpingDot';
import HeroVideo from './components/HeroVideo';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    function observeAll() {
      document.querySelectorAll('.reveal').forEach(el => {
        // Re-add revealed if already in viewport (back-nav / bfcache)
        el.classList.remove('revealed');
        observer.observe(el);
      });
    }

    observeAll();

    // Handle bfcache restore (browser back/forward)
    const onPageShow = (e) => {
      if (e.persisted) observeAll();
    };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      observer.disconnect();
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return (
    <>
      <JumpingDot />
      <Nav />
      <Hero />
      <HeroVideo />
      <Integrations />
      <Commands />
      <Swarm />
      <Features />
      <Pricing />
      <Download />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
