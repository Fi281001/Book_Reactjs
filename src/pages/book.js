import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { BookTable } from "src/sections/book/book-table";
import { BookSearch } from "src/sections/book/book-search";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "../apis/axiosApi";
import { isEmpty } from "lodash";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
const now = new Date();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

const Page = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [product, setProduct] = useState({
    // id: 0,
    name: "",
    label: "normal",
    quantity: 0,
    price: 0,
    status: 0,
    image: {},
    description: "",
    position: {
      Compartment: "",
      Shelf: "",
      Range: "",
    },
    loanPrice: 0,
    author: "",
    categoryId: 0,
    publishedAt: "",
  });

  const handlePositionChange = (event) => {
    const newPosition = event.target.value;
    setProduct((product) => ({
      ...product,
      label: newPosition,
    }));
  };
  const [errors, setErrors] = useState("");
  const [save, setSave] = useState(true);
  function load() {
    location.reload();
  }

  const api = "https://thuvien.nemosoftware.net/api/v1/books";
  // gọi api
  const [book2, setBook2] = useState([]);
  useEffect(() => {
    async function getdata() {
      const api = "https://thuvien.nemosoftware.net/api/v1/books";
      const res = await axios.get2(api);
      setBook2(res.data.data);
    }
    getdata();
  }, []);

  const Postdata = async (e) => {
    const nameExists = book2.some((obj) => obj.name === product.name);

    if (
      product.name === "" ||
      product.label === "" ||
      product.author === "" ||
      product.description === "" ||
      product.price === "" ||
      product.quantity === "" ||
      product.loanPrice === "" ||
      product.status === "" ||
      product.categoryId == "" ||
      isNaN(product.price) ||
      isNaN(product.categoryId) ||
      isNaN(product.quantity) ||
      isNaN(product.loanPrice) ||
      isNaN(product.status) ||
      nameExists
    ) {
      setErrors("Bạn chưa nhập đủ thông tin hoặc sai định dạng hoặc tên sách đã tồn tại");
      setSave(false);
    } else {
      const { Compartment, Shelf, Range } = product.position;
      const positionString = `Compartment: ${Compartment} - Shelf: ${Shelf} - Range: ${Range}`;
      product.position = positionString;
      console.log("position", product.position);
      console.log("data::::", product);
      try {
        const formData = new FormData();
        // formData.append("id", product.id);
        formData.append("name", product.name);
        formData.append("label", product.label);
        formData.append("quantity", product.quantity);
        formData.append("price", product.price);
        formData.append("status", product.status);
        formData.append("image", product.image); // Assume product.img is a File object
        formData.append("description", product.description);
        formData.append("position", product.position);
        formData.append("loanPrice", product.loanPrice);
        formData.append("author", product.author);
        formData.append("publishedAt", product.publishedAt);
        formData.append("categoryId", product.categoryId);
        const response = await axios.post(
          "https://thuvien.nemosoftware.net/api/v1/books",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("<<<<<<<<<<<<<<<", response);
      } catch (error) {
        setErrors("Bạn chưa nhập đủ thông tin hoặc sai định dạng hoặc tên sách đã tồn tại");
        setSave(false);
      }
    }
  };

  const handleDateChange = (event) => {
    const formattedDate = formatDate(event.target.value);
    setProduct((product) => ({
      ...product,
      publishedAt: formattedDate,
    }));
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
  const handleRangeChange = (event) => {
    const Range = event.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      position: {
        ...prevProduct.position,
        Range: Range,
      },
    }));
  };

  const handleShelfChange = (event) => {
    const Shelf = event.target.value;
    setProduct((prodcut) => ({
      ...prodcut,
      position: {
        ...prodcut.position,
        Shelf: Shelf,
      },
    }));
  };

  const handleCompartmentChange = (event) => {
    const Compartment = event.target.value;
    setProduct((prodcut) => ({
      ...prodcut,
      position: {
        ...prodcut.position,
        Compartment: Compartment,
      },
    }));
  };
  return (
    <>
      {localStorage.getItem("token") == undefined ? (
        window.location.replace("/auth/login")
      ) : (
        <>
          <Head>
            <title>Book | BOOK</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h4">Book</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}></Stack>
                  </Stack>
                  <div>
                    <Button
                      onClick={handleOpen}
                      startIcon={
                        <SvgIcon fontSize="small">
                          <PlusIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      Add
                    </Button>
                  </div>
                </Stack>
                {/* <BookSearch/> */}
                <BookTable />
              </Stack>
            </Container>
          </Box>
          <div>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box sx={style}>
                <input
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      image: e.target.value,
                    })
                  }
                  multiple
                  type="file"
                  name="img"
                  style={{ color: "#6366F1", marginBottom: "10px" }}
                />
                <TextField
                  className="mb-2"
                  fullWidth
                  label="nhập tên sách"
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      name: e.target.value,
                    })
                  }
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <FormControl
                      fullWidth
                      style={{ width: "150px", marginRight: "1px" }}
                      className="mb-2 "
                    >
                      <InputLabel>Label</InputLabel>
                      <Select value={product.label} onChange={handlePositionChange}>
                        <MenuItem value={"vip"}>vip</MenuItem>
                        <MenuItem value={"normal"}>normal</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ height: "57px", marginLeft: "1px" }}>
                    <TextField
                      fullWidth
                      className=" mb-2"
                      label="nhập cate"
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          categoryId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <TextField
                  className="mb-2"
                  fullWidth
                  label="nhập số lượng"
                  name="quantity"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      quantity: e.target.value,
                    })
                  }
                />
                <TextField
                  className="mb-2"
                  fullWidth
                  label="nhập loại Compartment"
                  onChange={handleCompartmentChange}
                />
                <div style={{ display: "flex", marginTop: "6px", marginRight: "1px" }}>
                  <div style={{ width: "50%" }}>
                    <TextField className="mb-2" label="nhập Shelf" onChange={handleShelfChange} />
                  </div>
                  <div style={{ width: "50%", marginLeft: "1px" }}>
                    <TextField className="mb-2" label="nhập  Range" onChange={handleRangeChange} />
                  </div>
                </div>

                <TextField
                  className="mb-2 mt-2"
                  fullWidth
                  label="nhập giá"
                  name="price"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: e.target.value,
                    })
                  }
                />
                <TextField
                  className="mb-2"
                  fullWidth
                  label="nhập trạng thái"
                  type="text"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      status: e.target.value,
                    })
                  }
                />
                <TextField
                  className="mb-2"
                  fullWidth
                  label="nhập author"
                  type="text"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      author: e.target.value,
                    })
                  }
                />
                <TextField
                  className="mb-2"
                  fullWidth
                  type="date"
                  inputProps={{
                    pattern: "\\d{4}-\\d{2}-\\d{2}",
                  }}
                  onChange={handleDateChange}
                />
                <TextField
                  className="mb-2"
                  fullWidth
                  label="nhập loanprice"
                  type="text"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      loanPrice: e.target.value,
                    })
                  }
                />
                <TextField
                  className="mb-2"
                  fullWidth
                  label="nhập description"
                  type="text"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      description: e.target.value,
                    })
                  }
                />

                {!isEmpty(errors) && (
                  <Alert style={{ color: "red" }} severity="error">
                    {errors}
                  </Alert>
                )}
                <div className="mt-2 ">
                  <Button fullWidth onClick={Postdata} variant="contained">
                    save
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
