import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Paper, Typography } from "@mui/material";

export default function EmptyProductsScreen({ name }) {
  return (
    <Paper elevation={0} style={{ textAlign: "center", width: "100%" }}>
      <SentimentVeryDissatisfiedIcon
        color="primary"
        style={{ fontSize: "5rem" }}
      />
      <Typography variant="h3" gutterBottom style={{ color: "grey" }}>
        Sorry , no {name} found
      </Typography>
    </Paper>
  );
}
