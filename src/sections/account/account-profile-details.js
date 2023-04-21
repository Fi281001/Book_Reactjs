import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import axios from "axios";

export const AccountProfileDetails = () => {
  const [user, setUser] = useState([
    {
      full_name: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  ]);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tv, setTv] = useState([]);
  // Request interceptor for API calls
  const axiosApiInstance = axios.create();
  axiosApiInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  useEffect(() => {
    const getMe = async () => {
      const res = await axiosApiInstance.get("http://localhost:8001/api/v1/auth/me");
      setUser(res.data.data);
      console.log(res.data.data);
    };
    getMe();
  }, []);

  const save = async () => {
    const apiup = `http://localhost:8001/api/v1/auth/update-me`;
    const res = await axiosApiInstance
      .patch(apiup, user)
      .then((res) => {
        console.log(user);
        console.log(res.data);
        // loading()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <label>
                  <strong>Full name</strong>
                </label>
                <TextField
                  fullWidth
                  value={user.full_name}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      full_name: e.target.value,
                      fullName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <label>
                  <strong>Email</strong>
                </label>
                <TextField
                  fullWidth
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <label>
                  <strong>Phone</strong>
                </label>
                <TextField
                  fullWidth
                  value={user.phone}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      phone: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <label>
                  <strong>Address</strong>
                </label>
                <TextField
                  fullWidth
                  value={user.address}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: e.target.value,
                    })
                  }
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
    </form>
  );
};
