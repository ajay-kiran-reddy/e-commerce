const SIZE_OPTIONS = [
  {
    name: "Extra Small",
    suffix: "XS",
    value: "xs",
  },
  {
    name: "Small",
    suffix: "S",
    value: "s",
  },
  {
    name: "Medium",
    suffix: "M",
    value: "m",
  },
  {
    name: "Large",
    suffix: "L",
    value: "l",
  },
  {
    name: "Extra Large",
    suffix: "XL",
    value: "xl",
  },
  {
    name: "Double Extra Large",
    suffix: "XXL",
    value: "xxl",
  },
];

const COLORS_OPTIONS = [
  { label: "Red", value: "red", code: "#D50000" },
  { label: "Pink", value: "pink", code: "#C51162" },
  { label: "Purple", value: "purple", code: "#8300EA" },
  { label: "Corn Flower", value: "cornflower", code: "#627BD4" },
  { label: "Dark Blue", value: "DarkBlue", code: "#021933" },
  { label: "Light Blue", value: "lightBlue", code: "#0091EA" },
  { label: "Teal", value: "teal", code: "#00BFA5" },
  { label: "Green", value: "green", code: "#00C853" },
  { label: "Lime", value: "lime", code: "#A2D72B" },
  { label: "Yellow", value: "yellow", code: "#FFD600" },
  { label: "Orange", value: "orange", code: "#F56C08" },
  { label: "Blue Grey", value: "blueGrey", code: "#072839" },
  { label: "Dark Blue Grey", value: "darkBlueGrey", code: "#000B26" },
  { label: "Grey", value: "grey", code: "#303030" },
  { label: "White", value: "white", code: "#fff" },
];

const APP_ACTION_COLORS = {
  green: "#00BFA5",
  blue: "#1769aa",
  red: "#D50000",
  pink: "#C51162",
};

const THEME_COLORS = ["#00BFA5", "#1769aa", "#FF3F6B", "#8300EA", "#F56C08"];

const ACTIVE = "ACT";
const INACTIVE = "INA";

const DELIVERY_STATUS_CONSTANTS = {
  ORDERED: "Ordered",
  DISPATCHED: "Dispatched",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
};
export {
  SIZE_OPTIONS,
  COLORS_OPTIONS,
  APP_ACTION_COLORS,
  DELIVERY_STATUS_CONSTANTS,
  ACTIVE,
  INACTIVE,
  THEME_COLORS,
};
