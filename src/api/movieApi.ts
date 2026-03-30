import axiosClient from '@/lib/axios';
import { 
  MovieResponse, 
  VideoResponse, 
  MovieDetail, 
  CreditsResponse, 
  Movie 
} from '@/types/movie';
import { filterCleanContent } from '@/utils/contentFilter';

const fetchQuantity = async (
  endpoint: string,
  params: Record<string, string | number | undefined>, 
  targetCount: number = 12
): Promise<MovieResponse> => {
  let currentPage = Number(params.page) || 1;
  let bucketMovies: Movie[] = []; 
  let lastResponse: MovieResponse | null = null; 

  while (bucketMovies.length < targetCount) {
    const response = (await axiosClient.get(endpoint, {
      params: { ...params, page: currentPage, include_adult: false },
    })) as MovieResponse;

    lastResponse = response;

    const cleanedData = filterCleanContent(lastResponse);

    if (cleanedData && cleanedData.results) {
      bucketMovies = [...bucketMovies, ...cleanedData.results];
    }

    if (currentPage >= lastResponse.total_pages) {
      break;
    }

    if (bucketMovies.length < targetCount) {
      currentPage++;
    }
  }

  if (!lastResponse) {
    throw new Error("Không thể tải dữ liệu từ máy chủ");
  }

  const exactMovies = bucketMovies.slice(0, targetCount);

  return {
    ...lastResponse,
    page: currentPage,
    results: exactMovies,
  };
};

export const movieApi = {
  getTrending: (type: 'movie' | 'tv', page: number = 1) =>
    fetchQuantity(`/trending/${type}/day`, { page }),

  getTopRated: (type: 'movie' | 'tv', page: number = 1) =>
    fetchQuantity(`/${type}/top_rated`, { page }),

  getPopular: (type: 'movie' | 'tv', page: number = 1) =>
    fetchQuantity(`/${type}/popular`, { page }),

  search: (type: 'movie' | 'tv', keyword: string, page: number = 1) =>
    fetchQuantity(`/search/${type}`, { query: keyword, page }),

  getSimilar: (type: 'movie' | 'tv', id: number, page: number = 1) =>
    fetchQuantity(`/${type}/${id}/similar`, { page }),

  getVideos: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}/videos`) as Promise<VideoResponse>,

  getDetail: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}`) as Promise<MovieDetail>,

  getCredits: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}/credits`) as Promise<CreditsResponse>,
};