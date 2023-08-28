import { memo } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useUser } from "../../../../hooks/user";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogCraete = ({ open, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { createUser } = useUser();

  const onSubmit = (data) => {
    createUser(data);
  };

  return (
    <BootstrapDialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create User
      </DialogTitle>
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
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent dividers>
          <TextField
            error={!!errors.name}
            autoFocus
            margin="dense"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            {...register("name")}
            autoComplete="off"
            helperText={errors.name ? errors.name.message : null}
          />
          <TextField
            error={!!errors.email}
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            {...register("email")}
            autoComplete="off"
            helperText={errors.email ? errors.email.message : null}
          />
          <TextField
            error={!!errors.password}
            autoFocus
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            {...register("password")}
            autoComplete="off"
            helperText={errors.password ? errors.password.message : null}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" autoFocus variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default memo(DialogCraete);
