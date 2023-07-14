import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle color="primary" sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon color="primary" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomDialog(props) {
  const {
    open,
    primaryButtonLabel,
    title,
    content,
    onClose,
    maxWidth,
    secondaryButtonLabel,
    helperText,
    disableSecondary,
    disablePrimary,
  } = props;

  const handleClose = (buttonType) => {
    onClose({ open: false, buttonType });
  };

  return (
    <div>
      <Dialog
        onClose={() => handleClose("secondary")}
        aria-labelledby="customized-dialog-title"
        open={open}
        width={maxWidth}
        fullWidth={true}
        maxWidth={maxWidth}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => handleClose("close")}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions style={{ textAlign: "left" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                color="primary"
                variant="caption"
                display="block"
                gutterBottom
                style={{ textAlign: "left" }}
              >
                {helperText}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              {secondaryButtonLabel && (
                <Button
                  style={{ marginRight: "1rem" }}
                  variant="outlined"
                  onClick={() => handleClose("secondary")}
                  disabled={disableSecondary}
                >
                  {secondaryButtonLabel}
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => handleClose("primary")}
                disabled={disablePrimary}
              >
                {primaryButtonLabel}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
