'use client';

import { useEffect, useRef } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AppPreview from './components/AppPreview';
import Commands from './components/Commands';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import JumpingDot from './components/JumpingDot';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <JumpingDot />
      <Nav />
      <Hero />
      <AppPreview />
      <Commands />
      <HowItWorks />
      <Features />
      <Integrations />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
