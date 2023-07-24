import { Chip, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../utils/dateUtils";
import { formatCurrencyToIndianRupees } from "../../../../utils/globalUtils";
import CustomCard from "../../../shared/CustomCard";
import CustomTable from "../../../shared/CustomTable";
import AdminProductsSlice, { AdminProducts } from "../../slices/slice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomLoader from "../../../shared/Loader";
import CustomChip from "../../../shared/CustomChip";

export default function Orders() {
  const dispatch = useDispatch();
  const state = useSelector(AdminProducts);

  useEffect(() => {
    dispatch(AdminProductsSlice.actions.fetchAllOrders());
  }, []);

  const handleChange = (order, e) => {
    const deliveryStatus = e.target.value;
    dispatch(
      AdminProductsSlice.actions.updateOrder({ ...order, deliveryStatus })
    );
  };

  const columns = [
    {
      field: "_id",
      fieldLabel: "Order Id",
      render: (row) => row._id,
      align: "left",
    },
    {
      field: "userId",
      fieldLabel: "User Id",
      render: (row) => row.userId,
      align: "left",
    },

    {
      field: "amount",
      fieldLabel: "Amount",
      render: (row) => {
        return formatCurrencyToIndianRupees(row.amount);
      },
      align: "left",
    },
    {
      field: "deliveryStatus",
      fieldLabel: "Delivery Status",
      render: (row) => <CustomChip label={row.deliveryStatus} />,
      align: "left",
    },

    {
      field: "createdAt",
      fieldLabel: "Created At",
      render: (row) => formatDate(row.createdAt),
      align: "left",
    },
    {
      field: "updatedAt",
      fieldLabel: "Last modified",
      render: (row) => formatDate(row.updatedAt),
      align: "left",
    },
    {
      field: "update_delivery_status",
      fieldLabel: "Update Status",
      render: (row) => (
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={row.deliveryStatus}
              onChange={(e) => handleChange(row, e)}
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Ordered"}>Ordered</MenuItem>
              <MenuItem value={"Dispatched"}>Dispatched</MenuItem>
              <MenuItem value={"In Transit"}>In Transit</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
            </Select>
          </FormControl>
        </div>
      ),
      align: "left",
    },
  ];

  return (
    <div>
      <CustomLoader show={state.isLoading} />
      <CustomCard
        title="Orders List"
        subHeader={""}
        content={
          <CustomTable
            data={state.allOrders}
            columns={columns}
            buttonLabel="Add Product"
            // handleButtonClick={handleButtonClick}
          />
        }
      />
    </div>
  );
}
