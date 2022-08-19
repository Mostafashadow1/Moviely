import { Box } from "@mui/material";
import Image from "next/image";
import { baseUrlOrignal } from "utils/constant";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { movieProps } from "types/global";
import { Loading } from "components";

const Thumbnail = ({ movie }: movieProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // handle Loading
  useEffect(() => {
    setIsLoading(true);
    if (movie) {
      setIsLoading(false);
    }
  }, [movie]);
  return (
    <Link href={`/movie/${movie?.id}`}>
      <Box className={`rounded h-[400px] min-w-[215px] cursor-pointer`}>
        <Box>
          {isLoading ? (
            <Loading />
          ) : (
            <Image
              width={215}
              height={300}
              className="rounded )"
              style={{ filter: "brightness(0.8)" }}
              alt="thumbnail"
              src={`${baseUrlOrignal}/${movie?.poster_path}`}
            />
          )}
        </Box>
        <Box className="p-1">
          <h4 className="capitalize text-xl  font-bold ">
            {(movie?.title && movie?.title?.length > 10
              ? movie?.title?.substring(0, 10) + "..."
              : movie?.title) ||
              (movie?.name && movie?.name?.length > 10
                ? movie?.name?.substring(0, 10) + "..."
                : movie?.name) ||
              " Unknown"}
          </h4>
        </Box>
        <Box className="flex items-center justify-between p-1 ">
          <h6 className="text-base font-semibold  text-redColor">
            {(movie?.release_date && movie?.release_date.split("-")[0]) ||
              (movie?.first_air_date && movie?.first_air_date.split("-")[0])}
          </h6>
          <Box className="flex items-center gap-1 text-[#FDCC0D]">
            <StarIcon />
            <h6 className="text-base font-semibold">
              {movie?.vote_average}
            </h6>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Thumbnail;
