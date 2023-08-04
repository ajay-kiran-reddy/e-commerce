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
    <div>
      <Typography
        color={isMrp ? "secondary" : "primary"}
        style={{
          fontWeight: !isMrp && "bold",
          fontSize: isMrp ? 12 : priceFontSize,
          textDecoration: isMrp && "line-through",
        }}
      >
        <IconButton style={{ padding: 0 }}>
          <CurrencyRupeeIcon
            color={isMrp ? "secondary" : "primary"}
            style={{
              fontSize: isMrp ? 12 : 16,
            }}
          />
        </IconButton>
        {isMrp ? `M.R.P. :- ${formattedPrice}` : formattedPrice}
      </Typography>
    </div>
  );
};

const calculateDiscountPercentage = (productInfo) => {
  const { price, mrp } = productInfo || {};
  const priceDiff = Number(mrp) - Number(price);
  return ((priceDiff / mrp) * 100).toFixed(0);
};

const isUserLoggedIn = () => {
  const userInfoJsonObject = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
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

const isSessionExpired = () => {
  const appState = store.getState();
  const expiredTime = appState?.home?.userInfo?.jwtToken?.expiredAt;
  const currentTime = new Date().getTime();
  return expiredTime < currentTime;
};

export {
  isUserAuthenticated,
  isAdminUser,
  formatCurrencyToIndianRupees,
  isUserLoggedIn,
  validateEmail,
  validatePassword,
  isSessionExpired,
  calculateDiscountPercentage,
};
