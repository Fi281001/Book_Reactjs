import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ModelDetail({ id }) {
  const [detail, setDetail] = useState({
    id: 0,
    name: "",
    label: "",
    description: "",
    position: "",
    quantity: 0,
    price: 0,
    status: 1,
    author: "",
    loanPrice: "",
    image: "",
  });

  useEffect(() => {
    async function fetchData() {
      const api = `https://thuvien.nemosoftware.net/api/v1/books/${id}`;
      const res = await axios.get(api);
      console.log(res.data.data);
      setDetail(res.data.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <Box sx={style}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ width: 400, height: 200 }} image={detail.image} component="div" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardContent>
              <Typography gutterBottom variant="" component="div">
                Name: {detail.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {detail.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {detail.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {detail.quantity}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="" component="div">
                label: {detail.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" title={detail.description}>
                Description:{" "}
                {detail.description !== null ? (
                  <span>{detail.description.substring(0, 12)}...</span>
                ) : (
                  <span>NoDescription </span>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                loanPrice: {detail.loanPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary" title={detail.position}>
                Position:{" "}
                {detail.position !== null ? (
                  <>{detail.position.substring(0, 12)}...</>
                ) : (
                  <>NoDescription </>
                )}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Box>
    </>
  );
}
