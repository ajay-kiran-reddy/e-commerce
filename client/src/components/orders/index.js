import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../shared/Loader";
import { Order, OrderSlice } from "./slices/slice";

export default function Orders() {
  const dispatch = useDispatch();
  const state = useSelector(Order);

  useEffect(() => {
    dispatch(OrderSlice.actions.getOrders());
  }, []);

  return (
    <div>
      <CustomLoader show={state.isLoading} />
      Welcome to orders page
    </div>
  );
}
