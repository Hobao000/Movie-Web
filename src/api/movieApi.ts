import axiosClient from '@/lib/axios';
// Nhớ import thêm MovieDetail và CreditsResponse ở đây nhé Bảo
import { MovieResponse, VideoResponse, MovieDetail, CreditsResponse } from '@/types/movie';

export const movieApi = {

  getTrending: (type: 'movie' | 'tv', page: number = 1) =>
    axiosClient.get(`/trending/${type}/day`, { params: { page } }) as Promise<MovieResponse>,

  getTopRated: (type: 'movie' | 'tv', page: number = 1) =>
    axiosClient.get(`/${type}/top_rated`, { params: { page } }) as Promise<MovieResponse>,

  getPopular: (type: 'movie' | 'tv', page: number = 1) =>
    axiosClient.get(`/${type}/popular`, { params: { page } }) as Promise<MovieResponse>,

  getVideos: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}/videos`) as Promise<VideoResponse>,

  // search khi dùng tìm kiếm 'Watch more' được kết quả tìm kiếm
  search: (type: 'movie' | 'tv', keyword: string, page: number = 1) =>
    axiosClient.get(`/search/${type}`, {
      params: { 
        query: keyword,
        page 
      }
    }) as Promise<MovieResponse>,
    
  // Lấy thông tin chi tiết phim (dùng chung cho Movie & TV)
  getDetail: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}`) as Promise<MovieDetail>,

  // Lấy danh sách diễn viên (Casts)
  getCredits: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}/credits`) as Promise<CreditsResponse>,

  // Lấy danh sách phim tương tự
  getSimilar: (type: 'movie' | 'tv', id: number) =>
    axiosClient.get(`/${type}/${id}/similar`) as Promise<MovieResponse>,
};