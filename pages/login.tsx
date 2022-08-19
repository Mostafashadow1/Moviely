import React from "react";
import imageLogin from "images/image_login.jpg";
import Link from "next/link";
import { Box, Grid, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Image from "next/image";
import { userDataProps } from "types/global";
import Head from "next/head";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const user = localStorage.getItem("user");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userDataProps>();
  const onSubmit: SubmitHandler<userDataProps> = async (data) => {
    try {
      await login(data.email, data.password);
      localStorage.setItem("user", "true");
      router.push("/");
    } catch (err: any) {
      let msg = err && err?.message?.split(" ");
      let error =
        msg[2] === "(auth/user-not-found)."
          ? "Email is not Exists !"
          : msg[2] === "(auth/wrong-password)."
          ? "Type Correct Password !"
          : null;
      toast.error(error, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const passError =
    errors?.password?.type === "minLength"
      ? "please type 6 letters at least "
      : errors?.password?.type === "required"
      ? "this field is required"
      : "";
  const emailError =
    errors?.email?.type === "pattern"
      ? "please type valid email"
      : errors?.email?.type === "required"
      ? "this field is required"
      : "";

  if (user) {
    router.push("/");
  }
  return (
    <Box className=" bg-black h-screen">
      {!user && (
        <>
          <Head>
            <title>Moviely : Login</title>
          </Head>
          <ToastContainer
            theme="dark"
            className="capitalize"
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Box className="  relative ">
            <Link href="/">
              <Typography className=" cursor-pointer text-3xl text-redColor bg-black rounded p-4 font-semibold absolute  z-20">
                Moviely
              </Typography>
            </Link>
          </Box>
          <Grid container className="bg-black h-full">
            <Grid item lg={6} className="hidden lg:block">
              <Box className="relative w-full h-full">
                <Image
                  src={imageLogin}
                  alt="image"
                  layout="fill"
                  className=" absolute inset-0"
                  style={{ filter: "brightness(0.5)" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6} className="flex items-center">
              <Box className=" w-[90%] sm:w-[80%] md:w-[70%] mx-auto !md:mt-[-50px]">
                <Box>
                  <Typography className="capitalize text-4xl   p-1 font-semibold text-redColor">
                    login
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box className="mt-3 space-y-6">
                    <Box>
                      <Box className="flex items-center bg-[#282e32] rounded-lg p-2">
                        <EmailIcon className="text-[#dddddd9c] " />
                        <input
                          {...register("email", {
                            required: true,
                            pattern:
                              /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                          })}
                          className="w-full p-2 bg-inherit text-base outline-none border-none text-[#eee]"
                          placeholder="Email"
                        />
                      </Box>
                      <Typography className="text-base text-redColor p-1">
                        {errors.email && emailError}
                      </Typography>
                    </Box>
                    <Box>
                      <Box className="flex gap-1 items-center bg-[#282e32] rounded-lg p-2">
                        <LockIcon className="text-[#dddddd9c] " />
                        <input
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                          className="w-full p-2 bg-inherit text-base outline-none border-none text-[#eee]"
                          placeholder="Password"
                          type="password"
                        />
                      </Box>
                      <Typography className="text-base text-redColor  p-1">
                        {errors.password && passError}
                      </Typography>
                    </Box>
                    <Box>
                      <button
                        type="submit"
                        className=" capitalize font-semibold text-xl bg-red-700 w-full py-4 rounded-lg cursor-pointer transition duration-100 hover:bg-redColor"
                      >
                        login
                      </button>
                    </Box>
                  </Box>
                </form>
                <Box className="flex items-center mt-2 gap-2 p-1">
                  <Typography className="text-xl text-[#dddddd9c] ">
                    new to moviely?
                  </Typography>
                  <Link href="/signup">
                    <Typography className="text-xl text-redColor hover:text-red-500 transition duration-75 font-semibold cursor-pointer  opacity-90 ">
                      signup now
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Login;
