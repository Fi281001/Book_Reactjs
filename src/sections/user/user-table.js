import axios from "../../apis/axiosApi";
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

import ModelLock from "./model-look";
import ModelDetail from "./model-detail";
export const UserTable = (props) => {
  const [user, setUser] = useState([]);
  // phân trang
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 0,
    from: 1,
    to: 10,
    limit: 0,
  });
  //xử lý api (phân trang, search)
  const [load, setLoad] = useState({
    page: 1,
    perPage: 10,
    from: 1,
    to: 10,

    ["fullName[like]"]: "",
  });
  // call api
  useEffect(() => {
    async function getPosts() {
      const param = queryString.stringify(load);
      try {
        const apilength = await axios.get2(
          `https://thuvien.nemosoftware.net/api/v1/users?relations=package,books&fullName[like]=${load["fullName[like]"]}`
        );
        const legth = apilength.data.meta.totalRows;
        const api = `https://thuvien.nemosoftware.net/api/v1/users?relations=package, books&${param}`;
        const res = await axios.get2(api);
        console.log("ssssss", res.data.data);
        setUser(res.data.data);
        setPagination({
          ...pagination,
          page: load.page,
          totalRows: legth,
          ["fullName[like]"]: load.newSearch,
        });
      } catch (error) {
        // console.log("error");
      }
    }
    getPosts();
  }, [load]);
  // lock

  // xử lý phân trang
  function handlepagechange(newPage) {
    setLoad({ ...load, page: newPage });
  }
  // load lại trang
  function loading() {
    location.reload();
  }
  // xử lý search
  function handleSearch(newSearch) {
    setLoad({
      ...load,
      page: 1,
      ["fullName[like]"]: newSearch.search,
    });
  }
  //xóa api
  const handleDelete = async (u) => {
    const api = `https://thuvien.nemosoftware.net/api/v1/users`;
    if (confirm(`Bạn có muốn xóa ${u.id} ko?`)) {
      await axios.delete(api + "/:" + u.id);
      loading();
    }
  };
  // hiển thị data table
  const User = () => {
    return (
      <>
        <div className="table-responsive">
          <p style={{ marginBottom: "10px" }}>
            There are <strong style={{ color: "#6366F1" }}>{pagination.totalRows}</strong> Users
          </p>
          <Table bordered hover>
            <thead>
              <tr style={{ background: "#6366F1" }} className="text-white">
                <th className="w-20 ">Avatar</th>
                <th className="w-20 ">Full Name</th>
                <th className="w-30 ">Phone</th>
                <th className="w-20 ">Email</th>
                <th className="w-20 ">Address</th>
                <th className="w-20 ">Score</th>
                <th className="w-20 ">Package</th>
                <th style={{ textAlign: "center" }} className="w-20 ">
                  Detail
                </th>
                <th style={{ textAlign: "center" }}>Lock & Unlock</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user.id}>
                  <td
                    style={{
                      backgroundImage: `url(${user.avatar})`,
                      width: "50px",
                      height: "100%",
                      backgroundSize: "cover",
                    }}
                  ></td>
                  <td>{user.fullName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    {" "}
                    <span>{user.address ? user.address.substring(0, 15) + "..." : "N/A"}</span>
                  </td>
                  <td>{user.score}</td>
                  <td>{user.package.type}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => {
                        setOpenDetail(user.id);
                      }}
                    >
                      Detail
                    </Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {user.id === 1 ? (
                      <>
                        <button
                          type="button"
                          className="btn btn- btn-secondary"
                          disabled
                          onClick={() => {
                            setLock(user.id);
                          }}
                        >
                          admin
                        </button>
                      </>
                    ) : (
                      <>
                        {user.status === 1 ? (
                          <button
                            type="button"
                            style={{ width: "78px" }}
                            className="btn btn-warning"
                            onClick={() => {
                              setLock(user.id);
                            }}
                          >
                            {" "}
                            lock{" "}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              setLock(user.id);
                            }}
                          >
                            unlock
                          </button>
                        )}
                      </>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {user.id === 1 ? (
                      <Button
                        variant="contained"
                        disabled
                        color="error"
                        onClick={() => handleDelete(user)}
                      >
                        {" "}
                        Delete
                      </Button>
                    ) : (
                      <Button variant="contained" color="error" onClick={() => handleDelete(user)}>
                        {" "}
                        Delete
                      </Button>
                    )}
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

  // đóng mở model detail
  const [openDetail, setOpenDetail] = useState(0);
  const handleCloseDetail = () => setOpenDetail(0);

  // lock
  const [lock, setLock] = useState(0);
  const unlock = () => setLock(0);
  return (
    <>
      <UserSearch onSubmit={handleSearch} />
      <User />
      {lock !== 0 && (
        <Modal
          keepMounted
          open={lock !== 0}
          onClose={unlock}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-monted-modal-description"
        >
          <ModelLock id={lock} lock={lock} />
        </Modal>
      )}
      {openDetail !== 0 && (
        <Modal
          keepMounted
          open={openDetail !== 0}
          onClose={handleCloseDetail}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-monted-modal-description"
        >
          <ModelDetail id={openDetail} setLock={setLock} />
        </Modal>
      )}
      <Pagegination Pagination={pagination} onPageChange={handlepagechange} />
    </>
  );
};
