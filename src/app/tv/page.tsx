"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { movieApi } from "@/api/movieApi";
import MovieCard from "@/components/MovieCard";
import { MovieResponse, MovieSearchParams } from "@/types/movie"; 
import { NextPageProps } from "@/types/next";
import { useUnwrapParams } from "@/hooks/useParams";

export default function TVSeriesPage({ searchParams }: NextPageProps) {
  const resolvedSearchParams = useUnwrapParams(searchParams!) as MovieSearchParams;
  const currentType = resolvedSearchParams?.type || "popular";

  const [keyword, setKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieResponse>({
    // QueryKey có currentType để tự động tải lại khi đổi mục (Popular/Top Rated)
    queryKey: ["tv-series", searchQuery, currentType], 
    queryFn: ({ pageParam = 1 }) => {
      // Ưu tiên 1: Search theo từ khóa nếu có
      if (searchQuery) {
        return movieApi.search("tv", searchQuery, pageParam as number);
      }
      
      // Ưu tiên 2: Nếu bấm View More "Top Rated TV" từ trang Home
      if (currentType === "top_rated") {
        return movieApi.getTopRated("tv", pageParam as number);
      }
      
      // Mặc định: Lấy TV Popular
      return movieApi.getPopular("tv", pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(keyword);
  };

  const tvShows = data?.pages.flatMap((page) => page.results) || [];

  // Tiêu đề động cho Banner
  const getPageTitle = () => {
    if (searchQuery) return `Search: ${searchQuery}`;
    return currentType === "top_rated" ? "Top Rated TV Series" : "Popular TV Series";
  };

  return (
    <main className="bg-black-main min-h-screen">
      <div>
        {/* SỬA BANNER TẠI ĐÂY: Xóa -mt-[140px] pt-[120px] và thêm responsive height */}
        <div 
          className="relative h-[15rem] md:h-[25rem] bg-[url('/assets/footer-bg-1.jpg')] bg-cover bg-center bg-no-repeat 
                     after:content-[''] after:absolute after:inset-0 
                     after:bg-gradient-to-t after:from-black-main after:to-transparent"
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold z-10 tracking-widest text-center w-full px-4 drop-shadow-lg ">
            {getPageTitle()}
          </span>
        </div>

        <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16 relative z-20">
          <div className="max-w-screen-2xl mx-auto">
            
            {/* Thanh Search */}
            <form 
              onSubmit={handleSearch}
              className="flex items-center relative rounded-full bg-black/40 backdrop-blur-md w-full md:w-fit lg:w-fit border border-white/10 p-1 mb-12 shadow-xl"
            >
              <input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="outline-none border-none rounded-full px-6 py-3 bg-transparent placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
              />
              <button className="btn-sm btn-primary py-2 px-10 rounded-full shadow-lg hover:shadow-red-main/50 transition-all font-bold" type="submit">
                Search
              </button>
            </form>

            {/* TV Series Grid */}
            <div className="flex flex-wrap -mx-2">
              {tvShows.map((item, index) => (
                <div key={`${item.id}-${index}`} className="px-2 w-1/2 md:w-1/4 lg:w-1/6 mb-8">
                  {/* category="tv" */}
                  <MovieCard item={item} category="tv" />
                </div>
              ))}
            </div>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="w-full py-20 flex justify-center">
                <div className="w-10 h-10 border-4 border-red-main border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Nút Watch More */}
            {hasNextPage && (
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