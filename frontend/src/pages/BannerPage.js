import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState, useEffect, useCallback } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

// Third Party Imports
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogCreate from "../sections/@dashboard/user/Dialog/create";
import DialogEdit from "../sections/@dashboard/user/Dialog/edit";
import { useBanner } from "../hooks/banner";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "ID", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "createdAt", label: "Created At", alignRight: false },
  { id: "updatedAt", label: "Updated At", alignRight: false },
  { id: "", label: "Action" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("กรุณากรอกชื่อผู้ใช้งานให้ถูกต้อง")
    .required("กรุณากรอกชื่อผู้ใช้งาน"),
  password: yup.string().required("กรุณากรอกรหัสผ่านผู้ใช้งาน"),
  name: yup.string().required("กรุณากรอกชื่อ-นามสกุล"),
});

const defaultValuesEdit = {
  password: "",
  email: "",
  name: "",
};

const defaultValues = {
  password: "",
  email: "",
  name: "",
};

export default function BannerPage() {
  const [open, setOpen] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ** Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  // ** Hook
  const { getBanner } = useBanner();
  const [dataBanner, setDataBanner] = useState([]);

  const fetchAPI = async () => {
    await getBanner().then((res) => {
      setDataBanner(res.data);
    });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleOpenMenu = (event, data) => {
    setOpen(event.currentTarget);
    setEditData(data);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataBanner.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleClickDelete = () => {
    // deleteBanner(editData.id);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataBanner.length) : 0;

  const filteredUsers = applySortFilter(
    dataBanner,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleClickOpen = () => {
    resetCreate();
    setOpenDialog(true);
  };

  const handleClose = useCallback(() => setOpenDialog(false), []);

  const handleClickOpenEdit = () => {
    resetEdit();
    setOpenDialogEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const methodsCreate = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { reset: resetCreate } = methodsCreate;

  const methodsEdit = useForm({
    defaultValuesEdit,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { reset: resetEdit } = methodsEdit;

  return (
    <>
      <Helmet>
        <title> Banner Page </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Banner
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpen}
          >
            New Banner
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataBanner.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, email, createdAt, updatedAt } = row;
                      const selectedUser = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          {/* <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{createdAt}</TableCell>
                          <TableCell align="left">{updatedAt}</TableCell> */}

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
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataBanner.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
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
      {/* <FormProvider {...methodsCreate}>
        <DialogCreate open={openDialog} onClose={handleClose} />
      </FormProvider>
      <FormProvider {...methodsEdit}>
        <DialogEdit
          open={openDialogEdit}
          onClose={handleCloseEdit}
          data={editData}
        />
      </FormProvider> */}
    </>
  );
}
