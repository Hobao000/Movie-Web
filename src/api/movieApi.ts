import axiosClient from '@/lib/axios';
import { MovieResponse, VideoResponse, MovieDetail, CreditsResponse } from '@/types/movie';
import { filterCleanContent } from '@/utils/contentFilter';

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
        include_adult: false,
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