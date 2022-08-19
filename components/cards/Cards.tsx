import React from "react";
import Masonry from "react-masonry-css";
import { moviesProps } from "types/global";
import Card from "./Card";

const Cards = ({ movies, page }: moviesProps) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {movies.map((movie) => (
        <Card key={movie?.id} movie={movie} page={page} />
      ))}
    </Masonry>
  );
};

export default Cards;
