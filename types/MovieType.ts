export type MovieType = {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  title: string;
  video: boolean;
  tagline?: string;
  vote_average: number;
  vote_count: number;
  genres?: [];
  production_companies?: [];
  production_countries?: [];
  name?: string;
  first_air_date?: string;
  media_type?: string;
};

export type genres = {
  id: number;
  name: string;
};

export type companies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country?: string;
};

export type countries = {
  id: number;
  name: string;
};
