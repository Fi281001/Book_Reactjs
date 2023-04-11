import axios from "axios";
import queryString from "query-string";
import _, { set, update } from "lodash";
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
import Pagegination from "src/sections/book/page";
import BookSearch from "src/sections/book/book-search";
export const BookTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [book, setBook] = useState([]);
  // mở model detail
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const handleOpenDetail = async (id) => {
    console.log("id", id);
    const api = `http://localhost:8000/book/${id}`;
    const res = await axios.get(api);
    setDetail(res.data);
    setOpenDetail(true);
  };
  // đóng model deatail
  const handleCloseDetail = () => setOpenDetail(false); 

    // phân trang
    const [pagination, setPagination] = useState({
      _page: 1,
      _limit: 5,
      _totalRows: 1,
    });
    // xử lí api
    const [load, setLoad] = useState({
      _page: 1,
      _limit: 5,
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

                <td>
                  <Button onClick={() => {
                      handleOpenDetail(book.id);
                    }}>Detail</Button>
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
            <CardMedia sx={{ height: 200 }} image={detail.img} component='div'/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Name: {detail.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {detail.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {detail.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {detail.quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CategoryID: {detail.categoryId}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  };

  return (
    <>
     <BookSearch onSubmit={handleSearch}/>
      <Book />
      <ModelDetail />
      <Pagegination Pagination={pagination} onPageChange={handlepagechange} />
    </>
  );
};
