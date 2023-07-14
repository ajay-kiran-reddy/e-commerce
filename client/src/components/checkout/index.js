import { Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, UserSlice } from "../userProfile/slices/slice";
import { makeStyles } from "@mui/styles";
import Payment from "./Payment";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
  },
  title: {
    fontSize: "20px!important",
    fontWeight: 500,
  },
});

export default function CheckoutPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector(User);
  const [clientSecret, setClientSecret] = useState("");
  const [address, setAddress] = useState();

  useEffect(() => {
    dispatch(UserSlice.actions.getUserInfo());
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    if (userState?.userInfo?.user?.address) {
      const {
        fullName,
        addressPhoneNumber,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        pinCode,
        state,
        country,
      } = userState?.userInfo?.user?.address;
      setAddress(
        fullName,
        addressPhoneNumber,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        pinCode,
        state,
        country
      );
    }
  }, []);

  useEffect(() => {
    dispatch(UserSlice.actions.getUserInfo());
  }, []);

  return (
    <Grid container spacing={3} style={{ margin: "1rem" }}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8} className={classes.root}>
        {address && (
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Typography className={classes.title}>Shipping Address</Typography>
            <Divider style={{ marginTop: "0.5rem" }} />
            <div style={{ marginTop: "0.5rem" }}>
              <Typography variant="subtitle1">{address.fullName} ,</Typography>
              <Typography variant="subtitle1">
                {address.addressLine1} ,
              </Typography>
              <Typography variant="subtitle1">
                {address.addressLine2} ,
              </Typography>
              <Typography variant="subtitle1">
                {address.addressLine3},
              </Typography>
              <Typography variant="subtitle1">
                {address.addressPhoneNumber},
              </Typography>
              <Typography variant="subtitle1">{address.city},</Typography>
              <Typography variant="subtitle1">{address.pinCode},</Typography>
              <Typography variant="subtitle1">{address.state},</Typography>
              <Typography variant="subtitle1">{address.country}</Typography>
            </div>
          </Paper>
        )}
      </Grid>
      <Grid item xs={2}>
        <Payment />
      </Grid>
    </Grid>
  );
}
