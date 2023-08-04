import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { validateEmail, validatePassword } from "../../utils/globalUtils";
import { homeState } from "../home/slices/slice";
import CustomLoader from "../shared/Loader";

function Login({ handleFormDataCb }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const state = useSelector(homeState);

  const handleFormData = (e, field) => {
    setFormData({ ...formData, [field]: e?.target?.value });
  };

  useEffect(() => {
    handleFormDataCb(formData);
  }, [formData]);

  useEffect(() => {
    if (formData.email) {
      setIsEmailValid(validateEmail(formData.email));
    }
    if (formData.password) {
      setIsPasswordValid(validatePassword(formData.password));
    }
  }, [formData]);

  const handleEmailOnBlur = () => {
    isEmailValid
      ? setEmailHelperText("")
      : setEmailHelperText("You entered an invalid email");
  };

  const handlePasswordOnBlur = () => {
    isPasswordValid
      ? setPasswordHelperText("")
      : setPasswordHelperText("Your password should be atl east 6 characters");
  };

  return (
    <>
      <CustomLoader show={state?.isLoading} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            placeholder="Enter Email"
            label="Email"
            value={formData.userName}
            onChange={(e) => handleFormData(e, "email")}
            style={{ width: "100%" }}
            helperText={emailHelperText}
            error={emailHelperText}
            onBlur={handleEmailOnBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Enter Password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleFormData(e, "password")}
            style={{ width: "100%" }}
            onBlur={handlePasswordOnBlur}
            helperText={passwordHelperText}
            error={passwordHelperText}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
