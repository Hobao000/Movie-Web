import axiosClient from '@/lib/axios';
import { MovieResponse, VideoResponse, MovieDetail, CreditsResponse } from '@/types/movie';


const BANNED_REGEX = /\b(18\+|sex|porn|jav|hentai|xxx|gays?|lesbians?|18|boobs?|tits?|naked?|fuck?|child?|kid?|loli?)\b/i;

const filterCleanContent = (response: MovieResponse): MovieResponse => {
  if (response && response.results) {
    response.results = response.results.filter((item) => {
      const title = item.title || item.name || "";
      const originalTitle = item.original_title || item.original_name || "";
      
      const textToCheck = `${title} ${originalTitle}`.toLowerCase();
      
      return !BANNED_REGEX.test(textToCheck);
    });
  }
  return response;
};

export const movieApi = {
  getTrending: (type: 'movie' | 'tv', page: number = 1) =>
    (axiosClient.get(`/trending/${type}/day`, { 
      params: { page, include_adult: false } 
    }) as Promise<MovieResponse>).then(filterCleanContent),

  getTopRated: (type: 'movie' | 'tv', page: number = 1) =>
    (axiosClient.get(`/${type}/top_rated`, { 
      params: { page, include_adult: false } 
    }) as Promise<MovieResponse>).then(filterCleanContent),

  getPopular: (type: 'movie' | 'tv', page: number = 1) =>
    (axiosClient.get(`/${type}/popular`, { 
      params: { page, include_adult: false } 
    }) as Promise<MovieResponse>).then(filterCleanContent),

  getVideos: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}/videos`) as Promise<VideoResponse>,

  search: (type: 'movie' | 'tv', keyword: string, page: number = 1) =>
    (axiosClient.get(`/search/${type}`, {
      params: { 
        query: keyword,
        page,
        include_adult: false 
      }
    }) as Promise<MovieResponse>).then(filterCleanContent),
    
  getDetail: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}`) as Promise<MovieDetail>,

  getCredits: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}/credits`) as Promise<CreditsResponse>,

  getSimilar: (type: 'movie' | 'tv', id: number) =>
    (axiosClient.get(`/${type}/${id}/similar`, {
      params: { include_adult: false } 
    }) as Promise<MovieResponse>).then(filterCleanContent),
};