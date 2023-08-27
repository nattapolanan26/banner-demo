import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, lat, lng) {
  return { name, lat, lng };
}

const rows = [
  createData("Fayverly1", 159, 6.0),
  createData("Fayverly2", 237, 9.0),
  createData("Fayverly3", 262, 16.0),
  createData("Fayverly4", 305, 3.7),
  createData("Fayverly5", 356, 16.0),
];

export default function ShopTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="20%" align="center">
              Location
            </TableCell>
            <TableCell align="center">Latitude</TableCell>
            <TableCell align="center">Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.lat}</TableCell>
              <TableCell align="center">{row.lng}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
