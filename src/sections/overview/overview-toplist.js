import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import Modal from "@mui/material/Modal";

import Modeltoplist from "./model-toplist";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pl: 2,
  pr: 2,
};
export const OverviewList = (props) => {
  const { pepole = [], sx } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // xử lý logic
  // tạo state cho start day và end
  const ShowModel = () => {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Modeltoplist />
        </Modal>
      </>
    );
  };
  return (
    <Card sx={sx}>
      <CardHeader title="Top 5 most read bookst" />
      <div style={{ marginTop: "-3px", fontSize: "15px", marginLeft: "20px" }}> </div>
      <ShowModel />
      <List>
        {pepole.map((user) => {
          return (
            <ListItem key={user.id}>
              <ListItemAvatar>
                {user.avatar ? (
                  <Box
                    component="img"
                    src={user.avatar}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={user.fullName}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={user.email}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <ListItemText style={{ textAlign: "end" }} primary={user.score} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <hr />
      <div style={{ textAlign: "right", marginTop: "-10px", marginBottom: "10px" }}>
        <Button
          onClick={handleOpen}
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          Choose Date
        </Button>
      </div>
    </Card>
  );
};
OverviewList.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
