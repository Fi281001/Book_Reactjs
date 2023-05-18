import React from "react";
import { useState, useEffect } from "react";
import axios from "../../apis/axiosApi";
import TextField from "@mui/material/TextField";
import { Box, Button, Unstable_Grid2 as Grid } from "@mui/material";
import { isEmpty } from "lodash";
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
      const api = `https://thuvien.nemosoftware.net/api/v1/categories/${id}`;
      const res = await axios.get2(api);
      setUpdate(res.data.data);
    }
    getdata();
  }, []);
  // load lại trang
  function loading() {
    location.reload();
  }
  const [name2, setName2] = useState({
    id: 0,
    name: "",
  });
  const [err, setErr] = useState("");
  const [save2, setSave2] = useState(true);
  useEffect(() => {
    async function getdata() {
      const apilength = await axios.get2("https://thuvien.nemosoftware.net/api/v1/categories");
      const legth = apilength.data.meta.totalRows;
      const api2 = `https://thuvien.nemosoftware.net/api/v1/categories?limit=${legth}`;
      const res = await axios.get2(api2);
      setName2(res.data.data);
      console.log("save2", res.data.data);
    }
    getdata();
  }, []);
  // xử lý save
  const save = async () => {
    const nameExists = name2.some((obj) => obj.name === update.name);

    const apiupdate = `https://thuvien.nemosoftware.net/api/v1/categories/${update.id}`;
    // const res = await axios
    if (update === "" || nameExists) {
      setErr("Vui lòng nhập đầy đủ hoặc tên sách đã tồn tại");
      setSave2(false);
    } else {
      const res = await axios
        .put(apiupdate, update)
        .then((res) => {
          loading();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Box sx={style}>
        <TextField
          fullWidth
          label="nhập loại sách update"
          value={update.name}
          onChange={(e) => setUpdate({ ...update, name: e.target.value })}
          error={!isEmpty(err)}
        />
        {save2 == false ? <p style={{ color: "red" }}>{err}</p> : ""}
        <div className="mt-2 ">
          <Button fullWidth variant="contained" onClick={save}>
            save
          </Button>
        </div>
      </Box>
    </>
  );
}
