import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as ROUTING_CONSTANTS from "../../constants/Routing";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Login from "../login/Login";
import CustomDialog from "../shared/CustomDialog";
import { Grid, Link } from "@mui/material";
import SignUp from "../login/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { HomeSlice, homeState } from "./slices/slice";
import CustomLoader from "../shared/Loader";
import { isAdminUser } from "../../utils/globalUtils";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import {
  ADMIN_USER_SETTINGS_MENU,
  USER_SETTINGS_MENU,
} from "../../constants/GlobalConstants";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pages = ["Electronics", "Clothes", "Footwear"];
  const [settings, setSettings] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState();
  const state = useSelector(homeState);
  const [disablePrimary, setDisablePrimary] = useState(true);
  const [disableSecondary, setDisableSecondary] = useState(true);

  const handleItemClick = (setting) => {
    const value = setting?.value;
    if (value === "profile") {
      navigate(ROUTING_CONSTANTS.ROUTE_TO_PROFILE);
    } else if (value === "adminDashboard") {
      navigate(ROUTING_CONSTANTS.ADMIN_DASHBOARD_ROUTE);
    } else if (value === "logout") {
      dispatch(HomeSlice.actions.handleLogOutUser());
    }
  };

  useEffect(() => {
    const isAdmin = isAdminUser();
    if (isAdmin) {
      setSettings(ADMIN_USER_SETTINGS_MENU);
    } else {
      setSettings(USER_SETTINGS_MENU);
    }
  }, [state?.userInfo]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleActionButton = (data) => {
    if (data.buttonType === "primary") {
      if (showSignUp) {
        /**
         * dispatch sign up actions
         */
        dispatch(HomeSlice.actions.storeSignUpData(formData));
      } else {
        /**
         * dispatch sign in actions
         */
        dispatch(HomeSlice.actions.storeSignInData(formData));
      }
      // setOpenLogin(false);
    } else if (data.buttonType === "secondary") {
      dispatch(HomeSlice.actions.forgetPassword(formData));
    } else if (data.buttonType === "close") {
      setOpenLogin(false);
    }
  };

  useEffect(() => {
    if (state?.userInfo) {
      setOpenLogin(false);
    }
  }, [state?.userInfo]);

  const handleFormData = (data) => {
    setFormData(data);
  };

  const loginHelperText = (
    <Typography variant="caption" display="block" gutterBottom>
      Don't have an account ?{" "}
      <Link
        style={{ cursor: "pointer" }}
        underline="hover"
        onClick={() => setShowSignUp(true)}
      >
        Sign Up
      </Link>
    </Typography>
  );

  const signUpHelperText = (
    <Typography variant="caption" display="block" gutterBottom>
      Already have an account ?{" "}
      <Link
        style={{ cursor: "pointer" }}
        underline="hover"
        onClick={() => setShowSignUp(false)}
      >
        Login
      </Link>
    </Typography>
  );

  useLayoutEffect(() => {
    if (formData) {
      /** if sign up screen is there, check for all three fields (email/password/userName) are entered or not */
      if (showSignUp) {
        const { userName, password, email } = formData;
        setDisablePrimary(!(userName && password && email));
      } else {
        /**if sign in screen is there, check for at least email field to enable forget password and check for email and password to enable login button */
        console.log(formData, "Inside else");
        const { password, email } = formData;
        setDisablePrimary(!(password && email));
        setDisableSecondary(!email);
      }
    }
  }, [formData]);

  return (
    <>
      <AppBar position="static">
        <CustomLoader show={state?.isLoading} />
        <CustomDialog
          open={openLogin}
          primaryButtonLabel={showSignUp ? "Sign Up" : "Sign In"}
          secondaryButtonLabel={!showSignUp && "Forgot Password"}
          onClose={handleActionButton}
          content={
            showSignUp ? (
              <SignUp handleFormDataCb={handleFormData} />
            ) : (
              <Login handleFormDataCb={handleFormData} />
            )
          }
          title={showSignUp ? "Sign Up" : "Login"}
          maxWidth="sm"
          helperText={showSignUp ? signUpHelperText : loginHelperText}
          disablePrimary={disablePrimary}
          disableSecondary={disableSecondary}
        ></CustomDialog>
        <Container maxWidth="100%">
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
                textDecoration: "none",
              }}
            >
              AV Stores
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
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AV Stores
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={0}
                style={{ marginRight: "1rem", textAlign: "right" }}
              >
                <Grid item xs={7}></Grid>
                <Grid item xs={3}>
                  {state?.userInfo ? (
                    <Typography
                      style={{ fontWeight: "bold", marginTop: "0.5rem" }}
                    >
                      {state?.userInfo?.userName}
                    </Typography>
                  ) : (
                    <Button
                      variant="outlined"
                      style={{
                        color: "#fff",
                      }}
                      onClick={() => setOpenLogin(true)}
                    >
                      Login
                    </Button>
                  )}
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Go To Cart">
                    <IconButton onClick={() => navigate("/cartSummary")}>
                      <StyledBadge badgeContent={4} color="primary">
                        <ShoppingCartIcon style={{ color: "#fff" }} />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={state?.userInfo?.userName} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleItemClick(setting)}
                      >
                        {isAdminUser && (
                          <Typography textAlign="center">
                            {setting?.label}
                          </Typography>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
