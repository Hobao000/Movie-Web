"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { movieApi } from "@/api/movieApi";
import MovieCard from "@/components/MovieCard";
import { MovieResponse, MovieSearchParams } from "@/types/movie";
import { NextPageProps } from "@/types/next";
import { useUnwrapParams } from "@/hooks/useParams";

export default function MoviePage({ searchParams }: NextPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const resolvedSearchParams = useUnwrapParams(searchParams!) as MovieSearchParams & { query?: string };
  const currentType = resolvedSearchParams?.type || "popular";
  const currentQuery = resolvedSearchParams?.query || "";
  const [keyword, setKeyword] = useState(currentQuery);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieResponse>({
    queryKey: ["movies", currentQuery, currentType], 
    queryFn: ({ pageParam = 1 }) => {
      if (currentQuery) {
        return movieApi.search("movie", currentQuery, pageParam as number);
      }
      
      if (currentType === "top_rated") {
        return movieApi.getTopRated("movie", pageParam as number);
      }
      
      return movieApi.getPopular("movie", pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const bannedWords = ["18+", "sex", "porn", "jav", "hentai", "xxx", "gay", "lesbian", "18", "boobs", "boob", "tits", "tit"]; 
    const lowerKeyword = keyword.toLowerCase();

    const isBanned = bannedWords.some((word) => lowerKeyword.includes(word));

    if (isBanned) {
      alert("Từ khóa nhạy cảm! BaoMovies không hỗ trợ tìm kiếm nội dung này.");
      setKeyword(""); 
      return;
    }

    if (keyword.trim()) {
      router.push(`${pathname}?query=${encodeURIComponent(keyword)}`);
    } else {
      router.push(pathname); 
    }
  };

  const movies = data?.pages.flatMap((page) => page.results) || [];

  const getPageTitle = () => {
    if (currentQuery) return `Search: ${currentQuery}`;
    return currentType === "top_rated" ? "Top Rated Movies" : "Popular Movies";
  };

  return (
    <main className="bg-black-main min-h-screen">
      <div>

        <div 
          className="relative h-[15rem] md:h-[25rem] bg-[url('/assets/footer-bg-1.jpg')] bg-cover bg-center bg-no-repeat 
                     after:content-[''] after:absolute after:inset-0 
                     after:bg-gradient-to-t after:from-black-main after:to-transparent"
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold z-10 tracking-widest text-center w-full px-4 drop-shadow-lg uppercase">
            {getPageTitle()}
          </span>
        </div>

        <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16 relative z-20">
          <div className="max-w-screen-2xl mx-auto">
            
            {/* Thanh Search */}
            <form 
              onSubmit={handleSearch}
              className="flex items-center relative rounded-full bg-black/40 backdrop-blur-md w-full max-w-full md:w-fit lg:w-fit border border-white/10 p-1 mb-12 shadow-xl"
            >
              <input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="outline-none border-none rounded-full px-4 md:px-6 py-2 md:py-3 bg-transparent placeholder-gray-500 text-white flex-1 min-w-0 text-sm md:text-base md:w-96"
              />
              <button 
                className="btn-sm btn-primary py-2 px-5 md:px-10 rounded-full shadow-lg hover:shadow-red-main/50 transition-all font-bold text-sm md:text-base whitespace-nowrap" 
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Movie Grid */}
            <div className="flex flex-wrap -mx-2">
              {movies.map((item, index) => (
                <div key={`${item.id}-${index}`} className="px-2 w-1/2 md:w-1/4 lg:w-1/6 mb-8">
                  <MovieCard item={item} category="movie" />
                </div>
              ))}
            </div>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="w-full py-20 flex justify-center">
                <div className="w-10 h-10 border-4 border-red-main border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* THÔNG BÁO KHÔNG TÌM THẤY PHIM */}
            {!isLoading && movies.length === 0 && (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                <span className="text-6xl mb-4">🎬</span>
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">Không tìm thấy kết quả!</h3>
                <p className="text-gray-400 max-w-md">
                  Rất tiếc, BaoMovies không tìm thấy phim nào khớp với từ khóa &quot;<span className="text-red-main font-semibold">{currentQuery}</span>&quot;. Vui lòng thử lại với từ khóa khác nhé.
                </p>
              </div>
            )}

            {/* Nút Watch More */}
            {hasNextPage && movies.length > 0 && ( 
              <div className="text-center mt-12">
                <button 
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="btn-sm btn-default px-12 py-3 border border-white/20 hover:bg-red-main hover:border-red-main transition-all disabled:opacity-50 rounded-full font-bold"
                >
                  {isFetchingNextPage ? "Loading more..." : "Watch more"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}