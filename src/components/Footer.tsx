import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
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

  return (
    <div 
      className="min-h-[400px] lg:min-h-[480px] px-8 py-12 md:p-16 bg-cover bg-center bg-no-repeat relative" 
      style={{ backgroundImage: 'url("/assets/footer-bg-ft.jpg")' }}
    >
      {/* phủ mờ (overlay) đen để chữ nổi bật hơn trên nền ảnh */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Nội dung Footer */}
      <div className="max-w-4xl h-full mx-auto flex flex-col justify-around relative z-10 gap-12">
        
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center hover:cursor-pointer group">
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
              className="hover:text-red-500 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Footer;