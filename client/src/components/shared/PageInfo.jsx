import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Typography } from "@mui/material";

function PageInfo({ description }) {
  return (
    <div style={{ textAlign: "left" }}>
      <Typography variant="body1" gutterBottom>
        <IconButton>
          <InfoIcon color="primary" />
        </IconButton>
        {description}
      </Typography>
    </div>
  );
}

export default PageInfo;
