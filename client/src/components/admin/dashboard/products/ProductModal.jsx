import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAutoComplete from "../../../shared/CustomAutoComplete";
import CustomDialog from "../../../shared/CustomDialog";
import CustomLoader from "../../../shared/Loader";
import AdminProductsSlice, { AdminProducts } from "../../slices/slice";
import { COLORS_OPTIONS, SIZE_OPTIONS } from "../constants/DashboardConstants";
import ReactImageMagnify from "react-image-magnify";

const Content = ({ handleFormDataCb, editData }) => {
  const [formData, setFormData] = useState();
  const adminState = useSelector(AdminProducts);
  const [allCategories, setAllCategories] = useState([]);
  const dispatch = useDispatch();
  const [defaultCategory, setDefaultCategory] = useState({});

  useEffect(() => {
    if (editData) {
      const category = allCategories.filter(
        (data) => data._id === editData.category
      );
      setFormData({
        ...editData,
        category: category.length > 0 ? category[0]._id : "",
      });
      setDefaultCategory(category);
    }
  }, [editData, allCategories]);

  useEffect(() => {
    dispatch(AdminProductsSlice.actions.fetchCategories());
  }, []);

  useEffect(() => {
    if (adminState?.imageUrls) {
      setFormData({ ...formData, images: adminState?.imageUrls });
    }
  }, [adminState?.imageUrls]);

  useEffect(() => {
    /**
     * This effect will fetches all categories, sub categories and sub sub categories available in consolidate into one list
     */
    const categoryList = [];
    adminState?.categories.forEach((cat) => {
      if (cat?.children.length > 0) {
        cat?.children.forEach((subCat) => {
          if (subCat?.children.length > 0) {
            subCat?.children.forEach((subSubCat) => {
              const isCategoryExist = categoryList.find(
                (data) => data._id === subSubCat._id
              );
              !isCategoryExist && categoryList.push(subSubCat);
            });
          }
          // const isCategoryExist = categoryList.find(
          //   (data) => data._id === subCat._id
          // );
          /*  !isCategoryExist && categoryList.push(subCat); */
        });
      }
      // const isCategoryExist = categoryList.find((data) => data._id === cat._id);
      /* !isCategoryExist && categoryList.push(cat); */
    });
    setAllCategories(categoryList);
  }, [adminState?.categories]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    dispatch(AdminProductsSlice.actions.getImageFilesData(files));
  };

  useEffect(() => {
    handleFormDataCb(formData);
  }, [formData]);

  const handleFormData = (e, field) => {
    const value = e?.target?.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleAutoComplete = (data) => {
    setFormData({ ...formData, category: data._id });
  };

  return (
    <Grid container spacing={3}>
      <CustomLoader show={adminState.isLoading} />
      <Grid item xs={6}>
        <TextField
          label="Name"
          value={formData?.name}
          placeholder="Enter product name"
          onChange={(e) => handleFormData(e, "name")}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Description"
          value={formData?.description}
          placeholder="Enter product description"
          onChange={(e) => handleFormData(e, "description")}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomAutoComplete
          data={allCategories}
          handleCallBack={handleAutoComplete}
          label="Select Category"
          defaultValue={defaultCategory}
          customOption={false}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Price"
          placeholder="Enter product's price"
          value={formData?.price}
          onChange={(e) => handleFormData(e, "price")}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl sx={{ m: 1, minWidth: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
          <Select
            displayEmpty
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData?.color || ""}
            defaultValue={formData?.color || ""}
            label="Color"
            placeholder="Enter product's color"
            onChange={(e) => handleFormData(e, "color")}
            renderValue={(value) => {
              return value || "";
            }}
          >
            {COLORS_OPTIONS.map((option, index) => {
              return (
                <MenuItem
                  key={index}
                  style={{ color: `${option.code}` }}
                  value={option?.value}
                >
                  {option?.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl sx={{ m: 1, minWidth: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData?.size || ""}
            defaultValue={formData?.size || ""}
            label="Size"
            placeholder="Enter product's size"
            onChange={(e) => handleFormData(e, "size")}
            renderValue={(value) => {
              return value || "";
            }}
          >
            {SIZE_OPTIONS.map((size, index) => {
              return (
                <MenuItem
                  key={index}
                  value={size.value}
                >{`${size.name} (${size.suffix})`}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <input
          type="file"
          multiple
          onChange={(e) => handleImageUpload(e)}
        ></input>
      </Grid>

      <Grid item xs={12}>
        {formData?.images?.map((image) => {
          return (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: image,
                },
                largeImage: {
                  src: image,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

function ProductModal(props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();

  const handleUpload = () => {
    if (props.editData) {
      dispatch(AdminProductsSlice.actions.storeUpdateProductInfo(formData));
    } else {
      dispatch(AdminProductsSlice.actions.createProduct(formData));
    }
    props.handleModal(false);
  };

  const handleFormData = (data) => {
    setFormData(data);
  };

  const handleActionButton = (data) => {
    if (data.buttonType === "primary") {
      handleUpload();
    }
    props.handleModal(data.value);
    dispatch(AdminProductsSlice.actions.resetData());
  };

  useEffect(() => {
    return () => {
      dispatch(AdminProductsSlice.actions.resetData());
    };
  }, []);

  return (
    <CustomDialog
      open={props.open}
      primaryButtonLabel={"Save"}
      onClose={handleActionButton}
      content={
        <Content handleFormDataCb={handleFormData} editData={props.editData} />
      }
      title="Add Product"
      maxWidth="md"
    />
  );
}

export default ProductModal;
