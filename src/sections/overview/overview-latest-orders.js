import { format } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import axios from "../../apis/axiosApi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ModelView from "./viewall";
import { SeverityPill } from "src/components/severity-pill";
import Modal from "@mui/material/Modal";
const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};
export const OverviewLatestOrders = (props) => {
  const { data = [] } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ShowModel = () => {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModelView />
        </Modal>
      </>
    );
  };
  return (
    <Card>
      <CardHeader title="Browse" />
      <ShowModel />
      <div sx={{ flexGrow: 1 }}>
        <Box sx={{ overflow: "auto", width: "100%", height: "400px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell sortDirection="desc">Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Emount</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => {
                return (
                  <TableRow hover key={data.id}>
                    <TableCell>{data.user.fullName}</TableCell>
                    <TableCell>{data.user.email}</TableCell>
                    <TableCell>{data.createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill>{data.status}</SeverityPill>
                    </TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>{data.payment}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </div>
      <Divider />
      <hr />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          onClick={handleOpen}
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
