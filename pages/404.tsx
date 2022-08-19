import React from "react";
import notfound from "images/notfound.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Erorr = () => {
  return (
    <div className="grid items-center w-full">
      <Box margin="20px 0px">
        <Image
          src={notfound}
          alt="image_notfound"
          style={{ filter: " brightness(0.5)" }}
          width={"100%"}
          height={30}
          layout="responsive"
        />
      </Box>
      <Box>
        <Typography variant="h4" className=" text-center text-2xl mt-4">
          Sorry, this page is not available.
        </Typography>
        <Typography variant="h4" className=" text-center text-2xl mt-4">
          The link you followed may be broken , Go back to
        </Typography>
        <Link className="" href="/">
          <Typography
            variant="h4"
            className=" cursor-pointer font-bold bg-colorImage mt-4 bg-clip-text text-3xl text-transparent text-center"
          >
            Moviely
          </Typography>
        </Link>
      </Box>
    </div>
  );
};

export default Erorr;
