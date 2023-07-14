import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Box, Typography } from "@mui/material";

export default function CustomCard({
  titleAction,
  title,
  subHeader,
  content,
  footerActions,
}) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        action={titleAction}
        title={
          <Typography fontSize={18} color="primary">
            <Box fontWeight="medium">{title}</Box>
          </Typography>
        }
        subheader={subHeader}
        style={{
          textAlign: "left",
          fontWeight: 700,
        }}
      />
      <CardContent>{content}</CardContent>
      <CardActions disableSpacing>{footerActions}</CardActions>
    </Card>
  );
}
