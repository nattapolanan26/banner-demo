import React, { useState, useCallback } from "react";
import Switch from "@mui/material/Switch";
import { Helmet } from "react-helmet-async";
// @mui
import { Container, TextField, Typography, Button, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
// components
import { ShopCard, ShopTable, DialogCreate } from "../sections/@dashboard/shop";
import GridCustom from "@mui/material/Unstable_Grid2";
// Third Party Imports
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// ----------------------------------------------------------------------

const schema = yup.object().shape({
  email: yup
    .string()
    .email("กรุณากรอกชื่อผู้ใช้งานให้ถูกต้อง")
    .required("กรุณากรอกชื่อผู้ใช้งาน"),
  password: yup.string().required("กรุณากรอกรหัสผ่านผู้ใช้งาน"),
  name: yup.string().required("กรุณากรอกชื่อ-นามสกุล"),
});

const defaultValues = {
  password: "",
  email: "",
  name: "",
};

export default function ShopPage() {
  const [checked, setChecked] = React.useState(false);

  // ** Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    reset();
    setOpenDialog(true);
  };

  const handleClose = useCallback(() => setOpenDialog(false), []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const methodsCreate = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { reset } = methodsCreate;

  return (
    <>
      <Helmet>
        <title> Shop Page </title>
      </Helmet>

      <Container>
        <ShopCard>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Setting Google Map
          </Typography>
          <GridCustom container spacing={{ xs: 2, md: 4 }} alignItems="center">
            <GridCustom md={4}>Activate Google Map API</GridCustom>
            <GridCustom md={8}>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </GridCustom>
            <GridCustom xs={12} md={4}>
              Google Maps API Key
            </GridCustom>
            <GridCustom xs={12} md={8}>
              <TextField placeholder="Please input key" fullWidth />
            </GridCustom>
            <GridCustom xs={12} md={12}>
              <Button
                type="button"
                color="info"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Add Location
              </Button>
            </GridCustom>
            <GridCustom md={12}>
              <ShopTable />
            </GridCustom>
            <GridCustom md={2} mdOffset={5}>
              <Box my={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  fullWidth
                >
                  Save
                </Button>
              </Box>
            </GridCustom>
          </GridCustom>
        </ShopCard>
      </Container>
      <FormProvider {...methodsCreate}>
        <DialogCreate open={openDialog} onClose={handleClose} />
      </FormProvider>
    </>
  );
}
