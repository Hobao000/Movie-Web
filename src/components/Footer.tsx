"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Live', href: '/' },
    { name: 'You must watch', href: '/' },
    { name: 'Contact us', href: '/' },
    { name: 'FAQ', href: '/' },
    { name: 'Recent release', href: '/' },
    { name: 'Term of services', href: '/' },
    { name: 'Premium', href: '/' },
    { name: 'Top IMDB', href: '/' },
    { name: 'About us', href: '/' },
    { name: 'Privacy policy', href: '/' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer 
      className="min-h-[400px] lg:min-h-[480px] px-8 py-12 md:p-16 bg-cover bg-center bg-no-repeat relative" 
      style={{ backgroundImage: 'url("/assets/footer-bg-ft.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/80 pointer-events-none z-0"></div>

      {/* Nội dung Footer */}
      <div className="max-w-4xl h-full mx-auto flex flex-col justify-around relative z-20 gap-12">
        
        {/* Logo */}
        <Link 
          href="/" 
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center justify-center -translate-x-4.5 hover:cursor-pointer group"
        >
          <Image
            src="/assets/logo-movie.png" 
            alt="Logo"
            width={150}  
            height={150} 
            className="mr-2 md:mr-4 w-16 md:w-24 lg:w-32 h-auto object-contain" 
           />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-500 transition-colors duration-300">
            BaoMovies
          </h1>
        </Link>

        {/* Danh sách các Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white font-semibold text-base md:text-xl items-start text-center md:text-left">
          {footerLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-red-500 transition-colors duration-200 block py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;