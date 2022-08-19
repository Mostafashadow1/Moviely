import React, { useEffect, useState } from "react";
import { MovieType } from "types/MovieType";
import Image from "next/image";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { moviesProps } from "types/global";
import { baseUrlOrignal } from "utils/constant";
import { Loading } from "components";
import { useRecoilState } from "recoil";
import { movieState, modalState } from "recoil/AtomState";
const Banner = ({ movies }: moviesProps) => {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useRecoilState(modalState);
  const [movieModal, setMovieModal] = useRecoilState(movieState);

  // get rundom move and set in movie state
  useEffect(() => {
    setIsLoading(true);
    setMovie(movies[Math.floor(Math.random() * movies?.length)]);
    setIsLoading(false);
  }, [movies]);

  // show modal
  const showModal = () => {
    setIsModal(true);
  };
  // send movie data in modal
  const sendMovieDataInModal = () => {
    setMovieModal(movie);
  };

  return (
    <Box className="flex w-full flex-col lg:pb-12">
      <Box className="relative  h-full">
        {isLoading && <Loading />}
        <Box className="absolute z-20 inset-0 w-full h-full bg-layout " />
        <Image
          layout="fill"
          alt="image"
          src={`${baseUrlOrignal}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
          className="absolute inset-0"
        />
        <Box className="relative z-20 p-2 md:p-12 font-bold">
          <Box className="p-1">
            <h6 className="text-base font-semibold">{movie?.release_date}</h6>
          </Box>
          <Box className="flex flex-col md:flex-row gap-1 md:items-center capitalize md:mt-6">
            <StarIcon className="hidden md:block text-[#FDCC0D] text-xl font-semibold" />
            <Box className="flex items-center gap-1  mr-2">
              <h5 className="text-xl">vote average</h5>
              <h5 className=" text-redColor text-2xl">{movie?.vote_average}</h5>
            </Box>
            <Box className="flex items-center text-xl gap-1">
              <h5 className="text-xl">vote count</h5>
              <h5 className=" text-redColor text-2xl font-semibold">
                {movie?.vote_count}
              </h5>
            </Box>
          </Box>
          <Box className="mt-2 md:mt-6 ">
            <h4 className="text-3xl md:text-6xl">
              {movie?.title || movie?.original_title}
            </h4>
          </Box>
          <Box className="mt-2 md:mt-6 w-full md:w-[60%] ">
            <p className="hidden md:block text-base text-white opacity-80 font-medium">
              {movie?.overview}
            </p>
            <p className="block md:hidden text-base text-white opacity-80 font-medium">
              {movie?.overview && movie?.overview?.length > 200
                ? movie?.overview?.substring(0, 200) + "..."
                : movie?.overview}
            </p>
          </Box>
          <Box className="my-10 flex gap-4">
            <button
              className=" banner-button bg-redColor w-28"
              onClick={() => {
                sendMovieDataInModal();
                showModal();
              }}
            >
              <PlayArrowIcon className="font-bold text-2xl" />
              <span className="font-semibold ">Watch</span>
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
