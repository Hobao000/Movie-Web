"use client";

import { useState } from 'react'; 
import Link from 'next/link';
import Image from 'next/image';
import { useScroll } from '@/hooks/useScroll'; 
import { useActivePath } from '@/hooks/useActivePath'; 

const Header = () => {
  const isScrolled = useScroll(50); 
  const { checkActive } = useActivePath(); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movie' },
    { name: 'TV Series', href: '/tv' },
  ];

  const textShadowClass = "drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] md:drop-shadow-[0_2px_5px_rgba(0,0,0,1)]";

  return (
    <div 
      className={`px-4 md:px-8 lg:px-16 flex justify-center fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black/95 py-3 md:py-5 shadow-2xl backdrop-blur-md'
          : 'bg-transparent py-4 md:py-14'
      }`}
    >
      <div className="max-w-screen-2xl flex flex-row justify-between items-center w-full">
        
        {/* LOGO & BRAND NAME */}
        <Link href="/" className="flex items-center hover:cursor-pointer group">
          <Image
            src="/assets/logo-movie.png"
            alt="Logo"
            width={150}
            height={150}
            className={`mr-2 md:mr-4 lg:mr-6 w-10 md:w-12 lg:w-16 h-auto object-contain scale-125 lg:scale-150 origin-left transition-transform duration-500 ${!isScrolled && 'drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]'}`} 
          />
          <h1 className={`text-white font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tighter group-hover:text-red-500 transition-colors duration-300 ${!isScrolled && textShadowClass}`}>
            BaoMovies
          </h1> 
        </Link>

        {/* Nút menu sổ */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

        {/* THANH NAVIGATION DESKTOP */}
        <div className="hidden md:flex items-center justify-end w-auto">
          {navLinks.map((link, index) => {
            const isActive = checkActive(link.href);
            return (
              <div key={index} className="px-3 lg:px-6"> 
                <Link 
                  href={link.href} 
                  className={`relative text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap text-white hover:text-red-500 transition-colors duration-300 py-2 group block ${!isScrolled && textShadowClass}`}
                >
                  {link.name} 
                  <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-red-500 rounded-full transition-transform duration-500 ease-in-out origin-center
                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  ></span> 
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* MENU XỔ XUỐNG DÀNH CHO MOBILE */}
      <div 
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10 md:hidden flex flex-col items-center gap-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-80 py-8 opacity-100' : 'max-h-0 py-0 opacity-0 border-transparent'
        }`}
      >
        {navLinks.map((link, index) => {
          const isActive = checkActive(link.href);
          return (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;