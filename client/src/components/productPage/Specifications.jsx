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
  },
  description: {
    fontSize: "14px",
  },
});

export default function Specifications({ productInfo }) {
  const classes = useStyles();
  const descriptionPoints = productInfo?.description.split("||");

  return (
    <div>
      <Grid container>
        <Grid item xs={3} className={classes.specificationsLabel}>
          Brand
        </Grid>
        <Grid item xs={3} className={classes.specificationsValue}>
          One Plus
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3} className={classes.specificationsLabel}>
          Model Name
        </Grid>
        <Grid item xs={3} className={classes.specificationsValue}>
          OnePlus Nord CE 2
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3} className={classes.specificationsLabel}>
          Storage
        </Grid>
        <Grid item xs={3} className={classes.specificationsValue}>
          64GB
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3} className={classes.specificationsLabel}>
          RAM Size
        </Grid>
        <Grid item xs={3} className={classes.specificationsValue}>
          4GB
        </Grid>
        <Grid item xs={6}></Grid>

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
