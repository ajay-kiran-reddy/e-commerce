import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderSlice } from "./slices/slice";

export default function Orders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(OrderSlice.actions.getOrders());
  }, []);

  return <div>Welcome to orders page</div>;
}
