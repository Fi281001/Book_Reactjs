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
import Pagegination from "src/sections/book/page";
import BookSearch from "src/sections/book/book-search";
import ModelDetail from "src/sections/book/model-detail";
import ModelUpdate from "src/sections/book/model-update";
export const BookTable = (props) => {
  const [book, setBook] = useState([]);
    //phân trang
    const [pagination, setPagination] = useState({
      _page: 1,
      _limit: 6,
      _totalRows: 1,
    });
    // xử lí api
    const [load, setLoad] = useState({
      _page: 1,
      _limit: 6,
      q: "",
    });


  const api = "http://localhost:8000/book";
  // lấy api hiển thị dữ liệu
  useEffect(() => {
    async function getPosts() {
      const param = queryString.stringify(load);

      try {
        const apilength = await axios.get(`http://localhost:8000/book?q=${load.q}`);
        const legth = apilength.data.length;

        const api = `http://localhost:8000/book?${param}`;

        const res = await fetch(api);
        const resjson = await res.json();
        const data = resjson;
        setBook(data);
        setPagination({ ...pagination, _page: load._page, _totalRows: legth, q: load.newSearch });

      } catch (error) {
        console.log("error");
      }
    }
    getPosts();
  }, [load]);

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

  // xóa Api
  const handleDelete = async (b) => {
    if (confirm(`Bạn có muốn xóa ${b.name} ko?`)) {
      await axios.delete(api + "/" + b.id);
      loading();
    }
  };
  // hiển thị api ra table
  const Book = () => {
    return (
      <>
      <div className="table-responsive">
        <Table  bordered hover>
          <thead>
            <tr style={{ background: "#6366F1" }} className="text-white">
              
              <th className="w-20 ">Ảnh</th>
              <th className="w-20 ">Name</th>
              <th className="w-20 ">Category</th>
              <th className="w-20 ">Quantity</th>
              <th className="w-20 ">Price</th>
              <th className="w-20 ">Status</th>
              <th style={{textAlign: "center"}} className="w-20 ">Detail</th>
              <th style={{textAlign: "center"}}>Update</th>
              <th style={{textAlign: "center"}}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {book.map((book) => (
              <tr key={book.id}>
               
                <td
                  style={{
                    backgroundImage: `url(${book.img})`,
                    width: "50px",
                    height: "100%",
                    backgroundSize: "cover",
                  }}
                ></td>
                <td>{book.name}</td>
                <td>{book.categoryId}</td>
                <td>{book.quantity}</td>
                <td>{book.price}</td>
                <td>{book.status}</td>

                <td style={{textAlign: "center"}}>
                  <Button onClick={() => {
                      setOpenDetail(book.id)
                    }}>Detail</Button>
                </td>
                <td style={{textAlign: "center"}}>
                  <Button onClick={()=> setOpen(book.id)} variant="contained" color="success">
                    Upadate
                  </Button>
                </td>
                <td style={{textAlign: "center"}}>
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

  // đóng mở model detail
  const [openDetail, setOpenDetail] = useState(0);
  const handleCloseDetail = () => setOpenDetail(0);
  // đóng mở update
  const [open, setOpen] = useState(0);
  const handleClose = () => setOpen(0);
  return (
    <>
     <BookSearch onSubmit={handleSearch}/>
      <Book />
      {openDetail !==0 && 
      <Modal
      keepMounted
      open={openDetail !== 0}
      onClose={handleCloseDetail}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-monted-modal-description"
    >
      <ModelDetail id={openDetail}/>
    </Modal>}
    {open !== 0 && <Modal
      keepMounted
      open={open !== 0}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-monted-modal-description"
    >
      <ModelUpdate id={open}/>
    </Modal>}
      <Pagegination Pagination={pagination} onPageChange={handlepagechange} />
    </>
  );
};
