import React from "react";
import { Box } from "@mui/system";
import { Banner, Cards } from "components";
import { moviesProps } from "types/global";
import { getUpcomingPage } from "utils/requestsUrl";
import { Container, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Head from "next/head";
const upcoming = ({ movies }: moviesProps) => {
  return (
    <>
      <Head>
        <title>Moviely : Up coming</title>
      </Head>
      <Container className="px-2 md:px-4 mt-14 " maxWidth="xl">
        <Banner movies={movies && movies} />
        <Box>
          <Box className="flex mb-6 items-center gap-2 mt-3 md:mt-0">
            <MovieFilterIcon className="text-2xl md:text-4xl text-red-500" />
            <Typography className="text-2xl md:text-3xl capitalize">
              up coming
            </Typography>
          </Box>
          <Cards movies={movies && movies} page="movie" />
        </Box>
      </Container>
    </>
  );
};

export default upcoming;

export async function getStaticProps() {
  const res = await fetch(getUpcomingPage.makeRequest());
  const data = await res.json();
  return {
    props: {
      movies: data.results,
    },
  };
}
