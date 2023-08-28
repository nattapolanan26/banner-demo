import React, { useState, useCallback } from "react";
import Switch from "@mui/material/Switch";
import { Helmet } from "react-helmet-async";
// @mui
import { Container, TextField, Typography, Button, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
// components
import { ShopCard, DialogCreate, ShopTable } from "../sections/@dashboard/shop";
import GridCustom from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { useShop } from "../hooks/shop";
// ----------------------------------------------------------------------
const defaultValues = {
  status: false,
  api_key: "",
};
export default function ShopPage() {
  const [dataShop, setShop] = useState([]);

  // ** Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = useCallback(() => setOpenDialog(false), []);

  const { getShop, settingMap, getSettingMap } = useShop();

  const fetchAPI = useCallback(async () => {
    await getShop().then(async (res) => {
      setShop(res.data);
    });

    await getSettingMap().then((res) => {
      console.log(res);
      setValue("status", !!res.data.status);
      setValue("api_key", res.data.api_key);
    });
  }, []);

  React.useEffect(() => {
    fetchAPI();
  }, []);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  const watchStatus = watch("status");

  const onSubmit = (data) => {
    settingMap(data);
  };

  return (
    <>
      <Helmet>
        <title> Shop Page </title>
      </Helmet>

      <Container>
        <ShopCard>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Setting Google Map
            </Typography>
            <GridCustom
              container
              spacing={{ xs: 2, md: 4 }}
              alignItems="center"
            >
              <GridCustom md={4}>Activate Google Map API</GridCustom>
              <GridCustom md={8}>
                <Switch
                  {...register("status")}
                  checked={watchStatus}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </GridCustom>
              <GridCustom xs={12} md={4}>
                Google Maps API Key
              </GridCustom>
              <GridCustom xs={12} md={8}>
                <TextField
                  {...register("api_key")}
                  placeholder="Please input key"
                  fullWidth
                />
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
              <GridCustom xs={12} md={12}>
                <ShopTable data={dataShop} />
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
          </form>
        </ShopCard>
      </Container>
      <DialogCreate open={openDialog} onClose={handleClose} />
    </>
  );
}
