"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Movie } from '@/types/movie';
import { movieApi } from '@/api/movieApi'; 
import Link from 'next/link';

const BannerSlide = ({ items }: { items: Movie[] }) => {
  const [trailerSrc, setTrailerSrc] = useState<string | null>(null);

  const handleWatchTrailer = async (id: number) => {
    try {
      const res = await movieApi.getVideos('movie', id); 
      const trailer = res.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
      
      if (trailer) {
        setTrailerSrc(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      } else {
        alert("Xin lỗi, phim này hiện chưa có trailer!");
      }
    } catch (error) {
      console.error("Lỗi lấy trailer:", error);
    }
  };

  return (
    <div className="hero-slide relative">
      <Swiper 
        modules={[Autoplay]} 
        grabCursor={true} 
        spaceBetween={0} 
        slidesPerView={1} 
        autoplay={{ delay: 5000 }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <div 
                className="relative h-[36rem] md:h-[40rem] lg:h-[52rem] px-4 md:px-12 pt-28 pb-12 md:pt-40 lg:py-32 flex items-center bg-center bg-cover before:content-[''] before:absolute before:inset-0 before:bg-black/60 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 md:after:h-40 after:bg-gradient-to-t after:from-black-main after:to-transparent"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}
              >
                <div className="max-w-screen-2xl z-10 flex items-center justify-between w-full mx-auto">
                  <div className="w-full lg:w-2/3 px-4">
                    <h2 className={`font-bold text-4xl md:text-5xl lg:text-8xl text-white transition duration-700 ease-in-out line-clamp-2 md:line-clamp-none ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}>
                      {item.title}
                    </h2>
                    
                    <p className={`font-medium text-white text-sm md:text-lg lg:text-xl my-6 md:my-12 transition duration-700 delay-300 ease-in-out ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 line-clamp-3 md:line-clamp-4 lg:line-clamp-none'}`}>
                      {item.overview}
                    </p>
                    
                    <div className={`flex flex-wrap gap-4 transition duration-700 delay-500 ease-in-out ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}>
                                   
                      <Link 
                        href={`/movie/${item.id}`}
                        className="btn-sm md:btn-lg btn-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,0,0.8)] hover:border-red-500 border border-transparent flex items-center justify-center"
                      >
                        Watch now
                      </Link>

                      <button 
                        onClick={() => handleWatchTrailer(item.id)}
                        className="btn-sm md:btn-lg btn-default transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      >
                        Watch trailer
                      </button>

                    </div>
                  </div>
                  <div className="hidden lg:block lg:w-1/3">
                    <img className={`w-96 rounded-3xl animate-scale transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-0'}`} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="Poster" />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- PHẦN POPUP TRAILER (MODAL) --- */}
      {trailerSrc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all duration-300">
          <div className="relative w-full max-w-screen-md aspect-video bg-black-main shadow-2xl border border-white/10 p-2 md:p-8">
            <iframe 
              src={trailerSrc} 
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            ></iframe>
            <button 
              onClick={() => setTrailerSrc(null)}
              className="absolute top-2 right-2 text-3xl text-white cursor-pointer hover:text-red-main transition-colors z-[110]"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em">
                <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerSlide;