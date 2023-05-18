import Head from "next/head";
import { useEffect, useCallback, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "../apis/axiosApi";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { isEmpty } from "lodash";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { CategoryTable } from "src/sections/category/category-table";

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
  const [err, setErr] = useState("");
  const [save, setSave] = useState(true);
  const [name, setName] = useState("");
  const api = "https://thuvien.nemosoftware.net/api/v1/categories";
  function load() {
    location.reload();
  }
  // gọi api
  const [name2, setName2] = useState({
    id: 0,
    name: "",
  });

  useEffect(() => {
    async function getdata() {
      const apilength = await axios.get2("https://thuvien.nemosoftware.net/api/v1/categories");
      const legth = apilength.data.meta.totalRows;
      const api2 = `https://thuvien.nemosoftware.net/api/v1/categories?limit=${legth}`;
      const res = await axios.get2(api2);
      setName2(res.data.data);
    }
    getdata();
  }, []);
  const Postdata = () => {
    const nameExists = name2.some((obj) => obj.name === name);
    if (name == "" || nameExists) {
      setErr("Vui lòng nhập đầy đủ hoặc tên sách đã tồn tại");
      setSave(false);
    } else {
      axios
        .post(api, {
          name,
        })
        .then((res) => {
          load();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {localStorage.getItem("token") == undefined ? (
        window.location.replace("/auth/login")
      ) : (
        <>
          <Head>
            <title>Categorybook | Book</title>
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
                    <Typography variant="h4">Categorybook</Typography>
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
                <CategoryTable />
              </Stack>
            </Container>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-monted-modal-description"
            >
              <Box sx={style}>
                <TextField
                  fullWidth
                  label="nhập loại sách"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  error={!isEmpty(err)}
                />
                {save == false ? <p style={{ color: "red" }}>{err}</p> : ""}
                <div className="mt-2 ">
                  <Button fullWidth onClick={Postdata} variant="contained">
                    save
                  </Button>
                </div>
              </Box>
            </Modal>
          </Box>
        </>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
