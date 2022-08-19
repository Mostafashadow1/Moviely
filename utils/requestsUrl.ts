import { baseUrl } from "./constant";
export const requestsUrl = {
  getNetflixOriginals: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_networks=213`,
  getActionMovies: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=28`,
  getTrending: `${baseUrl}/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
  getTopRated: `${baseUrl}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
  getComedyMovies: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=35`,
  getHorrorMovies: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=27`,
  getTVShow: `${baseUrl}/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=4`,
  getTVShowPage: `${baseUrl}/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=5`,
  getMoviesPage: `${baseUrl}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=4`,
  getUpcomingPage: `${baseUrl}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
};
