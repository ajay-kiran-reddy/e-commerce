import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function Login({ handleFormDataCb }) {
  const [formData, setFormData] = useState({});

  const handleFormData = (e, field) => {
    setFormData({ ...formData, [field]: e?.target?.value });
  };

  useEffect(() => {
    handleFormDataCb(formData);
  }, [formData]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            placeholder="Enter Email"
            label="Email"
            value={formData?.userName}
            onChange={(e) => handleFormData(e, "email")}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Enter Password"
            label="Password"
            type="password"
            value={formData?.password}
            onChange={(e) => handleFormData(e, "password")}
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
