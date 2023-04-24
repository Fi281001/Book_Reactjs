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
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../apis/axiosApi";
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMe = async () => {
      const res = await axiosApiInstance.get("/auth/me");
      if (res.data.data) setUser(res.data.data);
      setIsLoading(false);
    };
    getMe();
  }, []);

  useEffect(() => {
    setAvatarURL(user.avatar);
  }, [user]);

  // xử lý file
  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isLoading ? (
              <Skeleton
                variant="circular"
                sx={{
                  height: 80,
                  mb: 2,
                  width: 80,
                }}
              />
            ) : (
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    let avatarUrl = window.URL.createObjectURL(Array.from(e.target.files)[0]);
                    setAvatarURL(avatarUrl);
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
            )}
            <Typography gutterBottom variant="h5">
              {user.fullName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.phone}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="text">
            save
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
