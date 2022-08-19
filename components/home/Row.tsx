import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Thumbnail from "./Thumbnail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { useRef, useState } from "react";
import { moviesProps } from "types/global";

const Row = ({ title, movies }: moviesProps) => {
  const rowRef = useRef<null | HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);
  const handleSlider = (dir: string) => {
    setShowArrow(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const slideTo =
        dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: slideTo, behavior: "smooth" });
    }
  };

  return (
    <Box className="border-b-2 border-mainColor">
      <Box className="flex gap-2 items-center">
        {title === "trending now" || title === "top rated" ? (
          <TrendingUpIcon className="!text-2xl !md:text-4xl text-red-500 !font-bold" />
        ) : (
          <MovieFilterIcon className="!text-2xl !md:text-4xl text-red-500 !font-bold" />
        )}
        <h4 className="text-2xl md:text-3xl capitalize font-semibold">
          {title}
        </h4>
      </Box>
      <Box className="!relative mt-10">
        <Box>
          <button
            onClick={() => handleSlider("left")}
            className={` absolute  opacity-0 top-[30%] bottom-0 left-2 z-40   h-fit w-fit  cursor-pointer  transition hover:scale-125 ${
              showArrow && " opacity-100"
            }`}
          >
            <ArrowBackIosIcon className="text-white font-bold text-3xl" />
          </button>
        </Box>
        <Box
          ref={rowRef}
          className="scrollbar-hide flex items-center space-x-3 overflow-x-scroll md:space-x-10 overflow-y-hidden "
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie && movie} />
          ))}
        </Box>
        <button
          onClick={() => handleSlider("right")}
          className="absolute  top-[30%] bottom-0 right-2 z-40   h-fit w-fit cursor-pointer  transition hover:scale-125 "
        >
          <ArrowForwardIosIcon className="text-white font-bold text-3xl" />
        </button>
      </Box>
    </Box>
  );
};

export default Row;
