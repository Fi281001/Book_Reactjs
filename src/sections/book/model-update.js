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
export default function ModelDetail({ id }) {
  const [update, setUpdate] = useState({
    id: 0,
    name: "",
    categoryId: 0,
    quantity: 0,
    price: 0,
    status: "",
    img: "",
  });

  // get api

  useEffect(() => {
    async function fetchData() {
      const api = `http://localhost:8000/book/${id}`;
      const res = await axios.get(api);
      setUpdate(res.data);
    }
    fetchData();
  }, []);

  // xử lý save
  const save = async () => {
    const apiup = `http://localhost:8000/book/${update.id}`;
    const res = await axios
      .put(apiup, update)
      .then((res) => {
        loading();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //up file ảnh
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
  // load lại trang
  function loading() {
    location.reload();
  }
  return (
    <>
      <Box sx={style}>
        <img src={update.img} style={{ width: "100px", height: "100px" }} />
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
          maxRows={4}
          name="name"
          value={update.name}
          onChange={(event) => setUpdate({ ...update, name: event.target.value })}
        />
        <label>Status</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          maxRows={4}
          name="status"
          value={update.status}
          onChange={(e) => {
            const value = e.target.value;
            setUpdate({
              ...update,
              status: value,
            });
          }}
        />
        <label>Price</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          maxRows={4}
          value={update.price}
          onChange={(e) =>
            setUpdate({
              ...update,
              price: +e.target.value,
            })
          }
        />
        <label>Quantity</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          maxRows={4}
          value={update.quantity}
          onChange={(e) =>
            setUpdate({
              ...update,
              quantity: +e.target.value,
            })
          }
        />
        <label>CategoryID</label>
        <TextField
          style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
          maxRows={4}
          value={update.categoryId}
          onChange={(e) =>
            setUpdate({
              ...update,
              categoryId: +e.target.value,
            })
          }
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
