import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAutoComplete from "../../../shared/CustomAutoComplete";
import RecursiveContainer from "./RecursiveCategories";
import CustomTextArea from "../../../shared/CustomTextArea";
import PageInfo from "../../../shared/PageInfo";
import AdminProductsSlice, { AdminProducts } from "../../slices/slice";

function Categories() {
  const dispatch = useDispatch();
  const state = useSelector(AdminProducts);
  const [formData, setFormData] = useState({
    description: "",
    parentId: "",
  });

  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  useEffect(() => {
    setCategories(state?.categories);
  }, [state?.categories]);

  useEffect(() => {
    dispatch(AdminProductsSlice.actions.fetchCategories());
  }, []);

  const handleCallBack = (data) => {
    const dropdownData = data?.children;
    if (data.field === "category") {
      setSubCategories(dropdownData);
    } else if (data.field === "subCategory") {
      setSubSubCategories(dropdownData);
    }

    if (dropdownData) {
      setFormData({ parentId: data._id, name: data?.name });
    } else {
      setFormData({ name: data?.name, parentId: formData?.parentId });
    }
  };

  const handleTextArea = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSaveButton = () => {
    dispatch(AdminProductsSlice.actions.createCategory(formData));
    setFormData({ description: "", parentId: "" });
    setSubCategories([]);
    setSubSubCategories([]);
    setCategories([]);
  };

  const RenderCategories = ({ categories }) => {
    return categories?.map((cat) => {
      return <RecursiveContainer tree={cat} />;
    });
  };

  return (
    <>
      <PageInfo description="You can add categories, sub categories and sub sub categories of the products." />
      <Grid container spacing={3}>
        <Grid item xs={6} md={4} lg={3}>
          <CustomAutoComplete
            handleCallBack={handleCallBack}
            label={"Add Category"}
            data={categories}
            field="category"
            customOption={true}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <CustomAutoComplete
            handleCallBack={handleCallBack}
            label={"Add Sub Category"}
            field="subCategory"
            data={subCategories}
            disabled={!formData?.parentId}
            customOption={true}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <CustomAutoComplete
            handleCallBack={handleCallBack}
            label={"Add Sub Sub Category"}
            field="subSubCategory"
            data={subSubCategories}
            disabled={!formData?.parentId}
            customOption={true}
          />
        </Grid>

        <Grid item xs={6} md={4} lg={3}>
          <CustomTextArea
            placeholder={"Description about the category"}
            handleCallBack={handleTextArea}
            value={formData.description}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveButton}
            style={{ marginTop: "1rem" }}
          >
            Save
          </Button>
        </Grid>

        <div>
          <RenderCategories categories={state?.categories} />
        </div>
      </Grid>
    </>
  );
}

export default Categories;
