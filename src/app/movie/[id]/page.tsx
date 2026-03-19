/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import { movieApi } from "@/api/movieApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import MovieCard from "@/components/MovieCard";
import { NextPageProps } from "@/types/next"; 
import { useUnwrapParams } from "@/hooks/useParams"; 

export default function MovieDetailPage({ params }: NextPageProps) {
  const { id } = useUnwrapParams(params);
  const movieId = Number(id);

  const { data: movie, isLoading: loadMovie } = useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => movieApi.getDetail("movie", movieId),
  });

  const { data: credits } = useQuery({
    queryKey: ["movie-credits", movieId],
    queryFn: () => movieApi.getCredits("movie", movieId),
  });

  const { data: videos } = useQuery({
    queryKey: ["movie-videos", movieId],
    queryFn: () => movieApi.getVideos("movie", movieId),
  });

  const { data: similar } = useQuery({
    queryKey: ["movie-similar", movieId],
    queryFn: () => movieApi.getSimilar("movie", movieId),
  });

  if (loadMovie) {
    return (
      <div className="h-screen flex items-center justify-center bg-black-main text-white">
        <div className="w-12 h-12 border-4 border-red-main border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) return <div className="text-white text-center py-20">Không tìm thấy phim.</div>;

  const youtubeVideos = videos?.results.filter((v) => v.site === "YouTube").slice(0, 5) || [];
  const casts = credits?.cast.slice(0, 8) || [];

  return (
    <main className="bg-black-main">
      {/* Banner Section */}
      <div 
        className="relative px-4 md:px-8 lg:px-16 pt-32 pb-12 md:pb-20 bg-center bg-no-repeat bg-cover z-0 
                   before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-black-main before:-z-10 
                   after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-black-main after:to-transparent after:-z-10"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="flex flex-col md:flex-row items-start max-w-screen-2xl mx-auto">
          {/* Poster: Hiện trên PC, ẩn trên Mobile */}
          <div className="hidden md:block w-64 lg:w-96 px-4 shrink-0">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="w-full rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 border border-white/10" 
            />
          </div>

          <div className="px-4 flex-1 flex flex-col justify-between lg:pl-10">
            <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl drop-shadow-2xl">
              {movie.title}
            </h2>
            
            <div className="py-4 flex flex-wrap items-center gap-2">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="bg-black-main/80 backdrop-blur-sm px-4 py-1 border-2 border-white/30 hover:border-white transition-colors rounded-full text-white text-xs lg:text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="py-2 lg:py-4 text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
              {movie.overview}
            </p>

            <div className="py-2 lg:py-4 mt-4">
              <h3 className="text-white text-xl font-medium mb-4 border-l-4 border-red-main pl-3">Casts</h3>
              <div className="flex flex-wrap -mx-2 mt-1">
                {casts.map((actor) => (
                  <div key={actor.id} className="w-24 md:w-28 px-2 mb-4 group">
                    <div className="relative overflow-hidden rounded-xl mb-2 border border-white/10 group-hover:border-red-500 transition-colors aspect-[2/3] bg-gray-900 shadow-lg">
                        <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/assets/no-avatar.jpg'} 
                                alt={actor.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                loading="lazy"
                        />
                    </div>
                    <span className="text-white text-xs md:text-sm font-medium line-clamp-2 leading-tight">
                      {actor.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
        {youtubeVideos.map((video) => (
          <div key={video.id} className="mb-16">
            <h3 className="text-white text-lg md:text-2xl font-semibold mb-6 border-l-4 border-red-main pl-3">{video.name}</h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe src={`https://www.youtube.com/embed/${video.key}`} title={video.name} className="w-full h-full" allowFullScreen></iframe>
            </div>
          </div>
        ))}
      </div>

      {similar?.results && similar.results.length > 0 && (
        <div className="px-4 md:px-8 lg:px-16 pb-24 max-w-screen-2xl mx-auto">
            <h4 className="text-white text-lg md:text-2xl font-semibold mb-8 border-l-4 border-red-main pl-3">
            Similar Movies
            </h4>
            
            <Swiper 
            modules={[Autoplay]} 
            autoplay={{
                delay: 3000, 
                disableOnInteraction: false, 
                pauseOnMouseEnter: true, 
            }}
            grabCursor={true} 
            spaceBetween={20} 
            slidesPerView={'auto'}
            className="!overflow-visible"
            >
            {similar.results.map((item) => (
                <SwiperSlide key={item.id} className="!w-[150px] md:!w-[200px] lg:!w-[240px]">
                <MovieCard item={item} category="movie" />
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
      )}
    </main>
  );
}