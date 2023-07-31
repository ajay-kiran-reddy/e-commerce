import { Box, Grid, IconButton, Link, Rating, Typography } from "@mui/material";
import React from "react";
import {
  calculateDiscountPercentage,
  formatCurrencyToIndianRupees,
} from "../../utils/globalUtils";
import Specifications from "./Specifications";
import { APP_ACTION_COLORS } from "../admin/dashboard/constants/DashboardConstants";

export default function ProductDetails({ productInfo }) {
  return (
    <div>
      <Typography style={{ fontSize: "24px", textAlign: "left" }}>
        {productInfo?.name}
      </Typography>

      <Grid container style={{ margin: "0.5rem 0" }}>
        <Grid style={{ marginTop: "3px" }}>
          <Typography
            style={{
              fontSize: "14px",
            }}
          >
            4.0
          </Typography>
        </Grid>

        <Grid>
          <Rating name="simple-controlled" value={4} />
        </Grid>
        <Grid>
          <Link style={{ cursor: "pointer", marginLeft: "1rem" }}>
            326 ratings
          </Link>
        </Grid>
      </Grid>
      <div style={{ textAlign: "left" }}>
        <Grid container>
          <Grid item>
            {formatCurrencyToIndianRupees(productInfo?.price, 28)}
          </Grid>
          <Grid item style={{ marginTop: "10px" }}>
            <span
              style={{
                fontSize: "20px",
                marginLeft: "1rem",
                fontWeight: "bold",
                color: APP_ACTION_COLORS.green,
              }}
            >
              {calculateDiscountPercentage(productInfo) + "% off"}
            </span>
          </Grid>
        </Grid>
      </div>
      <Grid container>
        <Grid item>
          <span style={{ textDecoration: "line-through" }}>
            {formatCurrencyToIndianRupees(productInfo?.mrp, 12, true)}
          </span>
        </Grid>
        <div style={{ textAlign: "left", width: "100%" }}>
          <Typography
            style={{ texAlign: "left" }}
            variant="caption"
            display="block"
            gutterBottom
          >
            Inclusive of all taxes
          </Typography>
          <Grid container>
            <Grid item style={{ textAlign: "left" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ textTransform: "capitalize" }}
              >
                Available colour :{productInfo?.color}
              </Typography>
            </Grid>
            <Grid item>
              <Box
                style={{
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                  height: "25px",
                  width: "25px",
                  borderRadius: "50%",
                  backgroundColor: productInfo?.color,
                }}
              ></Box>
            </Grid>
          </Grid>

          <Specifications productInfo={productInfo} />
        </div>
      </Grid>
    </div>
  );
}
