import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Skeleton,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../apis/axiosApi";
import axios from "axios";
export const AccountProfile = () => {
  // hiển thị thông tin
  const [user, setUser] = useState({
    full_name: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [avatarURL, setAvatarURL] = useState();
  const [avatarUpload, setAvatarUpload] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const getMe = async () => {
      const res = await axiosApiInstance.get("/auth/me");
      if (res.data.data) {
        setUser(res.data.data);
        let linkAvatar = `http://localhost:8001${res.data.data.avatar}`;
        setUser({
          ...user,
          avatar: linkAvatar,
        });
      }

      setIsLoading(false);
    };
    getMe();
  }, []);

  // hiển thị thông báo
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
  useEffect(() => {
    setAvatarURL(user.avatar);
  }, [user]);

  // xử lý save
  const save = async () => {
    try {
      const apiup = `http://localhost:8001/api/v1/auth/upload-avatar`;
      // console.log("avatarUpload:::", avatarUpload);
      const res = await axios.post(
        apiup,
        { avatar: avatarUpload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const res2 = await axiosApiInstance.get("/auth/me");
      let linkAvatar = `http://localhost:8001${res.data.data.avatar}`;
      setUser(res2.data.data);
      setUser({
        ...user,
        avatar: linkAvatar,
      });
      setAvatarURL(linkAvatar);
      handleClick();
    } catch (error) {}
  };

  return (
    <>
      <Card>
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
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isLoading ? (
              <>
                {" "}
                <Skeleton
                  variant="circular"
                  sx={{
                    height: 100,
                    mb: 2,
                    width: 100,
                  }}
                />
                <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80px" }} />
              </>
            ) : (
              <>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      if (window.URL && e.target.files) {
                        let avatarUrl = window.URL.createObjectURL(Array.from(e.target.files)[0]);
                        setAvatarUpload(Array.from(e.target.files)[0]);
                        setAvatarURL(avatarUrl);
                      }
                    }}
                  />
                  <Avatar
                    src={avatarURL}
                    sx={{
                      height: 80,
                      mb: 2,
                      width: 80,
                    }}
                  />
                </IconButton>
                <Typography gutterBottom variant="h7">
                  Update Avatar
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="text" onClick={save}>
            save
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
