import axios from "axios";
import queryString from "query-string";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "@mui/material/Modal";

import { Button, Box } from "@mui/material";

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
import ModelUpdate from "./model-update";
import ModelDetail from "./model-detail";
export const UserTable = (props) => {

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
              <th className="w-20 ">Address</th>
              <th className="w-20 ">Point</th>
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
                      setOpenDetail(user.id)
                    }}
                  >
                    Detail
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setOpen(user.id)
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

  //đóng mở model update
  const [open, setOpen] = useState(0);
  const handleClose = () => setOpen(0);
  // đóng mở model detail
  const [openDetail, setOpenDetail] = useState(0);
  const handleCloseDetail = () => setOpenDetail(0);
  // main
  return (
    <>
      <UserSearch onSubmit={handleSearch} />
      <User />

          {open !== 0 && <Modal
          keepMounted
          open={open !== 0}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-monted-modal-description"
        >
            <ModelUpdate id={open}/>
        </Modal>}
        {openDetail !== 0 && <Modal
            keepMounted
            open={openDetail !== 0}
            onClose={handleCloseDetail}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-monted-modal-description"
          >
          <ModelDetail id ={openDetail}/> 
      </Modal>}
      <Pagegination Pagination={pagination} onPageChange={handlepagechange} />
    </>
  );
};
