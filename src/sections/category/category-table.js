import * as React from "react";
import queryString from "query-string";
import Pagegination from "src/sections/category/page";
import CategorySearch from "src/sections/category/category-search";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "../../apis/axiosApi";
import Modal from "@mui/material/Modal";
import ModelUpdate from "../category/model-update";
import ModelDetail from "../category/model-detail";
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

export const CategoryTable = (props) => {
  const [cat, setCat] = useState([]);

  // phân trang
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 0,
    from: 1,
    to: 10,
    limit: 0,
  });

  //xử lý api
  // const [length, setLength] = useState();
  const [load, setLoad] = useState({
    page: 1,
    //limit: 5,
    ["name[like]"]: "",
    perPage: 10,
    from: 1,
    to: 10,
    page: 1,
    perPage: 10,
  });
  useEffect(() => {
    async function getPosts() {
      const param = queryString.stringify(load);

      try {
        const apilength = await axios.get2(
          `https://thuvien.nemosoftware.net/api/v1/categories?name[like]=${load["name[like]"]}`
        );
        const legth = apilength.data.meta.totalRows;

        const api = `https://thuvien.nemosoftware.net/api/v1/categories?${param}`;

        const res = await axios.get2(api);

        setCat(res.data.data);
        setPagination({
          ...pagination,
          page: load.page,
          totalRows: legth,

          ["name[like]"]: load.newSearch,
        });
      } catch (error) {
        // console.log("error");
      }
    }
    getPosts();
  }, [load]);

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
      ["name[like]"]: newSearch.search,
    });
  }
  const handleDelete = async (cat) => {
    if (confirm(`Bạn có muốn xóa ${cat.name} ko?`)) {
      await axios.delete("https://thuvien.nemosoftware.net/api/v1/categories/" + cat.id);
      loading();
    }
  };
  const Categories = () => {
    return (
      <>
        <div className="table-responsive">
          <p style={{ marginBottom: "10px" }}>
            There are <strong style={{ color: "#6366F1" }}>{pagination.totalRows}</strong> types of
            books
          </p>
          <Table bordered hover>
            <thead>
              <tr style={{ background: "#6366F1" }} className="text-white">
                <th className="w-20 ">ID</th>
                <th className="w-50 ">Categorybook</th>
                <th style={{ textAlign: "center" }}>Detail</th>
                <th style={{ textAlign: "center" }}>Update</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cat.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button onClick={() => setOpenDetail(cat.id)}>Detail</Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button variant="contained" color="success" onClick={() => setOpen(cat.id)}>
                      Upadate
                    </Button>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Button variant="contained" color="error" onClick={() => handleDelete(cat)}>
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
  // open model and close model update
  const [open, setOpen] = useState(0);
  const handleClose = () => setOpen(0);
  const [openDetail, setOpenDetail] = useState(0);
  const handleCloseDetail = () => setOpenDetail(0);
  return (
    <>
      <CategorySearch onSubmit={handleSearch} />
      <Categories />
      {open !== 0 && (
        <Modal
          keepMounted
          open={open !== 0}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-monted-modal-description"
        >
          <ModelUpdate id={open} />
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
          <ModelDetail id={openDetail} />
        </Modal>
      )}
      <Pagegination Pagination={pagination} onPageChange={handlepagechange} />
    </>
  );
};
