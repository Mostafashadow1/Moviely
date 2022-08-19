import { Box } from "@mui/system";
import { Banner, Cards, Modal } from "components";
import React from "react";
import { moviesProps } from "types/global";
import { requestsUrl } from "utils/requestsUrl";
import { Container, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Head from "next/head";
import { modalState } from "recoil/AtomState";
import { useRecoilState } from "recoil";

const Tvshows = ({ movies }: moviesProps) => {
  const [isModal] = useRecoilState(modalState);

  return (
    <Container className="px-2 md:px-4 mt-14 " maxWidth="xl">
      <Head>
        <title>Moviely : TVShows</title>
      </Head>
      <Banner movies={movies && movies} />
      <Box className="flex mb-6 items-center gap-2 mt-3 md:mt-0">
        <MovieFilterIcon className="text-2xl md:text-4xl text-red-500" />
        <Typography className="text-2xl md:text-3xl capitalize">
          TV shows
        </Typography>
      </Box>
      <Cards movies={movies && movies} page="tv" />
      {/* Modal */}
      {isModal && <Modal mediaType="tv" />}
    </Container>
  );
};

export default Tvshows;

export async function getStaticProps() {
  const res = await fetch(requestsUrl.getTVShowPage);
  const data = await res.json();
  return {
    props: {
      movies: data.results,
    },
  };
}
