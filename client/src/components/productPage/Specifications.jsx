import { Grid, IconButton, ListItem, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import { APP_ACTION_COLORS } from "../admin/dashboard/constants/DashboardConstants";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SellIcon from "@mui/icons-material/Sell";

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
  description: {},
});

export default function Specifications({ productInfo }) {
  const classes = useStyles();
  const descriptionPoints = productInfo?.description.split("\n");

  return (
    <div>
      {/**Delivery options */}
      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
        <IconButton>
          <LocalShippingIcon />
        </IconButton>
        Delivery Options{" "}
      </Typography>
      <ListItem style={{ padding: 2, paddingTop: 0 }}>
        100% Original Products{" "}
      </ListItem>
      <ListItem style={{ padding: 2 }}>
        Pay on delivery might be available
      </ListItem>
      <ListItem style={{ padding: 2 }}>
        Easy 30 days returns and exchanges{" "}
      </ListItem>
      <ListItem style={{ padding: 2 }}>Try & Buy might be available</ListItem>
      <br />

      {/**Best Price */}

      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
        <IconButton>
          <SellIcon />
        </IconButton>
        Best Price{" "}
      </Typography>
      <ListItem style={{ padding: 2, paddingTop: 0 }}>
        Applicable on: Orders above Rs. 1499 (only on first purchase)
      </ListItem>
      <ListItem style={{ padding: 2 }}>Coupon code: AJV40</ListItem>
      <ListItem style={{ padding: 2 }}>
        Coupon Discount: Rs. 40 off (check cart for final savings)
      </ListItem>
      <Typography variant="caption" color="primary">
        View Eligible Products
      </Typography>
      <br />
      <br />

      {/**Additional Features */}
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
            <InfoIcon style={{ color: "grey" }} />
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
