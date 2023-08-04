import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Paper, Typography } from "@mui/material";

export default function EmptyProductsScreen() {
  return (
    <Paper
      elevation={2}
      style={{ textAlign: "center", width: "100%", marginTop: "10rem" }}
    >
      <SentimentVeryDissatisfiedIcon
        color="primary"
        style={{ fontSize: "10rem" }}
      />
      <Typography variant="h3" gutterBottom style={{ color: "grey" }}>
        Sorry , no products found
      </Typography>
    </Paper>
  );
}
