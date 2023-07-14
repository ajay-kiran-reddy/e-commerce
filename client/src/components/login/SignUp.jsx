import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SignUp({ handleFormDataCb }) {
  const [formData, setFormData] = useState({});

  const handleFormData = (e, field) => {
    setFormData({ ...formData, [field]: e?.target.value });
  };

  useEffect(() => {
    handleFormDataCb(formData);
  }, [formData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="User Name"
          placeholder="Enter user name"
          onChange={(e) => handleFormData(e, "userName")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="Email"
          placeholder="Enter email"
          onChange={(e) => handleFormData(e, "email")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="Password"
          placeholder="Enter password"
          type="password"
          onChange={(e) => handleFormData(e, "password")}
        />
      </Grid>
    </Grid>
  );
}
