let RESET_API_RESPONSE = {
  message: "",
  status: "",
  visible: false,
};

let SUCCESS_API_RESPONSE = {
  message: "",
  severity: "success",
  visible: true,
};

let FAILURE_API_RESPONSE = {
  message: "",
  severity: "error",
  visible: true,
};

function getSuccessApiResponse(response) {
  let data = { ...SUCCESS_API_RESPONSE };
  data.message = response?.message;
  return data;
}

function getFailureApiResponse(response) {
  let data = { ...FAILURE_API_RESPONSE };
  data.message = response?.response?.data?.message;
  return data;
}

const USER_SETTINGS_MENU = [
  {
    label: "Profile",
    value: "profile",
  },
  {
    label: "Orders",
    value: "orders",
  },
  {
    label: "Cart",
    value: "cart",
  },
  {
    label: "Logout",
    value: "logout",
  },
  {
    label: "Switch Theme",
    value: "switchTheme",
  },
];

const ADMIN_USER_SETTINGS_MENU = [
  {
    label: "Profile",
    value: "profile",
  },
  {
    label: "Admin Dashboard",
    value: "adminDashboard",
  },
  {
    label: "Orders",
    value: "orders",
  },
  {
    label: "Cart",
    value: "cart",
  },
  {
    label: "Logout",
    value: "logout",
  },
  {
    label: "Switch Theme",
    value: "switchTheme",
  },
];

export {
  RESET_API_RESPONSE,
  getSuccessApiResponse,
  getFailureApiResponse,
  USER_SETTINGS_MENU,
  ADMIN_USER_SETTINGS_MENU,
};
