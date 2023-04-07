import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

type PhotoDeleteDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

const PhotoDeleteDialog = ({ open, handleClose, handleDelete }: PhotoDeleteDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete this photo?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This operation irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="warning" onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoDeleteDialog;
