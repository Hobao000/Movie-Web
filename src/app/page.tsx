"use client";

import { useQuery } from '@tanstack/react-query';
import { movieApi } from '@/api/movieApi';
import BannerSlide from '@/components/BannerSilde';
import MovieCard from '@/components/MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import { Movie, MovieResponse } from '@/types/movie';
import Link from 'next/link';

export default function HomePage() {
  const { data: trendingMovies, isLoading: isLoadTrending } = useQuery<MovieResponse>({
    queryKey: ['trendingMovies'],
    queryFn: () => movieApi.getTrending('movie'),
  });

  const { data: topMovies, isLoading: isLoadTopMovie } = useQuery<MovieResponse>({
    queryKey: ['topMovies'],
    queryFn: () => movieApi.getTopRated('movie'),
  });

  const { data: trendingTV, isLoading: isLoadTV } = useQuery<MovieResponse>({
    queryKey: ['trendingTV'],
    queryFn: () => movieApi.getTrending('tv'),
  });

  const { data: topTV, isLoading: isLoadTopTV } = useQuery<MovieResponse>({
    queryKey: ['topTV'],
    queryFn: () => movieApi.getTopRated('tv'),
  });

  const isLoadingAll = isLoadTrending || isLoadTopMovie || isLoadTV || isLoadTopTV;

  if (isLoadingAll) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black-main text-white">
        <div className="w-12 h-12 border-4 border-red-main border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-xl animate-pulse">BaoMovies đang nạp phim...</p>
      </div>
    );
  }

  return (
    <main className="bg-black-main">
      
      <BannerSlide items={trendingMovies?.results.slice(0, 5) || []} />

      <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          
          <MovieSection 
            title="Trending Movies" 
            items={trendingMovies?.results} 
            category="movie" 
            viewMoreHref="/movie?type=popular"
          />

          <MovieSection 
            title="Top Rated Movies" 
            items={topMovies?.results} 
            category="movie" 
            viewMoreHref="/movie?type=top_rated"
          />

          <MovieSection 
            title="Trending TV" 
            items={trendingTV?.results} 
            category="tv" 
            viewMoreHref="/tv?type=popular"
          />

          <MovieSection 
            title="Top Rated TV" 
            items={topTV?.results} 
            category="tv" 
            viewMoreHref="/tv?type=top_rated"
          />

        </div>
      </div>
    </main>
  );
}

interface MovieSectionProps {
  title: string;
  items?: Movie[];
  category: 'movie' | 'tv';
  viewMoreHref: string;
}

const MovieSection = ({ title, items, category, viewMoreHref }: MovieSectionProps) => (
  <section className="mt-8 first:mt-0">
    <div className="flex items-center justify-between mb-8 text-white px-2">
      <span className="font-bold text-xl md:text-2xl border-l-4 border-red-600 pl-4">{title}</span>
      <Link href={viewMoreHref} className="btn-sm btn-default opacity-80 hover:opacity-100 transition-all cursor-pointer">
        View more
      </Link>
    </div>
    
    <Swiper 
      modules={[Autoplay]}
      autoplay={{
        delay: 3000, 
        disableOnInteraction: false, 
        pauseOnMouseEnter: true, 
      }}
      grabCursor={true} 
      spaceBetween={16} 
      slidesPerView={'auto'}
      className="!overflow-visible"
    >
      {items?.map((item, index) => (
        <SwiperSlide key={`${item.id}-${index}`} className="!w-[150px] md:!w-[200px] lg:!w-[220px]">
          <MovieCard item={item} category={category} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);