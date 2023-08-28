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
// Third Party Imports
import * as yup from "yup";
import { useShop } from "../hooks/shop";
// ----------------------------------------------------------------------

const schema = yup.object().shape({
  shop_name: yup.string().required("Please input shop name"),
});

const defaultValues = {
  shop_name: "",
  longitude: "",
  longtitude: "",
};

export default function ShopPage() {
  const [dataShop, setShop] = useState([]);
  const [checked, setChecked] = React.useState(false);

  // ** Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = useCallback(() => setOpenDialog(false), []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const { getShop } = useShop();

  const fetchAPI = async () => {
    await getShop().then((res) => {
      setShop(res.data);
    });
  };

  React.useEffect(() => {
    fetchAPI();
  }, []);

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
        </ShopCard>
      </Container>
      <DialogCreate open={openDialog} onClose={handleClose} />
    </>
  );
}
