import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import axios, { Axios } from "axios";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UserTable } from "src/sections/user/user-table";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
const now = new Date();
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

const Page = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    point: 0,
    imguser: "",
  });
  function load() {
    location.reload();
  }
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUser({
      ...user,
      imguser: base64,
    });
  };

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
  const api = "http://localhost:8000/user";

  const Postdata = (e) => {
    if (
      user.name == "" ||
      user.phone == "" ||
      user.email == "" ||
      user.address == "" ||
      user.point == ""
    ) {
      alert("xin nhập đầy đủ");
      return handleClose();
    } else {
      axios
        .post(api, user)
        .then((res) => {
          load();
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Head>
        <title>User | BOOK</title>
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
                <Typography variant="h4">User</Typography>
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

            <UserTable />
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
            <input onChange={uploadImage} multiple type="file" name="img" className="mb-2" />
            <TextField
              className="mb-2"
              fullWidth
              label="nhập tên sách"
              name="name"
              value={user.name}
              onChange={(e) => {
                console.log("====> name::::", e.target.value);
                return setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
            />
            <TextField
              className="mb-2"
              fullWidth
              label="nhập phone"
              name="phone"
              value={user.phone}
              onChange={(e) =>
                setUser({
                  ...user,
                  phone: e.target.value,
                })
              }
            />
            <TextField
              className="mb-2"
              fullWidth
              label="nhập email"
              name="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
            />
            <TextField
              className="mb-2"
              fullWidth
              label="nhập địa chỉ"
              name="address"
              value={user.address}
              onChange={(e) =>
                setUser({
                  ...user,
                  address: e.target.value,
                })
              }
            />
            <TextField
              className="mb-2"
              fullWidth
              label="nhập point"
              name="point"
              value={user.point}
              onChange={(e) =>
                setUser({
                  ...user,
                  point: +e.target.value,
                })
              }
            />
            <div className="mt-2 ">
              <Button onClick={Postdata} variant="contained">
                save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
