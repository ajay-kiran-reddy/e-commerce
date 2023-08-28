import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Login from "../login/Login";
import CustomDialog from "../shared/CustomDialog";
import { Grid, Link } from "@mui/material";
import SignUp from "../login/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { HomeSlice, homeState, updateCurrentRef } from "./slices/slice";
import CustomLoader from "../shared/Loader";
import {
  isAdminUser,
  isSessionExpired,
  isUserLoggedIn,
} from "../../utils/globalUtils";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { alpha, styled } from "@mui/material/styles";
import {
  ADMIN_USER_SETTINGS_MENU,
  USER_SETTINGS_MENU,
} from "../../constants/GlobalConstants";
import { Cart, CartSlice } from "../cart/slices/slice";
import AdminProductsSlice, { AdminProducts } from "../admin/slices/slice";
import SearchIcon from "@mui/icons-material/Search";
import { THEME_COLORS } from "../admin/dashboard/constants/DashboardConstants";
import MoreIcon from "@mui/icons-material/MoreVert";
import { ProductSlice } from "../productPage/slices/slice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

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

  const [settings, setSettings] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState();
  const state = useSelector(homeState);
  const [disablePrimary, setDisablePrimary] = useState(true);
  const [disableSecondary, setDisableSecondary] = useState(true);
  const cartState = useSelector(Cart);
  const [cartQty, setCartQty] = useState(0);
  const productsInfo = useSelector(AdminProducts);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchText, setSearchText] = useState("");
  const pages = productsInfo.categories;

  const sessionExpired = isSessionExpired();

  const handleItemClick = (setting) => {
    const value = setting?.value;
    if (value === "profile") {
      navigate(ROUTING_CONSTANTS.ROUTE_TO_PROFILE);
    } else if (value === "adminDashboard") {
      navigate(ROUTING_CONSTANTS.ADMIN_DASHBOARD_ROUTE);
    } else if (value === "logout") {
      dispatch(HomeSlice.actions.handleLogOutUser());
    } else if (value === "orders") {
      navigate(ROUTING_CONSTANTS.ROUTE_TO_ORDERS);
    } else if (value === "switchTheme") {
      var item = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
      localStorage.setItem("themeColor", item);
      window.location.reload();
    } else if (value === "cart") {
      navigate(ROUTING_CONSTANTS.ROUTE_TO_CART_SUMMARY);
    }
    handleCloseUserMenu();
  };

  useEffect(() => {
    const products = cartState?.cartSummary?.products;
    setCartQty(products?.reduce((a, b) => a + b.quantity, 0));
  }, [cartState]);

  useEffect(() => {
    dispatch(AdminProductsSlice.actions.getProducts());
    dispatch(AdminProductsSlice.actions.fetchCategories());
  }, []);

  useEffect(() => {
    const isAdmin = isAdminUser();
    if (isAdmin) {
      setSettings(ADMIN_USER_SETTINGS_MENU);
    } else {
      setSettings(USER_SETTINGS_MENU);
    }
  }, [state?.userInfo]);

  useEffect(() => {
    isUserLoggedIn() && dispatch(CartSlice.actions.getCartSummary());
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page?.name) {
      dispatch(updateCurrentRef(page));
      navigate(`/browse/${page?.name}`);
      localStorage.setItem("activeCategory", JSON.stringify(page));
    }
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
        const { password, email } = formData;
        setDisablePrimary(!(password && email));
        setDisableSecondary(!email);
      }
    }
  }, [formData]);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {sessionExpired && (
          <Button variant="outlined" onClick={() => setOpenLogin(true)}>
            Login
          </Button>
        )}
      </MenuItem>
      <MenuItem>
        <Tooltip title="Go To Cart">
          <IconButton onClick={() => navigate("/cartSummary")}>
            <StyledBadge badgeContent={cartQty} color="primary">
              <ShoppingCartIcon color="primary" />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </MenuItem>
      <MenuItem>
        <div>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                alt={state?.userInfo?.userName}
                src={state?.userInfo?.image}
              />
            </IconButton>
          </Tooltip>
          <Menu
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
              <MenuItem key={setting} onClick={() => handleItemClick(setting)}>
                {isAdminUser && (
                  <Typography textAlign="center">{setting?.label}</Typography>
                )}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </MenuItem>
    </Menu>
  );

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log(searchText, "[SEARCH TEXT]");
      dispatch(ProductSlice.actions.searchProducts(searchText));
      navigate(ROUTING_CONSTANTS.ROUTE_TO_SEARCH);
      setSearchText("");
    }
  };

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
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
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
                onClose={() => handleCloseNavMenu()}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, i) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              AV Stores
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, i) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyDown={handleSearch}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Search>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Grid container spacing={0} style={{ textAlign: "right" }}>
                <Grid item>
                  {state?.userInfo && !sessionExpired ? (
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
                <Grid item>
                  <Tooltip title="Go To Cart">
                    <IconButton onClick={() => navigate("/cartSummary")}>
                      <StyledBadge badgeContent={cartQty} color="primary">
                        <ShoppingCartIcon style={{ color: "#fff" }} />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Open settings">
                    <IconButton
                      style={{ marginLeft: "0.5rem" }}
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <Avatar
                        alt={state?.userInfo?.userName}
                        src={state?.userInfo?.image}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
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
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
            {renderMobileMenu}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
