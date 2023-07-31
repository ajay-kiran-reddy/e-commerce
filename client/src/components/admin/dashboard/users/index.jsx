import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../../../shared/CustomCard";
import CustomTable from "../../../shared/CustomTable";
import AdminProductsSlice, { AdminProducts } from "../../slices/slice";
import GroupIcon from "@mui/icons-material/Group";
import { formatDate } from "../../../../utils/dateUtils";
import CustomChip from "../../../shared/CustomChip";
import { APP_ACTION_COLORS } from "../constants/DashboardConstants";
import { Button, IconButton, Tooltip } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomLoader from "../../../shared/Loader";

export default function UsersLandingPage() {
  const dispatch = useDispatch();
  const state = useSelector(AdminProducts);

  useEffect(() => {
    dispatch(AdminProductsSlice.actions.getUsers());
  }, []);

  const columns = [
    {
      field: "userName",
      fieldLabel: "userName",
      render: (row) => row.userName,
      align: "left",
    },
    {
      field: "email",
      fieldLabel: "Email",
      render: (row) => row.email,
      align: "left",
    },

    {
      field: "phoneNumber",
      fieldLabel: "phoneNumber",
      render: (row) => row.phoneNumber,
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
      field: "isAdmin",
      fieldLabel: "Is Admin",
      render: (row) => row.isAdmin && <CustomChip label={"Admin"} />,
      align: "left",
    },
    {
      field: "isAdmin",
      fieldLabel: "Make/Revoke",
      render: (row) => (
        <div>
          <Tooltip title="Make Admin">
            <IconButton
              onClick={() =>
                dispatch(
                  AdminProductsSlice.actions.updateAdminAccess({
                    isAdmin: true,
                    id: row._id,
                  })
                )
              }
            >
              <AdminPanelSettingsIcon
                style={{ color: APP_ACTION_COLORS.green }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Revoke Admin Access">
            <IconButton
              onClick={() =>
                dispatch(
                  AdminProductsSlice.actions.updateAdminAccess({
                    isAdmin: false,
                    id: row._id,
                  })
                )
              }
            >
              <GroupRemoveIcon style={{ color: APP_ACTION_COLORS.red }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
      align: "left",
    },
    {
      field: "isAdmin",
      fieldLabel: "actions",
      render: (row) => (
        <Tooltip title="Delete User">
          <IconButton
            onClick={() =>
              dispatch(AdminProductsSlice.actions.deleteUser(row._id))
            }
          >
            <DeleteOutlineIcon style={{ color: APP_ACTION_COLORS.red }} />
          </IconButton>
        </Tooltip>
      ),
      align: "left",
    },
  ];

  return (
    <div>
      <CustomLoader show={state.isLoading} />
      <CustomCard
        titleAction={<GroupIcon style={{ color: APP_ACTION_COLORS.blue }} />}
        title="Users List"
        content={
          <CustomTable
            data={state.usersList}
            columns={columns}
            buttonLabel="Add Product"
            // handleButtonClick={handleButtonClick}
          />
        }
      />
    </div>
  );
}
