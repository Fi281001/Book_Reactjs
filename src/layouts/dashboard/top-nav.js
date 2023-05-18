import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import axios from "../../apis/axiosApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
import { useDispatch, useSelector } from "react-redux";
import { selectUpdateAvatar, updateAvatar } from "src/reduce/userSlice";
export const TopNav = (props) => {
  const router = useRouter();
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  // hiển thị thông tin
  const [user, setUser] = useState({
    full_name: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const dispatch = useDispatch();
  // const [avatarURL, setAvatarURL] = useState(useSelector((state) => state.avatar));
  // useEffect(() => {
  //   const getMe = async () => {
  //     const res = await axiosApiInstance.get("/auth/me");
  //     if (res.data.data) {
  //       setUser(res.data.data);
  //       let linkAvatar = `http://localhost:8001${res.data.data.avatar}`;
  //       setUser({
  //         ...user,
  //         avatar: linkAvatar,
  //       });
  //     }
  //   };
  //   getMe();
  // }, []);
  // useEffect(() => {
  //   setAvatarURL(user.avatar);
  //   // setAvatarURL(avatarState);
  // }, [user]);

  // useEffect(() => {
  //   // dispatch(
  //   //   updateAvatar({
  //   //     avatar: avatarURL,
  //   //     username: user.email,
  //   //   })
  //   // );

  //   setAvatarURL(avatarURL);
  // }, [dispatch]);
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

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src={tv.avatar}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
