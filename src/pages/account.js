import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfile } from "src/sections/account/account-profile";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import { SettingsPassword } from "src/sections/approve/settings-password";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
const Page = () => {
  const router = useRouter();
  const [tv, setTv] = useState([]);
  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get("/auth/me");
        setTv(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMe();
  }, []);
  function loading() {
    location.reload();
  }
  return (
    <>
      {localStorage.getItem("token") == undefined ? (
        window.location.replace("/auth/login")
      ) : (
        <>
          <Head>
            <title>Account | BOOK</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="lg">
              <Stack spacing={3}>
                <div>
                  <Typography variant="h4">Account</Typography>
                </div>
                <div>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6} lg={4}>
                      <AccountProfile />
                    </Grid>
                    <Grid xs={12} md={6} lg={8}>
                      <AccountProfileDetails />
                    </Grid>
                  </Grid>
                </div>
              </Stack>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
