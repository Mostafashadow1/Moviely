import { CircularProgress, Box } from "@mui/material";
const Loading = () => {
  return (
    <Box className="w-fit mx-auto pt-10">
      <CircularProgress className=" bg-redColor" />
    </Box>
  );
};

export default Loading;
