import React, { useState } from "react";
import { Modal, Typography, Box, IconButton, Tooltip } from "@mui/material";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "recoil/AtomState";
import { getVideoData } from "utils/getVideoData";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Loading } from "components";
const ModalComponent = ({ mediaType = "movie" }: any) => {
  const [movie, setMovie] = useRecoilState(movieState);
  const [open, setOpen] = useRecoilState(modalState);
  const [isMuted, setIsMuted] = useState(true);
  const [isAddList, setIsAddList] = useState(false);
  const { movieVideo, isLoading } = getVideoData(movie, mediaType);

  const handleClose = () => setOpen(false);
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };
  const handleAddList = () => {
    setIsAddList(true);
  };
  const handleRemoveList = () => {
    setIsAddList(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="bg-mainColor  fixed top-12 left-0 right-0  z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-lg scrollbar-hide"
    >
      <Box>
        <IconButton
          className=" absolute top-0 right-0 z-40 bg-secColor hover:bg-[#333]"
          onClick={handleClose}
        >
          <CloseIcon className="h-6 w-6 text-white" />
        </IconButton>
        <Box className="relative pt-[56%]">
          {isLoading && <Loading />}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movieVideo?.key}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={isMuted}
          />
          <Box className="absolute bottom-7  w-full flex items-center justify-between ">
            <Box className="flex justify-center w-full gap-8  p-2 rounded-sm ">
              <a
                href={`https://www.youtube.com/watch?v=${movieVideo?.key}`}
                target="_blank"
                rel="noreferrer"
              >
                <Tooltip title="open on youtube">
                  <IconButton className="p-2 bg-[#333] hover:bg-mainColor  transition duration-150">
                    <PlayArrowIcon className="font-bold text-2xl text-redColor" />
                  </IconButton>
                </Tooltip>
              </a>
              <IconButton
                className="p-2 bg-[#333] hover:bg-mainColor  transition duration-150"
                onClick={handleToggleMute}
              >
                {!isMuted ? (
                  <Tooltip title="mute">
                    <VolumeUpIcon className="font-bold text-2xl text-redColor" />
                  </Tooltip>
                ) : (
                  <Tooltip title="un mute">
                    <VolumeOffIcon className="font-bold text-2xl text-redColor" />
                  </Tooltip>
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className="rounded-b-md bg-mainColor space-y-4 px-10 py-8">
          <Box className="flex gap-2 items-center">
            <Typography className="font-semibold text-xl text-redColor">
              {movie!.vote_average * 10}% Match
            </Typography>
            <Typography className="font-semibold text-redColor">
              {movie?.release_date || movie?.first_air_date}
            </Typography>
            <Typography className="flex h-4 items-center justify-center rounded text-xl">
              HD
            </Typography>
          </Box>
          <Box className="space-y-2">
            <Typography className="w-5/6 text-[#b7b3b3] font-light text-sm  leading-6">
              {movie?.overview}
            </Typography>
            <div className="flex flex-col space-y-2 ">
              <Typography className="text-[#b7b3b3] text-lg">
                Original language: {movie?.original_language}
              </Typography>{" "}
              <Typography className="text-[#b7b3b3] text-lg">
                Total votes: {movie?.vote_count}
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
