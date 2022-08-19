import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import { companies, countries, genres } from "types/MovieType";
import { movieProps } from "types/global";
import { baseUrl, baseUrlOrignal } from "utils/constant";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { Loading, Modal } from "components";
import { modalState, movieState } from "recoil/AtomState";
import { useRecoilState } from "recoil";
const TVMovie = ({ movie }: movieProps) => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  const [movieModal, setMovieModal] = useRecoilState(movieState);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (movie) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [movie]);

  const showModal = () => {
    setIsModal(true);
  };
  // send movie data in modal
  const sendMovieDataInModal = () => {
    setMovieModal(movie);
  };
  return (
    <Container maxWidth="xl" className="mt-20">
      {isLoading ? (
        <Loading />
      ) : (
        <Box className="relative my-4">
          <Image
            layout="responsive"
            width={"100%"}
            height={30}
            src={`${baseUrlOrignal}/${
              movie?.backdrop_path || movie?.poster_path
            }`}
            alt="MovieImage"
            style={{ filter: "brightness(0.7)" }}
          />
          <Box className="mt-6 p-2">
            <Box className="flex items-center gap-2">
              <Typography className="text-2xl md:text-4xl capitalize">
                {movie?.title || movie?.original_title}
              </Typography>
              <StarIcon className="block text-[#FDCC0D] text-4xl font-semibold" />
            </Box>
            <Typography className=" text-base md:w-[80%] leading-8 opacity-80 mt-2">
              {movie?.overview}
            </Typography>
            <Box className="block md:flex  gap-2 mt-4 ">
              <Box className="flex gap-2 capitalize">
                <Typography className=" text-xl">vote average :</Typography>
                <Typography className=" text-2xl text-redColor">
                  {movie?.vote_average}
                </Typography>
              </Box>
              <Box className="flex gap-2 capitalize">
                <Typography className=" text-xl">vote count :</Typography>
                <Typography className=" text-2xl text-redColor">
                  {movie?.vote_count}
                </Typography>
              </Box>

              <Box className="flex gap-2 capitalize">
                <Typography className=" text-xl">release date :</Typography>
                <Typography className=" text-2xl text-redColor">
                  {movie?.release_date}
                </Typography>
              </Box>
            </Box>
            <Box className="flex gap-2 capitalize mt-4">
              <Typography className=" text-2xl">tagline : </Typography>
              <Typography className=" text-2xl text-redColor">
                {movie?.tagline}{" "}
              </Typography>
            </Box>
            <Box className=" mt-8 flex gap-4">
              <button
                onClick={() => {
                  sendMovieDataInModal();
                  showModal();
                }}
                className=" banner-button bg-redColor w-28"
              >
                <PlayArrowIcon className="font-bold text-2xl" />
                <Typography className="font-semibold ">Watch</Typography>
              </button>
            </Box>
            <div className="border-b m-4 border-mainColor" />
            <Box className="mt-6 ">
              <Typography className=" capitalize text-3xl font-semibold">
                genres :{" "}
              </Typography>
              <Box className="mt-4 md:flex gap-2 space-y-4 md:space-y-0">
                {movie?.genres &&
                  movie?.genres.map((genre: genres) => (
                    <Typography
                      key={genre?.id}
                      className="text-xl bg-red-500 w-fit px-10 py-2  rounded-lg "
                    >
                      {genre.name}
                    </Typography>
                  ))}
              </Box>
            </Box>

            <Box className="mt-12">
              <Typography className=" capitalize text-3xl font-semibold">
                production companies :
              </Typography>
              <Box className="mt-4 md:flex gap-2 space-y-4 md:space-y-0">
                {movie?.production_companies &&
                  movie?.production_companies.map((company: companies) => (
                    <Box
                      key={company.id}
                      className="border border-mainColor p-6 flex flex-col "
                    >
                      <Image
                        width={100}
                        height={100}
                        src={`${baseUrlOrignal}/${company.logo_path}`}
                        alt="logo"
                      />
                      <Typography className="text-2xl mt-4 font-bold ">
                        {company.name}
                      </Typography>
                      <Typography className="text-2xl mt-4 font-bold text-center text-red-500">
                        {company.origin_country}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
            <Box className="mt-12">
              <Typography className=" capitalize text-3xl font-semibold">
                production countries :
              </Typography>
              <Box className="mt-4 md:flex gap-2 space-y-4 md:space-y-0">
                {movie?.production_countries &&
                  movie?.production_countries.map(
                    (country: countries, idx: number) => (
                      <Typography
                        key={idx}
                        className="text-xl bg-red-500 w-fit px-10 py-2  rounded-lg "
                      >
                        {country.name}
                      </Typography>
                    )
                  )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {/* Modal */}
      {isModal && <Modal mediaType="tv" />}
    </Container>
  );
};

export default TVMovie;

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const res = await fetch(
    `${baseUrl}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  const data = await res.json();

  return {
    props: {
      movie: data,
    },
  };
}
