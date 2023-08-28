import { memo, useState } from "react";
import TextField from "@mui/material/TextField";
import { MuiFileInput } from "mui-file-input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useBanner } from "src/hooks/banner";
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
  const { createBanner } = useBanner();

  const onSubmit = (data) => {
    createBanner(data);
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
        Create Banner
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
            error={!!errors.title}
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            {...register("title")}
            autoComplete="off"
            helperText={errors.title ? errors.title.message : null}
          />
          <TextField
            error={!!errors.description}
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            {...register("description")}
            autoComplete="off"
            helperText={errors.description ? errors.description.message : null}
          />
          <div>
            <Typography variant="body1" color="#637381" mt={"2rem"} mb={"4px"}>
              File Banner
            </Typography>
            <MuiFileInput
              ref={register("file").ref}
              name={register("file").name}
              onChange={handleChange}
              value={file}
              inputProps={{ accept: "image/*" }}
              placeholder="Upload Please"
              helperText={errors.file ? errors.file.message : null}
              error={!!errors.file}
            />
            <Box
              sx={{ my: 4, display: "flex", justifyContent: "center" }}
              fullWidth
            >
              {file ? (
                <img
                  width="250px"
                  height="250px"
                  style={{ borderRadius: "15px" }}
                  src={URL.createObjectURL(file)}
                  alt="create_banner_img"
                />
              ) : null}
            </Box>
          </div>
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
