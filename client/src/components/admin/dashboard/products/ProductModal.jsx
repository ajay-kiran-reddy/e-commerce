import {
  Button,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAutoComplete from "../../../shared/CustomAutoComplete";
import CustomDialog from "../../../shared/CustomDialog";
import CustomLoader from "../../../shared/Loader";
import AdminProductsSlice, { AdminProducts } from "../../slices/slice";
import {
  APP_ACTION_COLORS,
  COLORS_OPTIONS,
  SIZE_OPTIONS,
} from "../constants/DashboardConstants";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ImageIcon from "@mui/icons-material/Image";
import { makeStyles } from "@mui/styles";
import CustomChip from "../../../shared/CustomChip";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  markAsThumbnail: {
    position: "absolute",
    bottom: "2rem",
    width: "100%",
    transition: "width 2s height 4s",
  },
  activeThumbnail: {
    position: "absolute",
    top: "2rem",
    width: "100%",
  },
});

const Content = ({ handleFormDataCb, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    color: "",
    size: "",
    images: [],
    additionalInfo: [],
  });
  const adminState = useSelector(AdminProducts);
  const [allCategories, setAllCategories] = useState([]);
  const dispatch = useDispatch();
  const [defaultCategory, setDefaultCategory] = useState({});
  const [tempAdditionalInfo, setTempAdditionalInfo] = useState({
    feature: "",
    value: "",
  });
  const [showTempAddInfo, setShowTempAddInfo] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState();

  const classes = useStyles();

  useEffect(() => {
    if (editData) {
      const category = allCategories.filter(
        (data) => data._id === editData.category._id
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

  const handleAdditionalInfo = (event, field, index) => {
    const value = event.target.value;
    /**If if index is not available, then consider it as temp data that user is adding */
    if (index === undefined) {
      if (field === "feature") {
        setTempAdditionalInfo({ ...tempAdditionalInfo, feature: value });
      } else {
        setTempAdditionalInfo({ ...tempAdditionalInfo, value: value });
      }
    }
    /**If index is available user is trying to update already existing data */
    if (index >= 0) {
      const addInfo = [...formData.additionalInfo];
      const object = { ...formData.additionalInfo[index] };
      if (field === "feature") {
        object.feature = value;
        addInfo[index] = object;
        setFormData({
          ...formData,
          additionalInfo: addInfo,
        });
      } else {
        object.value = value;
        addInfo[index] = object;
        const additionalInfo = addInfo;
        setFormData({
          ...formData,
          additionalInfo,
        });
      }
    }
  };

  const handleSaveAddInfo = () => {
    setFormData({
      ...formData,
      additionalInfo: [...formData.additionalInfo, tempAdditionalInfo],
    });
    setTempAdditionalInfo({ feature: "", value: "" });
    setShowTempAddInfo(false);
  };

  const handleRemoveInfo = (index) => {
    let addInfo = [...formData.additionalInfo];
    const updatedInfo = addInfo.filter((data, i) => i !== index);
    setFormData({ ...formData, additionalInfo: updatedInfo });
  };

  const handleMouseOver = (index) => {
    setShowThumbnail(true);
    setActiveImageIndex(index);
  };

  const handleThumbnail = (image) => {
    setFormData({ ...formData, thumbnail: image });
  };
  console.log(allCategories, "allCategories DATA");
  return (
    <Grid container spacing={3}>
      <CustomLoader show={adminState.isLoading} />
      <Grid item xs={6}>
        <TextField
          label="Name"
          value={formData.name}
          placeholder="Enter product name"
          onChange={(e) => handleFormData(e, "name")}
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
          value={formData.price}
          onChange={(e) => handleFormData(e, "price")}
          style={{ width: "100%" }}
          type="number"
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="MRP"
          placeholder="Enter MRP"
          value={formData.mrp}
          onChange={(e) => handleFormData(e, "mrp")}
          style={{ width: "100%" }}
          type="number"
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl sx={{ m: 1, minWidth: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
          <Select
            displayEmpty
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData.color || ""}
            defaultValue={formData.color || ""}
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
                  value={option.value}
                >
                  {option.label}
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
            value={formData.size || ""}
            defaultValue={formData.size || ""}
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

      <Grid item xs={12}>
        <Typography
          variant="title"
          style={{ fontWeight: 600 }}
          gutterBottom
          color="primary"
        >
          Additional Information
        </Typography>

        {formData.additionalInfo.map((info, index) => {
          return (
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <TextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="Feature"
                  value={formData.additionalInfo[index].feature}
                  onChange={(e) => handleAdditionalInfo(e, "feature", index)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="Value"
                  value={formData.additionalInfo[index].value}
                  onChange={(e) =>
                    handleAdditionalInfo(e, "featureValue", index)
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Remove this feature">
                  <IconButton
                    style={{ marginTop: "1rem" }}
                    onClick={() => handleRemoveInfo(index)}
                  >
                    <HighlightOffIcon
                      style={{ color: APP_ACTION_COLORS.red }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              {index === formData.additionalInfo.length - 1 && (
                <Grid item xs={1}>
                  <Tooltip title="Add new feature">
                    <IconButton
                      style={{ marginTop: "1rem" }}
                      onClick={() => setShowTempAddInfo(true)}
                    >
                      <AddIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          );
        })}
        {/**  Temporary Additional Info */}
        {(showTempAddInfo || formData.additionalInfo.length === 0) && (
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <TextField
                style={{ width: "100%" }}
                variant="standard"
                label="Feature"
                value={tempAdditionalInfo.feature}
                onChange={(e) => handleAdditionalInfo(e, "feature")}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                style={{ width: "100%" }}
                variant="standard"
                label="Value"
                value={tempAdditionalInfo.value}
                onChange={(e) => handleAdditionalInfo(e, "featureValue")}
              />
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Save">
                <IconButton
                  style={{ marginTop: "1rem" }}
                  onClick={handleSaveAddInfo}
                >
                  <DownloadDoneIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Add new feature">
                <IconButton style={{ marginTop: "1rem" }}>
                  <AddIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid item xs={12}>
        <TextareaAutosize
          label="Description"
          value={formData.description}
          placeholder="Enter product description"
          onChange={(e) => handleFormData(e, "description")}
          style={{ width: "100%" }}
          minRows={3}
        />
      </Grid>

      <Grid item xs={6}>
        <input
          type="file"
          multiple
          onChange={(e) => handleImageUpload(e)}
        ></input>
      </Grid>

      <Grid item xs={12} className={classes.root}>
        <ImageList
          sx={{ width: "100%", height: "100%" }}
          cols={2}
          rowHeight={"100%"}
        >
          {formData.images.map((image, index) => (
            <ImageListItem>
              <img
                src={image}
                style={{ cursor: "pointer" }}
                alt={"Product"}
                loading="lazy"
                onMouseOver={() => handleMouseOver(index)}
              />

              <div className={classes.activeThumbnail}>
                {formData.thumbnail === image && (
                  <CustomChip label="Thumbnail" />
                )}
              </div>
              <Slide
                direction="up"
                in={showThumbnail && index === activeImageIndex}
                mountOnEnter
                unmountOnExit
              >
                <div className={classes.markAsThumbnail}>
                  <Button
                    startIcon={<ImageIcon />}
                    variant="contained"
                    onClick={() => handleThumbnail(image)}
                  >
                    Select as Thumbnail
                  </Button>
                </div>
              </Slide>
            </ImageListItem>
          ))}
        </ImageList>
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
    } else {
      props.handleModal(data.value);
    }
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
      maxWidth="lg"
    />
  );
}

export default ProductModal;
