import useSWR from "swr";
import { MovieType } from "types/MovieType";
import { baseUrl } from "./constant";

export const getVideoData = (movie: MovieType | null, mediaType: any) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const requestUrl = `${baseUrl}/${mediaType}/${movie?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(requestUrl, fetcher);
  return {
    movieVideo: data?.results && data?.results[0],
    isLoading: !error && !data,
    isError: error,
  };
};
