import { Grid, IconButton, ListItem } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import { APP_ACTION_COLORS } from "../admin/dashboard/constants/DashboardConstants";

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
    textAlign: "left",
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
              <Grid item xs={9} className={classes.specificationsValue}>
                {info.value}
              </Grid>
            </>
          );
        })}

        <Grid item xs={4} className={classes.specificationsLabel}>
          <IconButton>
            <InfoIcon style={{ color: APP_ACTION_COLORS.blue }} />
          </IconButton>{" "}
          About this item :-
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={12} className={classes.description}>
          {descriptionPoints?.map((desc) => {
            return <ListItem style={{ padding: "5px" }}>{desc}</ListItem>;
          })}
        </Grid>
      </Grid>
    </div>
  );
}
