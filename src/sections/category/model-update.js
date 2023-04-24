import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Box, Button, Unstable_Grid2 as Grid } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ModelUpdate({ id }) {
  const [update, setUpdate] = useState({
    id: 0,
    name: "",
  });
  // get api vào update
  useEffect(() => {
    async function getdata() {
      const api = `http://localhost:8000/categories/${id}`;
      const res = await axios.get(api);
      setUpdate(res.data);
      // console.log(res.data);
    }
    getdata();
  }, []);
  // load lại trang
  function loading() {
    location.reload();
  }
  // xử lý save
  const save = async () => {
    const apiupdate = `http://localhost:8000/categories/${update.id}`;
    const res = await axios
      .put(apiupdate, update)
      .then((res) => {
        loading();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Box sx={style}>
        <TextField
          fullWidth
          label="nhập loại sách update"
          value={update.name}
          onChange={(e) => setUpdate({ ...update, name: e.target.value })}
        />
        <div className="mt-2 ">
          <Button variant="contained" onClick={save}>
            save
          </Button>
        </div>
      </Box>
    </>
  );
}
