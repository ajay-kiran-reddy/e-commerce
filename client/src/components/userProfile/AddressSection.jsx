import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAutoComplete from "../shared/CustomAutoComplete";
import countries from "./countries.json";
import { makeStyles } from "@mui/styles";
import states from "./states.json";
import { useSelector } from "react-redux";
import { User } from "./slices/slice";

const useStyles = makeStyles({
  label: {
    textAlign: "left",
    fontWeight: "500!important",
    fontSize: "20px!important",
  },
  textField: {
    width: "100%",
  },
});
export default function AddressSection({ handleCBData }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    addressPhoneNumber: "",
    pinCode: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
  });
  const userInfo = useSelector(User);

  const handleFormData = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleCountrySelection = (data) => {
    setFormData({ ...formData, country: data?.name });
  };
  const handleStateSelection = (data) => {
    setFormData({ ...formData, state: data?.name });
  };

  useEffect(() => {
    const userData = userInfo?.userInfo?.user;
    if (userData) {
      const {
        country,
        fullName,
        addressPhoneNumber,
        pinCode,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        state,
      } = userData?.address;
      setFormData({
        ...formData,
        country,
        fullName,
        addressPhoneNumber,
        pinCode,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        state,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    handleCBData(formData);
  }, [formData]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography className={classes.label}>Address :-</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button>Add New Address</Button>
        </Grid>
        <Grid item xs={6}>
          <CustomAutoComplete
            data={countries}
            customOption={false}
            label="Select Country"
            handleCallBack={handleCountrySelection}
          />
        </Grid>
        <Grid item xs={6} className={classes.textField}>
          <TextField
            className={classes.textField}
            label="Full Name"
            placeholder="First name and Last name"
            onChange={(e) => handleFormData(e, "fullName")}
            value={formData.fullName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            label="Phone Number"
            placeholder="First name and Last name"
            type="number"
            onChange={(e) => handleFormData(e, "addressPhoneNumber")}
            value={formData.addressPhoneNumber}
            // InputProps={{ inputProps: { min: 0, max: 10 } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            label="Pin Code"
            placeholder="6 digits[0-9] PIN code"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 999999 } }}
            onChange={(e) => handleFormData(e, "pinCode")}
            value={formData.pinCode}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            label="Flat, House no., Building, Company, Apartment"
            onChange={(e) => handleFormData(e, "addressLine1")}
            value={formData.addressLine1}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            label="Area, Street, Sector, Village"
            onChange={(e) => handleFormData(e, "addressLine2")}
            value={formData.addressLine2}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            label="Landmark"
            placeholder="Eg:-  near apollo hospital"
            onChange={(e) => handleFormData(e, "addressLine3")}
            value={formData.addressLine3}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            label="Town/City"
            placeholder="Eg:-  near apollo hospital"
            onChange={(e) => handleFormData(e, "city")}
            value={formData.city}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomAutoComplete
            data={states}
            label="Select State"
            customOption={false}
            handleCallBack={handleStateSelection}
          />
        </Grid>
      </Grid>
    </div>
  );
}
