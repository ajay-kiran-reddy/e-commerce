import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { formatDate } from "../../utils/dateUtils";
import { formatCurrencyToIndianRupees } from "../../utils/globalUtils";
import CustomCard from "../shared/CustomCard";
import CustomLoader from "../shared/Loader";
import { Order, OrderSlice } from "./slices/slice";
import CustomChip from "../shared/CustomChip";

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(Order);

  useEffect(() => {
    dispatch(OrderSlice.actions.getOrders());
  }, []);

  const Content = () => {
    return (
      <div>
        {state.orders.length > 0 ? (
          <div>
            {state.orders.map((order) => {
              return (
                <Paper
                  elevation={5}
                  style={{ padding: "1rem", marginBottom: "1rem" }}
                >
                  <Grid container>
                    <Grid item xs={6} style={{ textAlign: "left" }}>
                      <Typography
                        gutterBottom
                        style={{ fontWeight: 500, fontSize: 20 }}
                      >
                        Order Id : {order._id}
                      </Typography>

                      <Typography
                        variant="caption"
                        display="-ms-grid"
                        gutterBottom
                      >
                        Order Date: {formatDate(order.createdAt)}
                      </Typography>

                      <Typography
                        ml={5}
                        variant="caption"
                        display="-ms-grid"
                        gutterBottom
                        color="primary"
                      >
                        Estimated Delivery: {formatDate(order.createdAt)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "right" }}>
                      <Typography
                        variant="caption"
                        gutterBottom
                        style={{ textAlign: "right" }}
                      >
                        Delivery Status:
                      </Typography>
                      <CustomChip label={order.deliveryStatus} />
                    </Grid>

                    <Divider />

                    <Grid item xs={12}>
                      {order.products.map((product) => {
                        return (
                          <Grid
                            container
                            style={{
                              marginTop: "1rem",
                              cursor: "pointer",
                              border: "1px dotted gray",
                              borderRadius: "1rem",
                              padding: "1rem",
                            }}
                          >
                            <Grid
                              item
                              xs={2}
                              style={{
                                backgroundColor: "#F9F9F9",
                                borderRadius: "1rem",
                              }}
                              onClick={() =>
                                navigate(`/products/${product.product._id}`)
                              }
                            >
                              <img
                                src={product.product.images[0]}
                                alt="product_thumbnail"
                                height="100px"
                                width="100px"
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="subtitle1" gutterBottom>
                                {product.product.name}
                              </Typography>
                              <Typography
                                display="block"
                                variant="caption"
                                gutterBottom
                                style={{ textAlign: "left", width: "100%" }}
                              >
                                Color:- {product.product.color}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              {formatCurrencyToIndianRupees(
                                product.product.price
                              )}
                              <Typography variant="caption" gutterBottom>
                                Qty:- {product.quantity}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                    {/** ORDER SUMMARY */}
                    <Grid
                      item
                      xs={6}
                      md={4}
                      style={{ marginTop: "3rem", textAlign: "left" }}
                    >
                      <Typography gutterBottom variant="h5">
                        Order Summary
                      </Typography>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography gutterBottom variant="body1">
                            Subtotal
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {formatCurrencyToIndianRupees(order.amount)}
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography gutterBottom variant="body1">
                            Delivery
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {formatCurrencyToIndianRupees(0)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider
                        style={{
                          width: "100%",
                        }}
                      />

                      <Grid container style={{ marginTop: "1rem" }}>
                        <Grid item xs={6}>
                          Total
                        </Grid>
                        <Grid item xs={6}>
                          {formatCurrencyToIndianRupees(order.amount)}
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: "1rem" }}>
                          <Typography variant="h5">Payment</Typography>
                          <Typography gutterBottom variant="caption">
                            Visa **56{" "}
                            <span
                              style={{
                                color: "blue",
                                fontSize: "10px",
                                fontWeight: 700,
                                backgroundColor: "lightblue",
                              }}
                            >
                              VISA
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs={0} md={4}></Grid>
                    {/** DELIVERY SECTION */}
                    <Grid
                      item
                      xs={6}
                      md={4}
                      style={{ marginTop: "3rem", textAlign: "left" }}
                    >
                      <Typography gutterBottom variant="h5">
                        Delivery
                      </Typography>
                      <Typography gutterBottom variant="caption">
                        Address
                      </Typography>
                      <Typography gutterBottom>
                        {order.address.fullName}
                      </Typography>
                      <Typography gutterBottom>
                        {order.address.addressPhoneNumber}
                      </Typography>
                      <Typography gutterBottom>
                        {order.address.addressLine1}
                      </Typography>
                      <Typography gutterBottom>
                        {order.address.addressLine2},{" "}
                        {order.address.addressLine3}
                      </Typography>

                      <Typography gutterBottom>
                        {order.address.city} ,{order.address.state}
                      </Typography>
                      <Typography gutterBottom>
                        {order.address.country},{order.address.pinCode}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          </div>
        ) : (
          <Typography>No orders found</Typography>
        )}
      </div>
    );
  };

  return (
    <div>
      <CustomLoader show={state.isLoading} />
      <Grid container style={{ marginTop: "5rem" }}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <CustomCard title={` Orders :-`} content={<Content />} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
