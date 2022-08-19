import { Box, Container } from "@mui/material";
import { Banner, Modal, Row } from "components";
import Head from "next/head";
import { requestsUrl } from "utils/requestsUrl";
import { homeProps } from "types/global";
import { useRecoilState } from "recoil";
import { modalState } from "recoil/AtomState";
const Home = ({
  actionMovies,
  trendingNow,
  topRated,
  netflixOriginals,
  comedyMovies,
  horrorMovies,
  TVShow,
}: homeProps) => {
  const [isModal] = useRecoilState(modalState);
  return (
    <Container className="px-2 md:px-4 mt-14 " maxWidth="xl">
      <Head>
        <title>Moviely</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner movies={netflixOriginals && netflixOriginals} />
      <Box className=" mt-4 md:mt-0 space-y-10 ">
        <Row title="trending now" movies={trendingNow} />
        <Row title="top rated" movies={topRated} />
        <Banner movies={netflixOriginals && netflixOriginals} />

        <Row title="comedy" movies={comedyMovies} />
        <Row title="action " movies={actionMovies} />
        <Banner movies={netflixOriginals && netflixOriginals} />

        <Row title="horror" movies={horrorMovies} />
        <Row title="TV Shows" movies={TVShow && TVShow} />
      </Box>
      {/* Modal */}
      {isModal && <Modal mediaType="movie"/>}
    </Container>
  );
};

export default Home;

export async function getStaticProps() {
  const [
    actionMovies,
    trending,
    topRated,
    netflixOriginals,
    comedyMovies,
    horrorMovies,
    getTVShow,
  ] = await Promise.all([
    fetch(requestsUrl.getActionMovies).then((res) => res.json()),
    fetch(requestsUrl.getTrending).then((res) => res.json()),
    fetch(requestsUrl.getTopRated).then((res) => res.json()),
    fetch(requestsUrl.getNetflixOriginals).then((res) => res.json()),
    fetch(requestsUrl.getComedyMovies).then((res) => res.json()),
    fetch(requestsUrl.getHorrorMovies).then((res) => res.json()),
    fetch(requestsUrl.getTVShow).then((res) => res.json()),
  ]);

  return {
    props: {
      actionMovies: actionMovies.results,
      trendingNow: trending.results,
      topRated: topRated.results,
      netflixOriginals: netflixOriginals.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      TVShow: getTVShow.results,
    },
  };
}