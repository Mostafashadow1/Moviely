import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

import {
  Box,
  Container,
  Avatar,
  IconButton,
  Menu,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";

const Navbar = () => {
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const [navMenu, setNavMenu] = useState<null | HTMLElement>(null);
  const [isScroll, setIsScroll] = useState(false);
  const { asPath } = useRouter();
  const { user, logout } = useAuth();
  const userLocal = localStorage.getItem("user");
  // hanle scrolling
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScroll(true) : setIsScroll(false);
    };
    window.addEventListener("scroll", handleScroll);
    // cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //  menu user
  const ProfileItems = [
    { id: "4", title: "Logout", href: "/", logout: logout },
  ];
  // nav items && menu
  const navItems = [
    {
      id: "1",
      title: "home",
      href: "/",
    },
    {
      id: "2",
      title: "TV shows",
      href: "/tvshows",
    },
    {
      id: "3",
      title: "movies",
      href: "/movies",
    },
    {
      id: "4",
      title: "up coming",
      href: "/upcoming",
    },
  ];
  // user menu
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };
  const handleCloseUserMenu = (): void => {
    setUserMenu(null);
  };

  // navbar menu

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenu(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setNavMenu(null);
  };

  // click the logo go top page
  const handleGoTopPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // styles navItems
  const stylesNavItemDefault =
    "capitalize cursor-pointer text-base font-normal text-secColor";
  const stylesActiveNavItem =
    "text-mainColor capitalize font-medium border-b-2 border-red-600 pb-1";
  return (
    <nav
      className={`fixed top-0 w-full z-50 ${
        isScroll ? "bg-secColor border-b border-mainColor" : "intial"
      }`}
    >
      <Container maxWidth="xl" className="px-2 md:px-4">
        <div className="flex flex-row w-full  justify-between items-center md:px-2 py-2">
          <Link href="/">
            <Box onClick={handleGoTopPage}>
              <h2 className="text-redColor  text-2xl md:text-3xl font-bold cursor-pointer">
                Moviely
              </h2>
            </Box>
          </Link>

          <ul className=" hidden md:flex items-center gap-6">
            {navItems.map((navItem) => (
              <Link key={navItem.id} href={navItem.href}>
                <li
                  className={
                    asPath === navItem.href
                      ? stylesActiveNavItem
                      : stylesNavItemDefault
                  }
                >
                  {navItem.title}
                </li>
              </Link>
            ))}
          </ul>
          <Box className="flex gap-2 items-center">
            <Box className="md:hidden">
              <Tooltip title="show menu">
                <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                  <MenuIcon className="text-mainColor text-[20px] sm:text-md" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  ul: {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                }}
                id="menu-appbar"
                anchorEl={navMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(navMenu)}
                onClose={handleCloseNavMenu}
              >
                {navItems.map((navItem) => (
                  <MenuItem
                    key={navItem.id}
                    className={`${
                      navItem.href === asPath
                        ? "text-redColor  font-extrabold capitalize"
                        : " text-white capitalize"
                    }`}
                    sx={{
                      borderBottom: "1px solid rgb(250,250,250 , 15%)",
                      "&:hover": {
                        backgroundColor: "var(--secColor)",
                      },
                    }}
                  >
                    <Link href={navItem.href}>
                      <Typography textAlign="center">
                        {navItem.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {userLocal ? (
              <>
                <Tooltip title="Notifications">
                  <IconButton className="cursor-text">
                    <NotificationsIcon className="text-mainColor text-[20px] sm:text-md" />
                  </IconButton>
                </Tooltip>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open Profile Items">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.email?.substring(0, 1)}
                        className=" !w-9 !h-9 capitalize !bg-redColor !md:w-8 !md:h-8 "
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      ul: {
                        backgroundColor: "#000",
                        color: "#fff",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={userMenu}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(userMenu)}
                    onClose={handleCloseUserMenu}
                  >
                    {ProfileItems &&
                      ProfileItems?.map((profileItem) => (
                        <MenuItem
                          sx={{
                            borderBottom: "1px solid rgb(250,250,250 , 15%)",
                            "&:hover": {
                              backgroundColor: "var(--secColor)",
                            },
                          }}
                          key={profileItem?.id}
                          onClick={profileItem.logout && profileItem.logout}
                        >
                          <Link href={`${profileItem?.href}`}>
                            <Typography textAlign="center">
                              {profileItem?.title}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Button color="error" variant="outlined">
                  <Link href="/signup">sign up</Link>
                </Button>
                <Button
                  variant="contained"
                  className="bg-red-700"
                  color="error"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </Box>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
