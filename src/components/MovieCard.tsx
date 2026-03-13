"use client";

import Link from 'next/link';
import { Movie } from '@/types/movie';

interface Props {
  item: Movie;
  category: 'movie' | 'tv';
}

const MovieCard = ({ item, category }: Props) => {
  const bg = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  return (
    <Link href={`/${category}/${item.id}`} className="hover:cursor-pointer group/container block">
      <div 
        className="relative w-full h-72 2xl:h-80 rounded-3xl bg-center bg-cover group/poster 
                   after:content-[''] after:absolute after:inset-0 after:rounded-3xl 
                   hover:after:bg-black/60 after:transition after:duration-300
                   /* Hiệu ứng sáng viền nhẹ cho cả card khi hover */
                   hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all duration-300"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <button 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     py-4 px-8 bg-red-main rounded-full text-white text-xl 
                     scale-50 opacity-0 transition-all ease-in-out duration-300 
                     group-hover/poster:opacity-100 group-hover/poster:scale-100 
                     /* Hiệu ứng sáng rực đỏ khi trỏ vào nút Play */
                     hover:shadow-[0_0_30px_#ff0000] hover:scale-110 shadow-2xl"
        >
           <svg stroke="currentColor" fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
             <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
           </svg>
        </button>
      </div>

      <h3 className="font-medium text-white text-sm md:text-lg mt-4 transition duration-300 group-hover/container:text-red-main line-clamp-1">
        {item.title || item.name}
      </h3>
    </Link>
  );
};

export default MovieCard;