import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";


export default function ModelDetail({id}) {
    const [detail, setDetail] = useState({
        id: 0,
        name: "",
        categoryId: 0,
        quantity: 0,
        price: 0,
        status: "",
        img: ""
    });

    useEffect(()=>{
        async function fetchData(){
            const api = `http://localhost:8000/book/${id}`
            const res = await axios.get(api)
            setDetail(res.data)
        }
        fetchData()
    },[])
  return (
    <>
    <Box sx={style}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 200 }} image={detail.img} component='div'/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Name: {detail.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {detail.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {detail.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {detail.quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CategoryID: {detail.categoryId}
              </Typography>
            </CardContent>
          </Card>
        </Box>
    </>
  )
}
