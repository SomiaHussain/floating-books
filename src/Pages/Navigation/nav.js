import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Tooltip, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import logoImage from "../../common/assets/logo.png";
import Dropdown from "../../components/dropDown";
import { GetGenres } from "../../services/genreService";
import "./nav.css";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [genres, setAllGenres] = useState(null);
  let pages = ["Contact", "aboutUs"];

  useEffect(() => {
    GetGenres(setAllGenres);
  }, []);

  if (!isUserLogged) {
    pages = [...pages, "Login", "Register"];
  }

  if (isUserLogged) {
    pages = [...pages, "add-book"];
  }
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const getGenreId = (name) => {
    return (
      genres?.find((item) => item.genre.toLowerCase() === name.toLowerCase())
        ?.id || 0
    );
  };

  const fictionOptions = [
    { genre: "Romance", id: getGenreId("Romance") },
    { genre: "Thriller", id: getGenreId("Thriller") },
    { genre: "Science Fiction", id: getGenreId("Science") },
    { genre: "Adventure", id: getGenreId("Adventure") },
    { genre: "Horror", id: getGenreId("Horror") },
    { genre: "Other", id: getGenreId("other") }
  ];

  
  const nonfictionOptions = [
    { genre: "Arts", id: getGenreId("Arts") },
    { genre: "History", id: getGenreId("History") },
    { genre: "Maths", id: getGenreId("Maths") },
    { genre: "Computing", id: getGenreId("Computing") },
    { genre: "Geography", id: getGenreId("Geography") },
    { genre: "Science", id: getGenreId("Science") },
    { genre: "Other", id: getGenreId("Other") }
  ]; 

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  useEffect(() => {
    const storedLoginDetails = localStorage.getItem("userDetails");
    if (storedLoginDetails) {
      setIsUserLogged(true);
      setUserDetails(JSON.parse(storedLoginDetails));
    } else {
      setIsUserLogged(false);
      navigate("/login");
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigatePage=(page)=>{
    if (page) {
      navigate("/" + page);
    }
    setAnchorElNav(null);
  }

  const navigateCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Dashboard") {
      navigate("/dashboard");
    }
    if (setting === "Logout") {
      localStorage.removeItem("userDetails");
      setUserDetails({});
      window.location.reload(true);
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#2596be" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Floating books
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              PaperProps={{
                style: {
                  width: 230
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={navigateCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                top: "50px"
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  sx={{
                    borderTop: 1,
                    borderRadius: "16px",
                    marginBottom: "10px",
                    borderColor: "primary.main"
                  }}
                  key={page}
                  onClick={() => navigatePage(page)}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <Box sx={{ textAlign: "center" }}>
                <h5>Fiction</h5>
                <Dropdown options={fictionOptions} />
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <h5>Non-Fiction</h5>
                <Dropdown options={nonfictionOptions} />
              </Box>
            </Menu>
          </Box>
          <Box
            component="img"
            sx={{
              height: 60,
              width: 60,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 }
            }}
            alt="The house from the offer."
            src={logoImage}
          />
          <Typography
            variant="h7"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Floating books
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigatePage(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isUserLogged && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                PaperProps={{
                  style: {
                    width: 230
                  }
                }}
                sx={{ mt: "35px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <div className="email">
                  <p>{userDetails?.displayName}</p>
                </div>
                {settings.map((setting) => (
                  <MenuItem
                    sx={{
                      borderTop: 1,
                      borderRadius: "16px",
                      marginBottom: "10px",
                      borderColor: "secondary.main"
                    }}
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
