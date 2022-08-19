import { Box, Typography } from "@mui/material";
import { Loading } from "components";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { movieProps } from "types/global";
import { baseUrlOrignal } from "utils/constant";
import StarIcon from "@mui/icons-material/Star";

const Card = ({ movie, page }: movieProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // handle Loading
  useEffect(() => {
    setIsLoading(true);
    if (movie) {
      setIsLoading(false);
    }
  }, [movie]);

  return (
    <Link href={`/${page}/${movie.id}`}>
      <Box className={`rounded min-w-[215px] bg-secColor  cursor-pointer`}>
        <Box>
          {isLoading ? (
            <Loading />
          ) : (
            <Image
              width="100%"
              height={100}
              layout="responsive"
              className="rounded )"
              style={{ filter: "brightness(0.8)" }}
              alt="thumbnail"
              src={`${baseUrlOrignal}/${movie?.poster_path}`}
            />
          )}
        </Box>
        <Box className="p-1">
          <Box className="mt-4">
            <Typography className="capitalize text-xl md:text-2xl leading-5 font-bold ">
              {movie.name || movie.title || "  Unknown"}
            </Typography>
          </Box>
          <Box className="flex items-center justify-between ">
            <Typography className="text-xl font-semibold  text-redColor">
              {movie?.first_air_date
                ? movie?.first_air_date.split("-")[0]
                : movie?.release_date! && movie?.release_date.split("-")[0]}
            </Typography>
            <Box className="flex  items-center gap-1 ">
              <StarIcon className="text-2xl text-[#FDCC0D]" />
              <Typography className="text-2xl font-semibold">
                {movie?.vote_average}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
