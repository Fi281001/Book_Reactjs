import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
//import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty, set } from "lodash";
const Page = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState([
    {
      email: "",
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  ]);

  const Postdata = async () => {
    const api = "http://localhost:8001/api/v1/auth/register";
    await axios
      .post(api, user)
      .then((res) => {
        alert("dang");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (isSubmit) {
      Postdata();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  const setValueForField = (e) => {
    let newUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(newUser);
  };

  return (
    <>
      <Head>
        <title>Register | Devias Kit</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 2 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form>
              <Stack>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setValueForField(e)}
                  style={{ marginBottom: "10px" }}
                />
                {/* {console.log(user.email)} */}
                <TextField
                  fullWidth
                  label="FullNanme"
                  name="fullName"
                  value={user.fullname}
                  onChange={(e) => setValueForField(e)}
                  style={{ marginBottom: "10px" }}
                />
                {/* {console.log(user.fullname)} */}
                <TextField
                  fullWidth
                  label="UserNanme"
                  name="username"
                  value={user.username}
                  onChange={(e) => setValueForField(e)}
                  style={{ marginBottom: "10px" }}
                />
                {/* {console.log(user.username)} */}
                <TextField
                  fullWidth
                  label="PassWord"
                  text="PassWord"
                  name="password"
                  value={user.PassWord}
                  onChange={(e) => setValueForField(e)}
                  style={{ marginBottom: "10px" }}
                />
                {/* {console.log(user.PassWord)} */}
                <TextField
                  fullWidth
                  label="Nhập lại PassWord"
                  text="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={(e) => setValueForField(e)}
                  style={{ marginBottom: "10px" }}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                onClick={() => setIsSubmit(true)}
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
