import React from "react";
import axios from "../../apis/axiosApi";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 400,
  height: 300,
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 4,
  pr: 2,
  pl: 2,
};
import { Box } from "@mui/material";
import Table from "react-bootstrap/Table";
export default function ModelDetail({ id }) {
  const [detail, setDetail] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const api = `https://thuvien.nemosoftware.net/api/v1/categories/${id}?relations=books`;
      const res = await axios.get(api);
      setDetail(res.data.data.books);
      setIsDataLoaded(true);
    }
    fetchData();
  }, []);
  return (
    <>
      <Box sx={style}>
        <h2 style={{ textAlign: "center", color: "#6366F1" }}>Book type Details</h2>
        {isDataLoaded ? (
          <>
            {detail.length !== 0 ? (
              <>
                <div className="table-responsive">
                  <Table bordered hover>
                    <thead>
                      <tr style={{ background: "#6366F1" }} className="text-white">
                        <th className="w-20 ">Avatar</th>
                        <th className="w-20 ">Name</th>
                        <th className="w-20 ">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.map((detail) => (
                        <tr key={detail.id}>
                          <td
                            style={{
                              backgroundImage: `url(${detail.image})`,
                              width: "50px",
                              height: "100%",
                              backgroundSize: "cover",
                            }}
                          ></td>
                          <td>{detail.name}</td>
                          <td>{detail.author}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <div className="table-responsive">
                <Table bordered hover>
                  <thead>
                    <tr style={{ background: "#6366F1" }} className="text-white">
                      <th className="w-20 ">Avatar</th>
                      <th className="w-20 ">Name</th>
                      <th className="w-20 ">Author</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4">
                        <h3>Không có sách</h3>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </>
        ) : (
          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr style={{ background: "#6366F1" }} className="text-white">
                  <th className="w-20">Avatar</th>
                  <th className="w-20">Name</th>
                  <th className="w-20">Author</th>
                </tr>
              </thead>
            </Table>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" fullWitdh height={60} />
            </Stack>
          </div>
        )}
      </Box>
    </>
  );
}
