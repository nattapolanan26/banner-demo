import { memo, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { ShopMap } from "src/sections/@dashboard/shop";
import GridCustom from "@mui/material/Unstable_Grid2";
// import { useBanner } from "src/hooks/banner";
import Box from "@mui/material/Box";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogCreate = ({ open, onClose }) => {
  const [file, setFile] = useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
    if (newFile !== null) {
      setValue("file", newFile);
    } else {
      setValue("file", null);
    }

    trigger("file");
    setFocus("file");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setFocus,
    trigger,
  } = useFormContext();
  //   const { CreateBanner } = useBanner();

  const onSubmit = (data) => {
    console.log("data : ", data);
    // CreateBanner(data);
  };

  return (
    <BootstrapDialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create Shop Location
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
            <GridCustom md={2}>
              <Typography variant="body1" component="p">
                Shop Name :
              </Typography>
            </GridCustom>
            <GridCustom md={4}>
              <TextField name="shop_name" fullWidth />
            </GridCustom>
            <GridCustom md={3}>
              <Typography variant="body1" component="p">
                Latitude :
              </Typography>
            </GridCustom>
            <GridCustom md={3}>
              <Typography variant="body1" component="p">
                Longitude :
              </Typography>
            </GridCustom>
            <GridCustom
              md={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ShopMap />
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

export default memo(DialogCreate);
