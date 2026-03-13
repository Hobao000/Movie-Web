"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useScroll } from '@/hooks/useScroll'; 
import { useActivePath } from '@/hooks/useActivePath'; 

const Header = () => {
  const isScrolled = useScroll(50); 
  const { checkActive } = useActivePath(); 

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movie' },
    { name: 'TV Series', href: '/tv' },
  ];

  const textShadowClass = "drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] md:drop-shadow-[0_2px_5px_rgba(0,0,0,1)]";

  return (
    <div 
      className={`px-4 md:px-16 flex justify-center fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-black/95 py-3 md:py-5 shadow-2xl backdrop-blur-md'
          : 'bg-transparent py-4 md:py-14'
      }`}
    >
      <div className="max-w-screen-2xl flex flex-col md:flex-row justify-between items-center w-full gap-2 md:gap-0">
        
        {/* LOGO & BRAND NAME */}
        <Link href="/" className="flex items-center hover:cursor-pointer group">
          <Image
            src="/assets/logo-movie.png"
            alt="Logo"
            width={150}
            height={150}
            className={`mr-2 md:mr-6 w-10 md:w-16 h-auto object-contain scale-150 origin-left transition-transform duration-500 ${!isScrolled && 'drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]'}`} 
          />
          <h1 className={`text-white font-extrabold text-2xl md:text-5xl tracking-tighter group-hover:text-red-500 transition-colors duration-300 ${!isScrolled && textShadowClass}`}>
            BaoMovies
          </h1> 
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center justify-center md:justify-end w-full md:w-auto overflow-x-auto no-scrollbar">
          {navLinks.map((link, index) => {
            const isActive = checkActive(link.href);

            return (
              <div key={index} className="px-3 md:px-6"> 

                <Link 
                  href={link.href} 
                  className={`relative text-lg md:text-2xl font-bold whitespace-nowrap text-white hover:text-red-500 transition-colors duration-300 py-2 group block ${!isScrolled && textShadowClass}`}
                >
                  {link.name} 
                  {/* hiệu ứng gạch chân đỏ khi link active*/}
                  <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-red-500 rounded-full transition-transform duration-500 ease-in-out origin-center
                  ${isActive 
                      ? 'scale-x-100' 
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  ></span> 
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;