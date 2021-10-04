import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { isValid } from "iban";
import axios from "axios";

import Toast from "./Toast";

export default function IbanDialog({ open, handle, refresh }) {
  const [iban, setIban] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSuccess = () => {
    setSuccess(!success);
  };

  const handleError = () => {
    setError(!error);
  };

  const submitIban = async () => {
    if (!isValid(iban)) {
      handleError();
      return;
    }
    await axios.post("http://localhost:3001/addIban", { iban }).then(() => {
      handleSuccess();
      handle();
      refresh();
      setTimeout(() => {
        handleSuccess();
        setIban("");
      }, 3000);
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handle}>
        <DialogTitle>Add IBAN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below write an iban to add it to the list
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="iban"
            label="IBAN"
            type="text"
            fullWidth
            variant="standard"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handle}>Cancel</Button>
          <Button onClick={submitIban}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Toast
        open={success}
        handleClose={handleSuccess}
        type="success"
        text={`${
          iban === "" ? "The iban" : iban
        } has been successfully added to the list`}
        vertical="top"
        horizontal="right"
      />
      <Toast
        open={error}
        handleClose={handleError}
        type="error"
        text="IBAN format is invalid"
        vertical="top"
        horizontal="center"
      />
    </>
  );
}
