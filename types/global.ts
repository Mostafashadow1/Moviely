import { MovieType } from "types/MovieType";
// movie
export type movieProps = {
  movie: MovieType;
  page?: string;
};

// movies
export type moviesProps = {
  title?: string;
  page?: string;
  movies: MovieType[];
};

// home props
export type homeProps = {
  actionMovies: MovieType[];
  trendingNow: MovieType[];
  topRated: MovieType[];
  netflixOriginals: MovieType[];
  comedyMovies: MovieType[];
  horrorMovies: MovieType[];
  romanceMovies: MovieType[];
  TVShow: MovieType[];
};

// login signup
export type authLayout = {
  image: any;
  titleHeader: string;
  text: string;
  href: string;
  textHref: string;
};

// inputs type
export type userDataProps = {
  email: string;
  password: string;
};
