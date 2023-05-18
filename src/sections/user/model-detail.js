import React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "../../apis/axiosApi";
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

  const [detail, setDetail] = useState({
    id: 0,
    avatar: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    score: 0,
    relations: "",
    package: {
      id: 0,
      name: "",
      type: "",
      price: 0,
      discount: 0,
      description: "",
      isActive: 0,
    },
  });
  useEffect(() => {
    async function fetchData() {
      const api = `https://thuvien.nemosoftware.net/api/v1/users/${id}?relations=package,books`;
      const res = await axios.get2(api);
      console.log(res.data.data);
      setDetail(res.data.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Box sx={style}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 200 }} image={detail.avatar} component="div" />
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
              Score: {detail.score}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Package: {detail.package.type}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
