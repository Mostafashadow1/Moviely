import React, { ReactElement } from "react";
import { Navbar } from "components";
import { useRouter } from "next/router";
const Layout = ({ children }: { children: ReactElement }) => {
  const { asPath } = useRouter();
  let hideNavbar = false;
  if (asPath === "/login" || asPath === "/signup") {
    hideNavbar = true;
  } else {
    hideNavbar = false;
  }

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
