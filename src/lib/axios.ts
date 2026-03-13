import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw error;
  }
);

export default axiosClient;