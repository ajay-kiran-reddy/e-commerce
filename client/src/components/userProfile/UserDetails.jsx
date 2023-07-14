import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField } from "@mui/material";
import AddressSection from "./AddressSection";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { useDispatch, useSelector } from "react-redux";
import AdminProductsSlice, { AdminProducts } from "../admin/slices/slice";
import { User, UserSlice } from "./slices/slice";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function UserDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
  const AdminState = useSelector(AdminProducts);
  const userInfo = useSelector(User);

  useEffect(() => {
    dispatch(UserSlice.actions.getUserInfo());
  }, []);

  useEffect(() => {
    const userData = userInfo?.userInfo?.user;
    if (userData) {
      const { userName, email, image, phoneNumber, _id } = userData;
      setFormData({
        ...formData,
        userName,
        email,
        image,
        phoneNumber,
        userId: _id,
      });
    }
  }, [userInfo]);

  const handleChange = (event) => {
    const files = event.target.files;
    dispatch(AdminProductsSlice.actions.getImageFilesData(files));
  };

  useEffect(() => {
    if (AdminState.imageUrls.length > 0) {
      const profileImageUrl = AdminState.imageUrls[0];
      setFormData({ ...formData, image: profileImageUrl });
    }
  }, [AdminState]);

  const handleCBData = (data) => {
    setFormData({ ...formData, address: { ...data } });
  };

  const handleFormData = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveButton = () => {
    dispatch(UserSlice.actions.updateUserInfo(formData));
  };

  console.log(formData, "[FORM DATA]");

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3}>
        <TextField
          className={classes.root}
          label="Username"
          value={formData.userName}
          onChange={(e) => handleFormData(e, "userName")}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          className={classes.root}
          label="Email"
          value={formData.email}
          onChange={(e) => handleFormData(e, "email")}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          className={classes.root}
          label="Phone Number"
          type="number"
          value={formData.phoneNumber}
          onChange={(e) => handleFormData(e, "phoneNumber")}
        />
      </Grid>

      <Grid item xs={6} md={3}>
        <Button variant="outlined">Change Password</Button>
      </Grid>

      <Grid item xs={8}>
        <AddressSection handleCBData={handleCBData} />
      </Grid>
      <Grid item xs={4} style={{ textAlign: "right" }}>
        <input type="file" onChange={(e) => handleChange(e)} />
        <div style={{ marginTop: "1rem" }}>
          <img
            src={formData.image}
            alt="user_pofile_image"
            width="300px"
            height="300px"
            style={{ borderRadius: "50%" }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          startIcon={<BeenhereIcon />}
          variant="contained"
          onClick={handleSaveButton}
        >
          Save Profile
        </Button>
      </Grid>
    </Grid>
  );
}
