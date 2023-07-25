import { Grid } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {},
  specificationsLabel: {
    fontWeight: "bold",
    fontSize: "14px",
    padding: "5px",
  },
  specificationsValue: {
    fontSize: "14px",
    padding: "5px",
  },
  description: {
    fontSize: "14px",
  },
});

export default function Specifications({ productInfo }) {
  const classes = useStyles();
  const descriptionPoints = productInfo?.description.split("\n");

  return (
    <div>
      <Grid container>
        {productInfo?.additionalInfo.map((info, index) => {
          return (
            <>
              <Grid item xs={3} className={classes.specificationsLabel}>
                {info.feature}
              </Grid>
              <Grid item xs={3} className={classes.specificationsValue}>
                {info.value}
              </Grid>
              <Grid item xs={6}></Grid>
            </>
          );
        })}

        <Grid item xs={3} className={classes.specificationsLabel}>
          About this item :-
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={12} className={classes.description}>
          {descriptionPoints?.map((desc) => {
            return <li style={{ padding: "3px" }}>{desc}</li>;
          })}
        </Grid>
      </Grid>
    </div>
  );
}
