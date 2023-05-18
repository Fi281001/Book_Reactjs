import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBook } from "src/sections/overview/overview-book";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewList } from "src/sections/overview/overview-toplist";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewSachThue } from "src/sections/overview/overview-sach-thue";
import { OverviewMember } from "src/sections/overview/overview-Member";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewCircle } from "src/sections/overview/overview-circle";
import { useEffect, useState } from "react";
import axios from "../apis/axiosApi";
const now = new Date();

const Page = () => {
  // lấy api sách và tính số lượng sách theo quantity
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function getPosts2() {
      try {
        const apilength = await axios.get("https://thuvien.nemosoftware.net/api/v1/books");
        const legth = apilength.data.meta.totalRows;
        const res = await axios.get(`https://thuvien.nemosoftware.net/api/v1/books?limit=${legth}`);
        setBooks(res.data.data);
      } catch (error) {}
    }
    getPosts2();
  }, []);
  const totalQuantity =
    books && books.length > 0 ? books.reduce((total, book) => total + book.quantity, 0) : 0;
  // hiển thị số lượng sách thuê
  const [thue, setThue] = useState([]);
  useEffect(() => {
    async function getPosts3() {
      try {
        const apilength = await axios.get(
          "https://thuvien.nemosoftware.net/api/v1/book-user?status[eq]=borrowing"
        );
        const legth = apilength.data.meta.totalRows;
        const res = await axios.get(
          `https://thuvien.nemosoftware.net/api/v1/book-user?status[eq]=borrowing&limit=${legth}`
        );
        setThue(res.data.data);
      } catch (error) {}
    }
    getPosts3();
  }, []);
  const totalQuantity2 =
    thue && thue.length > 0 ? thue.reduce((total, thue) => total + thue.amount, 0) : 0;

  // hiển thị số lượng thành viên
  const [member, setMember] = useState(0);
  useEffect(() => {
    async function getPosts() {
      try {
        const apilength = await axios.get("https://thuvien.nemosoftware.net/api/v1/users");
        const legth = apilength.data.meta.totalRows;
        setMember(legth);
      } catch (error) {}
    }
    getPosts();
  }, []);
  /* xử lý biểu đồ tròn */
  const [circle, setCircle] = useState([]);
  useEffect(() => {
    axios
      .get("https://thuvien.nemosoftware.net/api/v1/books?column=quantity&sortType=desc&limit=5")
      .then((response) => {
        setCircle(response.data.data);
      });
  }, []);
  const quantity = circle.map((c) => c.quantity);
  const nameCircle = circle.map((c) => c.name);

  // hiển thị top 5 thành viên
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("https://thuvien.nemosoftware.net/api/v1/users").then((response) => {
      setUser(response.data.data);
    });
  }, []);
  const sortedPeople = user.sort((a, b) => b.point - a.point);
  const topFivePeople = sortedPeople.slice(0, 5);
  //hiển thị duyệt
  const [browse, setBrows] = useState([]);
  const [length, setLength] = useState(0);
  useEffect(() => {
    axios
      .get("https://thuvien.nemosoftware.net/api/v1/book-user?relations=book,user")
      .then((response) => {
        setLength(response.data.meta.totalRows);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`https://thuvien.nemosoftware.net/api/v1/book-user?relations=book,user&limit=${length}`)
      .then((response) => {
        setBrows(response.data.data);
      });
  }, []);
  return (
    <>
      <Head>
        <title>Statistical | Book</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBook
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={totalQuantity}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewMember
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={member}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewSachThue sx={{ height: "100%" }} value={totalQuantity2} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewCircle chartSeries={quantity} labels={nameCircle} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewList pepole={topFivePeople} sx={{ height: "100%" }} />
            </Grid>
            <Grid md={12} lg={8}>
              <OverviewLatestOrders data={browse} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
