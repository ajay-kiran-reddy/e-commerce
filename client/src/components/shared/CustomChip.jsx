import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function CustomChip({ label }) {
  const [color, setColor] = useState("white");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (label === "Ordered") {
      setColor("#fff");
      setBackgroundColor("#1c54b2");
    } else if (label === "Dispatched") {
      setColor("#fff");
      setBackgroundColor("#ff9100");
    } else if (label === "In Transit") {
      setColor("#fff");
      setBackgroundColor("#6d1b7b");
    } else if (label === "Delivered") {
      setColor("#fff");
      setBackgroundColor("#00695f");
    }
  }, [label]);

  return (
    <div>
      <Chip
        label={label}
        style={{ color: color || "white", fontWeight: 700, backgroundColor }}
      />
    </div>
  );
}
