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
import Pagegination from "src/sections/book/page";
import BookSearch from "src/sections/book/book-search";
import ModelDetail from "src/sections/book/model-detail";
import ModelUpdate from "src/sections/book/model-update";
import Borrower from "src/sections/book/book-borrower";
export const BookTable = (props) => {
  const [book, setBook] = useState([]);
  //phân trang
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 0,
    from: 1,
    to: 10,
    limit: 0,
  });
  // xử lí api
  const [load, setLoad] = useState({
    page: 1,
    ["name[like]"]: "",
    perPage: 10,
    from: 1,
    to: 10,
    page: 1,
    perPage: 10,
  });

  // lấy api hiển thị dữ liệu
  useEffect(() => {
    async function getPosts() {
      const param = queryString.stringify(load);
      try {
        const apilength = await axios.get2(
          `https://thuvien.nemosoftware.net/api/v1/books?name[like]=${load["name[like]"]}`
        );

        const legth = apilength.data.meta.totalRows;
        const api = `https://thuvien.nemosoftware.net/api/v1/books?${param}`;
        const res = await axios.get2(api);
        setBook(res.data.data);
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

  // xử lý next hoặc prev trang
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
      "name[like]": newSearch.search,
    });
  }

  // xóa Api
  const handleDelete = async (b) => {
    if (confirm(`Bạn có muốn xóa ${b.name} ${b.id} ko?`)) {
      console.log("idb", b.id);

      await axios.delete(`https://thuvien.nemosoftware.net/api/v1/books/${b.id}`);

      loading();
    }
  };

  // hiển thị api ra table
  const Book = () => {
    return (
      <>
        <div className="table-responsive">
          <p style={{ marginBottom: "10px" }}>
            There are <strong style={{ color: "#6366F1" }}>{pagination.totalRows}</strong> books
          </p>
          <Table bordered hover>
            <thead>
              <tr style={{ background: "#6366F1" }} className="text-white">
                <th className="w-20 ">Avatar</th>
                <th className="w-20 ">Name</th>
                <th className="w-20 ">Author</th>
                <th className="w-20 ">Quantity</th>
                <th className="w-20 ">Price</th>
                <th className="w-20 ">Status</th>
                <th className="w-20 ">Book borrower</th>
                <th style={{ textAlign: "center" }} className="w-20 ">
                  Detail
                </th>
                <th style={{ textAlign: "center" }}>Update</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {book.map((book) => (
                <tr key={book.id}>
                  <td
                    style={{
                      backgroundImage: `url(${book.image})`,
                      width: "50px",
                      height: "100%",
                      backgroundSize: "cover",
                    }}
                  ></td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.quantity}</td>
                  <td>{book.price}</td>
                  <td>{book.status}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setOpenWatch(book.id);
                      }}
                    >
                      Watch
                    </Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => {
                        setOpenDetail(book.id);
                      }}
                    >
                      Detail
                    </Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button onClick={() => setOpen(book.id)} variant="contained" color="success">
                      Upadate
                    </Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button variant="contained" color="error" onClick={() => handleDelete(book)}>
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
  // dong mo watch
  const [openWatch, setOpenWatch] = useState(0);
  const handleCloseWatch = () => setOpenWatch(0);
  // đóng mở model detail
  const [openDetail, setOpenDetail] = useState(0);
  const handleCloseDetail = () => setOpenDetail(0);
  // đóng mở update
  const [open, setOpen] = useState(0);
  const handleClose = () => setOpen(0);
  return (
    <>
      <BookSearch onSubmit={handleSearch} />
      <Book />
      {openWatch !== 0 && (
        <Modal
          keepMounted
          open={openWatch !== 0}
          onClose={handleCloseWatch}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-monted-modal-description"
        >
          <Borrower id={openWatch} />
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
      <Pagegination Pagination={pagination} onPageChange={handlepagechange} />
    </>
  );
};
