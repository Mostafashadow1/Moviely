import { createRequest } from "./creteRequest";
const key = process.env.NEXT_PUBLIC_API_KEY;

export const getNetflixOriginals = new createRequest(
  `discover/movie?api_key=${key}&with_networks=213`
);
export const getActionMovies = new createRequest(
  `discover/movie?api_key=${key}&language=en-US&with_genres=28`
);

export const getTrending = new createRequest(
  `trending/all/week?api_key=${key}&language=en-US`
);

export const getTopRated = new createRequest(
  `movie/top_rated?api_key=${key}&language=en-US`
);

export const getComedyMovies = new createRequest(
  `discover/movie?api_key=${key}&language=en-US&with_genres=35`
);
export const getHorrorMovies = new createRequest(
  `discover/movie?api_key=${key}&language=en-US&with_genres=27`
);
export const getTvShow = new createRequest(
  `tv/top_rated?api_key=${key}&language=en-US&page=4`
);

// request pages
export const getTvShowsPage = new createRequest(
  `tv/top_rated?api_key=${key}&language=en-US&page=5`
);
export const getMoviesPage = new createRequest(
  `movie/popular?api_key=${key}&language=en-US&page=4`
);
export const getUpcomingPage = new createRequest(
  `movie/upcoming?api_key=${key}&language=en-US&page=1`
);
