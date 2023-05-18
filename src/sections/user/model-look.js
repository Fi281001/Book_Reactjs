import React from "react";
import { useEffect, useState } from "react";
import axios from "../../apis/axiosApi";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
import { Button, Box } from "@mui/material";

export default function ModelLock({ id }) {
  const [user, setUser] = useState({
    id: 0,
    fullName: "",
    phone: "",
    email: "",
    address: "",
    score: 0,
    avatar: "",
    status: 0,
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  function loading() {
    location.reload();
  }
  useEffect(() => {
    async function fetchData() {
      const api = `https://thuvien.nemosoftware.net/api/v1/users/${id}`;
      const res = await axios.get2(api);
      setUser(res.data.data);
      setIsDataLoaded(true);
    }
    fetchData();
  }, []);
  // xử lí  Lock
  const lock = async () => {
    const apiup = `https://thuvien.nemosoftware.net/api/v1/users/lock/${id}`;
    const res = await axios
      .patch(apiup, { status: 0 })
      .then((res) => {
        loading();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // xử lí un Lock
  const unlock = async () => {
    const apiup = `https://thuvien.nemosoftware.net/api/v1/users/unlock/${id}`;
    const res = await axios
      .patch(apiup, { status: 1 })
      .then((res) => {
        loading();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Box sx={style}>
        {isDataLoaded ? (
          <>
            {" "}
            {user.status == 1 ? (
              <h3 style={{ color: "#6366F1", textAlign: "center" }}>
                Do you want to lock <strong>{user.fullName}'s</strong> account?
              </h3>
            ) : (
              <h3 style={{ color: "#6366F1", textAlign: "center" }}>
                Do you want to unlock <strong>{user.fullName}</strong> account?
              </h3>
            )}
            <div
              style={{ display: "flex ", justifyContent: "space-between", marginBottom: "10px" }}
            >
              <div>
                <Typography variant="body2" color="text.secondary">
                  Name: {user.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {user.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {user.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Score: {user.score}
                </Typography>
              </div>
              <div>
                <img src={user.avatar} style={{ width: "108px", height: "124px" }} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              {user.status == 1 ? (
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{ width: "100%" }}
                  onClick={lock}
                >
                  lock
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ width: "100%" }}
                  onClick={unlock}
                >
                  unlock
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <h3 style={{ color: "#6366F1", textAlign: "center" }}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </h3>
            <div
              style={{ display: "flex ", justifyContent: "space-between", marginBottom: "10px" }}
            >
              <div>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="rectangular" width={210} height={30} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="rectangular" width={210} height={30} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="rectangular" width={210} height={30} />
                </Typography>
                <Skeleton variant="rectangular" width={210} height={30} />
                <Typography variant="body2" color="text.secondary"></Typography>
                <Skeleton variant="rectangular" width={210} height={30} />
                <Typography variant="body2" color="text.secondary"></Typography>
              </div>
              <div>
                <Skeleton variant="" width={108} height={124} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Skeleton variant="rounded" fullWidth height={40} />
            </div>
          </>
        )}
      </Box>
    </>
  );
}
