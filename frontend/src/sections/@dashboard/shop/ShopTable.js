import { useState } from "react";
import {
  Table,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TableHead,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogEdit from "src/sections/@dashboard/shop/dialog/edit";
import { useShop } from "src/hooks/shop";
const schema = yup.object().shape({
  shop_name: yup.string().required("Please input shop name"),
  latitude: yup
    .string()
    .required("Please input lontitude")
    .matches(/^[\d.-]+$/, "fill out the information correctly"),
  longitude: yup
    .string()
    .required("Please input lontitude")
    .matches(/^[\d.-]+$/, "fill out the information correctly"),
});

// const defaultValues = {
//   shop_name: "",
//   latitude: "",
//   longitude: "",
// };

export default function ShopTable({ data }) {
  // ** Dialog
  const [open, setOpen] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // ** Hook
  const { deleteShop } = useShop();
  const handleOpenMenu = (event, data) => {
    setOpen(event.currentTarget);
    setEditData(data);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickDelete = () => {
    deleteShop(editData.id);
  };

  const handleClickOpenEdit = () => {
    methods.reset();
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell align="center">Shop name</TableCell>
              <TableCell align="center">Latitude</TableCell>
              <TableCell align="center">Longitude</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="left">{row.shop_name}</TableCell>
                <TableCell align="center">{row.latitude}</TableCell>
                <TableCell align="center">{row.longitude}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={(e) => handleOpenMenu(e, row)}
                  >
                    <Iconify icon={"eva:more-vertical-fill"} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleClickOpenEdit}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleClickDelete}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <FormProvider {...methods}>
        <DialogEdit
          open={openDialogEdit}
          onClose={handleCloseEdit}
          data={editData}
        />
      </FormProvider>
    </>
  );
}
