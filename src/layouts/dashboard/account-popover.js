import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import axios from "../../apis/axiosApi";
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  // xư lý token lay thong tin
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
  const handleSignOut = useCallback(() => {
    onClose?.();
    auth.signOut();
    router.push("/auth/login");
    localStorage.removeItem("token");
  }, [onClose, auth, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {tv.full_name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
