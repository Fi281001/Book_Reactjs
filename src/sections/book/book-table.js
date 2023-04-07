import _ from "lodash";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Box } from "@mui/material";
import { BookSearch } from 'src/sections/book/book-search';
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
export const BookTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [book, setBook] = useState([]);
  const [paginatedBook, setpaginatedBook] = useState([]);
  const [curren, setcurren] = useState(1);
  const pageSize = 8;
  
  const api = "http://localhost:8000/book";
  // lấy api hiển thị dữ liệu
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(api);
      setBook(res.data);
      setpaginatedBook(_(res.data).slice(0).take(pageSize).value());
    };
    getPosts();
  }, []);

  // phan trang
  const pageCount = book ? Math.ceil(book.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pagenumber) => {
    setcurren(pagenumber);
    const startindex = (pagenumber - 1) * pageSize;
    const paginatedBook = _(book).slice(startindex).take(pageSize).value();
    setpaginatedBook(paginatedBook);
  };
  // xoa 1 phần tử trong api
  const handleDelete = async (b) => {
    if (confirm(`Bạn có muốn xóa ${b.name} ko?`)) {
      await axios.delete(api + "/" + b.id);
      setpaginatedBook(paginatedBook.filter((f) => f.id !== b.id));
      setBook(book.filter((f) => f.id !== b.id));
    }
  };
  // hiển thị api ra table
  const Book = () => {
    return (
      <>
        {console.log(">>>", book)}
        <Table striped bordered hover>
          <thead>
            <tr style={{ background: "#6366F1" }} className="text-white">
              
              <th className="w-20 ">Ảnh</th>
              <th className="w-20 ">Name</th>
              <th className="w-20 ">Category</th>
              <th className="w-20 ">Quantity</th>
              <th className="w-20 ">Price</th>
              <th className="w-20 ">Status</th>
              <th className="w-20 ">Detail</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBook.map((book) => (
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

                <td>
                  <Button onClick={handleOpen}>Detail</Button>
                </td>
                <td>
                  <Button onClick={handleOpen} variant="contained" color="success">
                    Upadate
                  </Button>
                </td>
                <td>
                  {" "}
                  <Button variant="contained" color="error" onClick={() => handleDelete(book)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };
  const ModelUpdate = () => {
    return (
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-monted-modal-description"
      >
        <Box sx={style}>
          <TextField fullWidth label="nhập loại sách update" />
          <div className="mt-2 ">
            <Button variant="contained">save</Button>
          </div>
        </Box>
      </Modal>
    );
  };
  const ModelDetail = () => {
    return (
      <Modal
        keepMounted
        open={openDetail}
        onClose={handleCloseDetail}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-monted-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    );
  };
  // hiển thị phân trang
  const Page = () => {
    return (
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page) => (
            <li className={page === curren ? "page-item active" : "page-item"} key={page}>
              <a className="page-link" onClick={() => pagination(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  return (
    <>
     <BookSearch/>
      <Book />
      <Page />
    </>
  );
};
