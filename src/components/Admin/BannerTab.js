import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Checkbox from "@mui/material/Checkbox";
import { Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Button} from "@mui/material";
import "react-toastify/ReactToastify.min.css";
import DeleteIcon from '@mui/icons-material/Delete';

import { convertDate, getSelectedIds } from "../../app/hook/CommonHook";
import { useDispatch } from "react-redux";
import {
  selectBanner,
  useBannerInAdmin,
  useFetchListBannerInAdmin,
} from "../../app/hook/BannerHook";
import { Link } from "react-router-dom";
import { setListBannerInAdmin } from "../../app/slices/BannerSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&$hover:hover": {
    backgroundColor: "#F1F5F8",
  },
}));

export const BannerTab = () => {
  const dispatch = useDispatch()
  const listBanner = useBannerInAdmin() || [];
  const [disableButtonDelete, setDisableButtonDelete] = useState(true);

  useFetchListBannerInAdmin("");

  const handleCheckBanner = (bannerID) => {
    const newBanner = selectBanner(listBanner, bannerID);
    dispatch(setListBannerInAdmin(newBanner));
  };

  const handleDeleteListBanner = (e) => {
    const listSelect = getSelectedIds(listBanner);
    const body = {
      ids: listSelect,
    };
    
  };

  useEffect(() => {
    if (getSelectedIds(listBanner).length === 0) setDisableButtonDelete(true);
    else setDisableButtonDelete(false);
  }, [listBanner]);
  return (
    <div className="p-6 space-y-5">
      <Button
          disabled={disableButtonDelete}
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteListBanner}
        >
          Delete banner
        </Button>
      <h1 class=" text-lg font-bold">List banners: </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listBanner.length === 0 ? (
        <div>
          <h1>Don't have any banner</h1>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{
              maxWidth: 2000,
              width: 1.0,
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Select</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Collection</StyledTableCell>
                <StyledTableCell align="left">Discount</StyledTableCell>
                <StyledTableCell align="left">Created at</StyledTableCell>
                <StyledTableCell align="left">Updated at</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listBanner.map((row) => (
                <StyledTableRow
                  className={{
                    hover: {
                      "&$hover:hover": {
                        backgroundColor: "#49bb7b",
                      },
                    },
                  }}
                  hover
                  key={row.id}
                >
                  <StyledTableCell id={row.id} align="center">
                    <Checkbox
                      id={row.id}
                      checked={row.isSelected}
                      onClick={() => handleCheckBanner(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.image ? (
                      <Link to={`/banner/${row.id}`}>
                        <img
                          src={row.image}
                          alt="avatar"
                          className="w-[150px] h-[100px] "
                        ></img>
                      </Link>
                    ) : (
                      <AccountCircleIcon sx={{ width: 55, height: 55 }} />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Link to={`/banner/${row.id}`}>
                      <h1 className=" hover:text-pink-500 hover:underline">
                        {row.title}
                      </h1>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.collection}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.discount}%
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {convertDate(row.created_at)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {convertDate(row.updated_at)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
