import React from "react";
import { Box } from "@mui/system";
import { Banner, Cards, Modal } from "components";
import { moviesProps } from "types/global";
import { getMoviesPage } from "utils/requestsUrl";
import { Container, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { modalState } from "recoil/AtomState";

const Movies = ({ movies }: moviesProps) => {
  const [isModal] = useRecoilState(modalState);

  return (
      <Container className="px-2 md:px-4 mt-14 " maxWidth="xl">
        <Head>
          <title>Moviely : Movies</title>
        </Head>
        <Banner movies={movies && movies} />
        <Box>
          <Box className="flex mb-6 items-center gap-2 mt-3 md:mt-0">
            <MovieFilterIcon className="text-2xl md:text-4xl text-red-500" />
            <Typography className="text-2xl md:text-3xl capitalize">
              movies
            </Typography>
          </Box>
          <Cards movies={movies && movies} page="movie" />
        </Box>
        {/* Modal */}
        {isModal && <Modal mediaType="movie" />}
      </Container>
  );
};

export default Movies;

export async function getStaticProps() {
  const res = await fetch(getMoviesPage.makeRequest());
  const data = await res.json();
  return {
    props: {
      movies: data.results,
    },
  };
}
