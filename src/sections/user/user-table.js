import axios from "axios";
import queryString from "query-string";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
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
import Pagegination from "src/sections/user/page";
import UserSearch from "src/sections/user/user-search";

export const UserTable = (props) => {
  //open update
  const [update, setUpdate] = useState({
    name: " ",
    phone: " ",
    email: " ",
    address: " ",
    point: 0,
    imguser: " ",
  });

  // open model update
  const [open, setOpen] = useState(false);
  const handleOpen = async (id) => {
    console.log("id", id);
    const api = `http://localhost:8000/user/${id}`;
    const res = await axios.get(api);
    setUpdate(res.data);
    console.log("lan: ", update);
    setOpen(true);
  };
  //xử lý update
  const Postdata = async () => {
    const apiupdate = `http://localhost:8000/user/${update.id}`;
    const res = await axios
      .put(apiupdate, {
        name: update.name,
        phone: update.phone,
        email: update.email,
        address: update.address,
        point: update.point,
        imguser: update.imguser,
      })
      .then((res) => {
        loading();
        console.log("khi seve: ", res);
      })
      .catch((err) => console.log(err));
  };
  // close update
  const handleClose = () => setOpen(false);
  // open detail
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const handleOpenDetail = async (id) => {
    console.log("id", id);
    const api = `http://localhost:8000/user/${id}`;
    const res = await axios.get(api);
    setDetail(res.data);
    setOpenDetail(true);
  };
  //close detail
  const handleCloseDetail = () => setOpenDetail(false);
  const [user, setUser] = useState([]);
// phân trang
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 5,
    _totalRows: 1,
  });
  //xử lý api (phân trang, search)
  const [load, setLoad] = useState({
    _page: 1,
    _limit: 5,
    q: "",
  });
  // call api 
  useEffect(() => {
    async function getPosts() {
      const param = queryString.stringify(load);
      try {
        const apilength = await axios.get(`http://localhost:8000/user?q=${load.q}`);
        const legth = apilength.data.length;
        const api = `http://localhost:8000/user?${param}`;
        const res = await fetch(api);
        const resjson = await res.json();
        console.log("test", { resjson });
        const data = resjson;
        setUser(data);
        setPagination({ ...pagination, _page: load._page, _totalRows: legth, q: load.newSearch });
      } catch (error) {
        console.log("error");
      }
    }
    getPosts();
  }, [load]);

  // xử lý phân trang
  function handlepagechange(newPage) {
    setLoad({ ...load, _page: newPage });
  }
  // load lại trang
  function loading() {
    location.reload();
  }
  // xử lý search
  function handleSearch(newSearch) {
    console.log("search", newSearch);
    setLoad({
      ...load,
      _page: 1,
      q: newSearch.search,
    });
  }
  //xóa api
  const handleDelete = async (u) => {
    const api = `http://localhost:8000/user`;
    if (confirm(`Bạn có muốn xóa ${u.name} ko?`)) {
      await axios.delete(api + "/" + u.id);
      loading();
    }
  };

  // hiển thị data table
  const User = () => {
    return (
      <>
      <div className="table-responsive ">
        <Table  bordered hover>
          <thead>
            <tr style={{ background: "#6366F1" }} className="text-white">
              <th className="w-20 ">Ảnh</th>
              <th className="w-20 ">Name</th>
              <th className="w-20 ">Phone</th>
              <th className="w-20 ">Email</th>
              <th className="w-20 ">address</th>
              <th className="w-20 ">point</th>
              <th className="w-20 ">Detail</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td
                  style={{
                    backgroundImage: `url(${user.imguser})`,
                    width: "50px",
                    height: "100%",
                    backgroundSize: "cover",
                  }}
                ></td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.point}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleOpenDetail(user.id);
                    }}
                  >
                    Detail
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      handleOpen(user.id);
                    }}
                    variant="contained"
                    color="success"
                  >
                    Upadate
                  </Button>
                </td>
                <td>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </>
    );
  };
  //up file
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
// model update
  const ModelUpdate = () => {
    console.log("hiển thị model: ", update);
    return (
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-monted-modal-description"
      >
        <Box sx={style}>
          <img src={update.imguser} style={{ width: "100px", height: "100px" }} />
          <input
            onChange={uploadImage}
            multiple
            type="file"
            name="img"
            style={{ marginTop: "4px", marginBottom: "4px" }}
          />
          <TextField
            style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
            maxRows={4}
            name="name"
            value={update.name}
            onChange={(e) => {
              console.log("====> name::::", e.target.value);
              return setUpdate({
                ...update,
                name: e.target.value,
              });
            }}
            />
        
          <TextField
            style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
            maxRows={4}
            name="phone"
            value={update.phone}
            onChange={(e) =>{
              const value = e.target.value
              setUpdate({
                ...update,
                phone: value,
              })}
            }
          />
          <TextField
            style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
            maxRows={4}
            value={update.email}
            onChange={(e) =>
              setUpdate({
                ...update,
                email: e.target.value,
              })
            }
          />
          <TextField
            style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
            maxRows={4}
            name="address"
            value={update.address}
            onChange={(e) =>
              setUpdate({
                ...update,
                address: e.target.value,
              })
            }
          />
          <TextField
            style={{ marginTop: "4px", marginBottom: "4px", width: "334px" }}
            maxRows={4}
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
      </Modal>
    );
  };
// model detail
  const ModelDetail = () => {
    return (
      <Modal
        keepMounted
        open={openDetail}
        onClose={handleCloseDetail}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-monted-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 200 }} image={detail.imguser} component='div'/>
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
      </Modal>
    );
  };
  // main
  return (
    <>
      <UserSearch onSubmit={handleSearch} />
      <User />
      <ModelUpdate />
      <ModelDetail />
      <Pagegination Pagination={pagination} onPageChange={handlepagechange} />
    </>
  );
};
