import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
//import { useAuth } from 'src/hooks/use-auth';
import { isEmpty } from "lodash";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axios from "../../apis/axiosApi";
import { color } from "@mui/system";
const Page = () => {
  const router = useRouter();

  const [username, setName] = useState("thuctapgosu@gmail.com");
  const [password, setPassword] = useState("thuctapgosu2023");
  const [errors, setErrors] = useState("");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleApi = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.meta.accessToken);
      localStorage.setItem("refreshToken", res.data.meta.refreshToken);

      router.push("/");
    } catch (error) {
      setErrors({
        error,
      });

      let errorContent = error;
      if (error.response && error.response.data.error.message) {
        errorContent = error.response.data.error.message;
      }
      setErrors(errorContent);
    }
  };

  // useEffect(() => {
  //   let fields = Object.keys(errors);
  //   let err = errors;
  //   for (let field of fields) {
  //     const error = errors[field];
  //     err = {
  //       [field]: error[0] ?? "",
  //     };
  //   }
  //   setErrors(err);
  // }, []);

  return (
    <>
      <Head>
        <Typography>Login | Book</Typography>
      </Head>
      {/* {!isEmpty(errors) && <Alert severity="error">{errors}</Alert>} */}
      <Box
        sx={{
          backgroundColor: "  ",
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
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                component={NextLink}
                href="/auth/register"
                underline="hover"
                variant="subtitle2"
              >
                Register
              </Link>
            </Typography>
          </Stack>

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={username}
            error={!isEmpty(errors)}
            // helperText={errors}
            onChange={(e) => setName(e.target.value.trim())}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id={password}
            value={password}
            error={!isEmpty(errors)}
            // helperText={errors}
          />
          {!isEmpty(errors) && (
            <Alert style={{ color: "red" }} severity="error">
              {errors}
            </Alert>
          )}
          <Button fullWidth size="large" sx={{ mt: 3 }} onClick={handleApi} variant="contained">
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
