import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { homeState, updateCheckedCategories } from "../home/slices/slice";

export default function RecursiveCheckBox({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(homeState);

  const handleCheckedItems = (e, data) => {
    console.log(data, "[DATA]");
    const idList = [];
    if (data.children.length > 0) {
      data.children.forEach((child) => {
        idList.push(child._id);
      });
      idList.push(data._id);
    } else {
      idList.push(data._id);
    }
    e.target.checked
      ? dispatch(
          updateCheckedCategories([...state.checkedCategories, ...idList])
        )
      : dispatch(
          updateCheckedCategories(
            state.checkedCategories.filter((item) => !idList.includes(item))
          )
        );
  };

  return (
    <div>
      <IconButton>
        {isVisible ? (
          <KeyboardArrowLeftIcon onClick={() => setIsVisible(false)} />
        ) : (
          <ChevronRight onClick={() => setIsVisible(true)} />
        )}
      </IconButton>
      <FormControlLabel
        key={data._id}
        control={
          <Checkbox
            checked={state.checkedCategories.indexOf(data._id) !== -1}
            onClick={(e) => handleCheckedItems(e, data)}
          />
        }
        label={data.name}
      />
      {isVisible &&
        data?.children?.map((child) => {
          return (
            <div style={{ marginLeft: "2rem" }}>
              <RecursiveCheckBox data={child} />
            </div>
          );
        })}
    </div>
  );
}
