import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../utils/dateUtils";
import CustomCard from "../../../shared/CustomCard";
import CustomTable from "../../../shared/CustomTable";
import Loader from "../../../shared/Loader";
import AdminProductsSlice, { AdminProducts } from "../../slices/slice";
import ProductModal from "./ProductModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomDialog from "../../../shared/CustomDialog";

function ProductsContainer() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(AdminProducts);
  const [mode, setMode] = useState("add");
  const [editData, setEditData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(AdminProductsSlice.actions.getProducts());
  }, []);

  const handleModal = (value) => {
    console.log(value, "[VALUE]");
    setOpenModal(value);
  };

  const handleDeleteProduct = (row) => {
    setOpenDeleteModal(true);
    setSelectedProduct(row);
  };

  const handleActionButton = (data) => {
    if (data.buttonType === "primary") {
      dispatch(
        AdminProductsSlice.actions.handleDeleteProduct(selectedProduct?._id)
      );
    }
    setOpenDeleteModal(false);
  };

  const columns = [
    {
      field: "_id",
      fieldLabel: "Id",
      render: (row) => row._id,
      align: "left",
    },
    {
      field: "name",
      fieldLabel: "Name",
      render: (row) => row.name,
      align: "left",
    },
    {
      field: "description",
      fieldLabel: "Description",
      render: (row) => row?.description?.split("\n")[0],
      align: "left",
    },
    {
      field: "category",
      fieldLabel: "Category",
      render: (row) => row.category,
      align: "left",
    },
    {
      field: "price",
      fieldLabel: "Price",
      render: (row) => row.price,
      align: "left",
    },
    {
      field: "color",
      fieldLabel: "Color",
      render: (row) => row.color,
      align: "left",
    },
    {
      field: "size",
      fieldLabel: "Size",
      render: (row) => row.size.map((r) => r),
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
      field: "edit",
      fieldLabel: "Actions",
      render: (row) => (
        <Grid container>
          <Grid item xs={6}>
            <Tooltip title="Edit">
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDeleteProduct(row)}>
                <DeleteOutlineIcon color="error" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ),
      align: "left",
    },
  ];

  const handleEdit = (data) => {
    setMode("edit");
    setOpenModal(true);
    setEditData(data);
  };

  const handleButtonClick = () => {
    setOpenModal(true);
    setEditData(null);
  };

  const TitleAction = () => {
    return (
      <Button variant="outlined" color="primary" onClick={handleButtonClick}>
        Add Product
      </Button>
    );
  };

  const FooterActions = () => {
    return null;
  };
  return (
    <>
      <Loader show={state.isLoading} />
      {openModal && (
        <ProductModal
          open={openModal}
          editData={editData}
          handleModal={handleModal}
          mode={mode}
        />
      )}

      {openDeleteModal && (
        <CustomDialog
          open={openDeleteModal}
          primaryButtonLabel={"Agree"}
          secondaryButtonLabel={"Cancel"}
          onClose={handleActionButton}
          content={
            <>
              <Typography>
                You have selected to delete this product{" "}
                <b>{selectedProduct.name}</b>
                <br></br>
                <br></br>
                If this is the action you wanted to do, please confirm your
                choice by clicking Agree, or cancel and return to the product
                page.
              </Typography>
              <br></br>
              <Typography variant="caption" display="block" gutterBottom>
                Note*:- Deletion of this record will be permanently erased from
                data base and can't be recovered ..!!
              </Typography>
            </>
          }
          title="Delete Product ?"
          maxWidth="md"
        />
      )}

      <CustomCard
        titleAction={<TitleAction />}
        title="Product List"
        subHeader={""}
        content={
          <CustomTable
            data={state.products}
            columns={columns}
            buttonLabel="Add Product"
            handleButtonClick={handleButtonClick}
          />
        }
        footerActions={<FooterActions />}
      />
    </>
  );
}

export default ProductsContainer;
