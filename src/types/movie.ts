export interface Movie {
  id: number;
  title?: string;      // Cho phim chiếu rạp
  name?: string;       // Cho TV Series
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  key: string;      // Đây là mã ID của YouTube
  name: string;
  site: string;     // 'YouTube'
  type: 'Trailer' | 'Teaser' | 'Featurette' | 'Behind the Scenes';
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

// Interface MovieDetail kế thừa từ Movie
export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime?: number;
  episode_run_time?: number[];
  status?: string;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
}

// Thêm định nghĩa cho Search Params của các trang danh sách
export interface MovieSearchParams {
  type?: string;
  page?: string;
  query?: string;
}