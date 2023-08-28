import { memo } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import GridCustom from "@mui/material/Unstable_Grid2";
import { useShop } from "src/hooks/shop";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogEdit = ({ open, onClose, data: dataAPI }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const { updateShop } = useShop();

  const onSubmit = (newData) => {
    updateShop(newData, dataAPI.id);
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
        Edit Shop Location
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
          <GridCustom container spacing={{ xs: 2, md: 4 }} alignItems="center">
            <GridCustom md={4}>
              <Typography variant="body1" component="p">
                Shop Name :
              </Typography>
            </GridCustom>
            <GridCustom md={8}>
              <TextField
                defaultValue={dataAPI.shop_name}
                {...register("shop_name")}
                placeholder="Please input latitude"
                error={!!errors.shop_name}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                autoComplete="off"
                helperText={errors.shop_name ? errors.shop_name.message : null}
              />
            </GridCustom>
            <GridCustom md={4}>
              <Typography variant="body1" component="p">
                Latitude :
              </Typography>
            </GridCustom>
            <GridCustom md={8}>
              <TextField
                {...register("latitude")}
                defaultValue={dataAPI.latitude}
                placeholder="Please input latitude"
                error={!!errors.latitude}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                autoComplete="off"
                helperText={errors.latitude ? errors.latitude.message : null}
              />
            </GridCustom>
            <GridCustom md={4}>
              <Typography variant="body1" component="p">
                Longitude :
              </Typography>
            </GridCustom>
            <GridCustom md={8}>
              <TextField
                {...register("longitude")}
                defaultValue={dataAPI.longitude}
                placeholder="Please input longitude"
                error={!!errors.longitude}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                autoComplete="off"
                helperText={errors.longitude ? errors.longitude.message : null}
              />
            </GridCustom>
          </GridCustom>
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

export default memo(DialogEdit);
