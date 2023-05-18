import { AiOutlineCloseCircle } from "react-icons/ai";
import { Avatar, Box, Button, Card, CardActions, CardContent, Skeleton } from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import updateAvatar from "src/reduce/userSlice";
import axios from "../../apis/axiosApi";
export const AccountProfile = () => {
  // hiển thị thông tin
  const [user, setUser] = useState({
    email: "",
    avatar: "",
  });
  const [user2, setUser2] = useState({
    email: "",
    avatar: "",
  });
  const dispatch = useDispatch();
  const [avatarURL, setAvatarURL] = useState();
  const [avatarUpload, setAvatarUpload] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMe = async () => {
      const res = await axios.get("/auth/me");
      if (res.data.data) {
        setUser2(res.data.data);
        console.log("user", res.data.data.avatar);
        // const linkAvatar = `https://thuvien.nemosoftware.net/api/v1/${res.data.data.avatar}`;
        const linkAvatar = res.data.data.avatar;
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
      const apiup = `https://thuvien.nemosoftware.net/api/v1/auth/upload-avatar`;
      // console.log("avatarUpload:::", avatarUpload);
      setOpen(true);
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
      console.log("res.data::::", res.data.data);
      const res2 = await axios.get("/auth/me");
      let linkAvatar = res.data.data.avatarres.data.data.avatar;
      setUser(res2.data.data);
      setUser({
        ...user,
        avatar: linkAvatar,
      });
      setAvatarURL(linkAvatar);

      handleClick();
    } catch (error) {
      console.log("save image:::", error);
    }
  };
  const avatar = useSelector((state) => state.avatar);
  // const avatar2 = useSelector(selectUpdateAvatar);
  // useEffect(() => {
  //   setAvatarURL(avatar);
  // }, [avatarURL]);

  return (
    <>
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
          {" "}
          <Card>
            <CardContent>
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <AiOutlineCloseCircle fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Cập nhật ảnh thành công
                </Alert>
              </Collapse>
              {/* <Snackbar
                // sx={{ mt: 5 }}
                // anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              > */}
              {/* <Alert
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Cập nhật ảnh thành công
              </Alert> */}
              {/* </Snackbar> */}
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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

                <Typography variant="body2" color="text.secondary">
                  {user2.email}
                </Typography>
              </Box>
            </CardContent>

            <CardActions>
              <Button fullWidth variant="contained" onClick={save}>
                save
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
};
