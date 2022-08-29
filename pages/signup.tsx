import React from "react";
import imageSignup from "images/image_signup.jpg";
import Head from "next/head";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Image from "next/image";
import { userDataProps } from "types/global";
import { useAuth } from "context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
const Signup = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const user = localStorage.getItem("user");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userDataProps>();
  const onSubmit: SubmitHandler<userDataProps> = async (data) => {
    try {
      await signup(data.email, data.password);
      toast.success("signup is successfully please login", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err: any) {
      let msg = err && err?.customData?._tokenResponse?.error?.message;
      let error = msg === "EMAIL_EXISTS" ? "Email is Exists !" : null;
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
    <>
      {!user && (
        <>
          <ToastContainer
            className="capitalize"
            theme="dark"
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

          <Box className=" bg-black h-screen">
            <Head>
              <title>Moviely : Signup</title>
            </Head>
            <Box className="  relative ">
              <Link href="/">
                <h2 className=" cursor-pointer text-3xl text-redColor bg-black rounded p-4 font-semibold absolute  z-20">
                  Moviely
                </h2>
              </Link>
            </Box>
            <Grid container className="bg-black h-full">
              <Grid item lg={6} className="hidden lg:block">
                <Box className="relative w-full h-full">
                  <Image
                    priority
                    src={imageSignup}
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
                    <h3 className="capitalize text-4xl   p-1 font-semibold text-redColor">
                      sign up
                    </h3>
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
                          signup
                        </button>
                      </Box>
                    </Box>
                  </form>
                  <Box className="flex items-center mt-2 gap-2 p-1">
                    <Typography className="text-xl text-[#dddddd9c] ">
                      Have an account?
                    </Typography>
                    <Link href="/login">
                      <Typography className="text-xl text-redColor hover:text-red-500 transition duration-75 font-semibold cursor-pointer  opacity-90 ">
                        login now
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default Signup;
