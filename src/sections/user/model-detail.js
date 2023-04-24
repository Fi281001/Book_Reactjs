import React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import PropTypes from "prop-types";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

ModelDetail.propTypes = {
  id: PropTypes.object,
};
ModelDetail.defaultProps = {
  id: 0,
};
export default function ModelDetail(props) {
  const { id } = props;
  // console.log("detail ", id);
  const [detail, setDetail] = useState({
    id: 0,
    name: "",
    phone: "",
    email: "",
    address: "",
    point: 0,
    imguser: "",
  });
  useEffect(() => {
    async function fetchData() {
      const api = `http://localhost:8000/user/${id}`;
      const res = await axios.get(api);
      setDetail(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Box sx={style}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 200 }} image={detail.imguser} component="div" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Name: {detail.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {detail.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {detail.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: {detail.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Point: {detail.point}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
