import { IconButton, Typography } from "@mui/material";
import { APP_ACTION_COLORS } from "../components/admin/dashboard/constants/DashboardConstants";
import { store } from "../store";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const isUserAuthenticated = () => {
  const appState = store.getState();
  const userObject = appState?.home?.userInfo;
  return userObject?.jwtToken?.accessToken;
};

const isAdminUser = () => {
  const appState = store.getState();
  const userObject = appState?.home?.userInfo;
  return userObject?.isAdmin;
};

const formatCurrencyToIndianRupees = (price, priceFontSize, isMrp) => {
  const formattedPrice = new Intl.NumberFormat().format(price);
  return (
    <Typography
      style={{
        color: !isMrp && APP_ACTION_COLORS.blue,
        fontWeight: !isMrp && "bold",
        fontSize: isMrp ? 12 : priceFontSize,
        textDecoration: isMrp && "line-through",
      }}
    >
      <IconButton style={{ padding: 0 }}>
        <CurrencyRupeeIcon
          style={{
            fontSize: isMrp ? 12 : 16,
            color: !isMrp && APP_ACTION_COLORS.blue,
          }}
        />
      </IconButton>
      {isMrp ? `M.R.P. :- ${formattedPrice}` : formattedPrice}
    </Typography>
  );
};

const isUserLoggedIn = () => {
  const userInfoJsonObject = sessionStorage.getItem("userInfo")
    ? sessionStorage.getItem("userInfo")
    : "";

  const userInfoParsedObject = userInfoJsonObject
    ? JSON.parse(userInfoJsonObject)
    : null;

  const accessToken = userInfoParsedObject?.jwtToken?.accessToken;
  return accessToken ? true : false;
};

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length < 6 ? false : true;
};

export {
  isUserAuthenticated,
  isAdminUser,
  formatCurrencyToIndianRupees,
  isUserLoggedIn,
  validateEmail,
  validatePassword,
};
