import React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box } from "@mui/material";
import axios from "axios";
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
export default function ModelUpdate({ id }) {
  const [update, setUpdate] = useState({
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
      setUpdate(res.data);
    }

    fetchData();
  }, []);
  // console.log("datda", update);

  //   //xử lý update khi save
  const Postdata = async () => {
    const apiupdate = `http://localhost:8000/user/${update.id}`;
    const res = await axios
      .put(apiupdate, update)
      .then((res) => {
        loading();
      })
      .catch((err) => console.log(err));
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUpdate({
      ...update,
      imguser: base64,
    });
  };
  //chuyển qua base 64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  function loading() {
    location.reload();
  }
  return (
    <>
      <Box sx={style}>
        <img src={update.imguser} style={{ width: "100px", height: "100px" }} />
        <input
          onChange={uploadImage}
          multiple
          type="file"
          name="img"
          style={{ marginTop: "4px", marginBottom: "4px", color: "#6366F1" }}
        />
        <label>Name</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          name="name"
          value={update.name}
          onChange={(event) => setUpdate({ ...update, name: event.target.value })}
        />
        <label>Phone</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          name="phone"
          value={update.phone}
          onChange={(e) => {
            const value = e.target.value;
            setUpdate({
              ...update,
              phone: value,
            });
          }}
        />
        <label>Email</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          value={update.email}
          onChange={(e) =>
            setUpdate({
              ...update,
              email: e.target.value,
            })
          }
        />
        <label>Address</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          name="address"
          value={update.address}
          onChange={(e) =>
            setUpdate({
              ...update,
              address: e.target.value,
            })
          }
        />
        <label>point</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          value={update.point}
          onChange={(e) =>
            setUpdate({
              ...update,
              point: +e.target.value,
            })
          }
        />
        <div className="mt-2 ">
          <Button variant="contained" onClick={Postdata}>
            save
          </Button>
        </div>
      </Box>
    </>
  );
}
