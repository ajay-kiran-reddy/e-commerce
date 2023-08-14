import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { homeState } from "../home/slices/slice";
import RecursiveCheckBox from "./RecursiveCheckBox";

export default function FilterCard({ products }) {
  const [categories, setCategories] = useState([]);
  const state = useSelector(homeState);

  useEffect(() => {
    const items = localStorage.getItem("activeCategory") || [];
    setCategories(JSON.parse(items));
  }, [state.currentRef]);

  return (
    <div style={{ textAlign: "left" }}>
      {categories?.children?.map((cat) => {
        return <RecursiveCheckBox data={cat} products={products} />;
      })}
    </div>
  );
}
