import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import axios from "../../apis/axiosApi";
import { useDispatch } from "react-redux";
import updateUser from "src/reduce/userSlice";
export const AccountProfileDetails = () => {
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

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    const getMe = async () => {
      const res = await axios.get("/auth/me");
      if (res.data.data) setUser(res.data.data);
      setIsLoading(false);
    };
    getMe();
  }, []);

  const save = async () => {
    try {
      const apiup = `/auth/update-me`;
      const res = await axios.patch(apiup, user);
      setUser(res.data.data);
      setErrors({
        fullName: "",
        phone: "",
        address: "",
        avatar: "",
      });
      //dispatch(updateUser(res.data.data.full_name));
      handleClick();
    } catch (error) {
      const errorContent = error.response.data.error.content;
      setErrors(errorContent);
    }
  };

  useEffect(() => {
    let fields = Object.keys(errors);
    let err = errors;
    for (let field of fields) {
      const error = errors[field];
      err = {
        [field]: error[0] ?? "",
      };
    }
    setErrors(err);
  }, []);
  return (
    <>
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <Box>
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton sx={{ marginTop: "20px" }} variant="rounded" width={210} height={60} />
            </Box>
            <Box>
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton sx={{ marginTop: "20px" }} variant="rounded" width={210} height={60} />
            </Box>
          </Box>
        </Stack>
      ) : (
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <CardContent sx={{ pt: 0 }}>
            <Snackbar
              sx={{ mt: 5 }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                Cập nhật thông tin thành công
              </Alert>
            </Snackbar>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>Full name</Typography>
                  <TextField
                    fullWidth
                    value={user.fullName}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        fullName: e.target.value,
                      })
                    }
                    error={!isEmpty(errors.fullName)}
                    helperText={errors.fullName}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                  <TextField fullWidth value={user.email} disabled />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>Phone</Typography>
                  <TextField
                    fullWidth
                    value={user.phone}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        phone: e.target.value,
                      })
                    }
                    error={!isEmpty(errors.phone)}
                    helperText={errors.phone}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>Address</Typography>
                  <TextField
                    fullWidth
                    value={user.address}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        address: e.target.value,
                      })
                    }
                    error={!isEmpty(errors.address)}
                    helperText={errors.address}
                  />
                </Grid>
                <Grid xs={12} md={6}></Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={save}>
              Save details
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};
