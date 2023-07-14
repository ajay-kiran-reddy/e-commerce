import {
  Button,
  Grid,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { APP_ACTION_COLORS } from "../constants/DashboardConstants";
import { useDispatch, useSelector } from "react-redux";
import AdminProductsSlice, { AdminProducts } from "../../slices/slice";
import CustomDialog from "../../../shared/CustomDialog";
import { makeStyles } from "@mui/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const EditModalContent = ({ handleFormDataCb }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState();
  const state = useSelector(AdminProducts);

  const handleFormData = (event, field) => {
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    setFormData(state?.categoryInfo);
  }, [state?.categoryInfo]);

  useEffect(() => {
    handleFormDataCb(formData);
  }, [formData]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField
          className={classes.root}
          id="standard-basic"
          label="Category Name"
          variant="outlined"
          value={formData?.name}
          onChange={(e) => handleFormData(e, "name")}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          className={classes.root}
          id="standard-basic"
          label="Category Description"
          variant="outlined"
          value={formData?.description}
          onChange={(e) => handleFormData(e, "description")}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          className={classes.root}
          id="standard-basic"
          label="Parent Category"
          variant="outlined"
          value={formData?.parentId}
          onChange={(e) => handleFormData(e, "parentId")}
        />
      </Grid>
    </Grid>
  );
};

export default function RecursiveContainer({ tree }) {
  const state = useSelector(AdminProducts);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const expand = () => {
    setIsVisible(!isVisible);
  };

  const handleEditButton = () => {
    dispatch(AdminProductsSlice.actions.getCategoryDataById(tree));
  };

  const handleActionButton = (data) => {
    if (data?.buttonType === "primary") {
      dispatch(AdminProductsSlice.actions.updateCategory(formData));
    } else if (data?.buttonType === "close") {
      dispatch(AdminProductsSlice.actions.closeEditCategoryModal());
    }
  };

  const handleFormDataCb = (data) => {
    setFormData(data);
  };

  const handleDeleteCategory = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteActionButton = (data) => {
    if (data?.buttonType === "primary") {
      dispatch(AdminProductsSlice.actions.deleteCategory(tree?._id));
    }
    setOpenDeleteModal(false);
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      <CustomDialog
        open={state?.openEditCategoryModal}
        primaryButtonLabel={"Save"}
        onClose={handleActionButton}
        content={<EditModalContent handleFormDataCb={handleFormDataCb} />}
        title="Edit Category"
        maxWidth="lg"
      />

      {openDeleteModal && (
        <CustomDialog
          open={openDeleteModal}
          primaryButtonLabel={"Agree"}
          secondaryButtonLabel={"Cancel"}
          onClose={handleDeleteActionButton}
          content={
            <>
              <Typography>
                You have selected to delete this category <b>{tree?.name}</b>
                <br></br>
                <br></br>
                If this is the action you wanted to do, please confirm your
                choice by clicking Agree, or cancel and return to the category
                page.
              </Typography>
              <br></br>
              <Typography variant="caption" display="block" gutterBottom>
                Note*:- Deletion of this record will be permanently erased from
                data base and can't be recovered ..!!
              </Typography>
            </>
          }
          title="Delete Category ?"
          maxWidth="md"
        />
      )}

      <ListItemButton>
        <ListItemIcon onClick={expand}>
          {!isVisible ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText style={{ minWidth: 300 }} primary={tree.name} />
        <ListItemIcon onClick={() => handleEditButton()}>
          <ModeEditIcon style={{ color: APP_ACTION_COLORS.blue }} />
        </ListItemIcon>
        <ListItemIcon onClick={() => handleDeleteCategory()}>
          <DeleteOutlineIcon style={{ color: APP_ACTION_COLORS.red }} />
        </ListItemIcon>
      </ListItemButton>
      {isVisible ? (
        tree?.children?.map((child) => {
          return (
            <div style={{ paddingLeft: 10 }}>
              <RecursiveContainer tree={child} />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
