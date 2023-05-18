import React from "react";
import axios from "../../apis/axiosApi";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

export default function Borrower({ id }) {
  const [book, setBook] = useState([]);
  //phân trang
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // lấy api hiển thị dữ liệu
  useEffect(() => {
    async function getPosts() {
      try {
        const api = `https://thuvien.nemosoftware.net/api/v1/books/${id}?relations=category,users`;
        const res = await axios.get(api);
        setBook(res.data.data.borrowers);
        setIsDataLoaded(true);
      } catch (error) {}
    }
    getPosts();
  }, []);

  const Book = () => {
    const hasBooks = book.length !== 0;
    return (
      <>
        <h2 style={{ textAlign: "center", color: "#6366F1" }}> Book borrower</h2>
        {isDataLoaded ? (
          <>
            {book.length !== 0 ? (
              <>
                <div className="table-responsive">
                  <Table bordered hover>
                    <thead>
                      <tr style={{ background: "#6366F1" }} className="text-white">
                        <th className="w-20">Avatar</th>
                        <th className="w-20">Name</th>
                        <th className="w-20">Phone</th>
                        <th className="w-20">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {book.map((person) => (
                        <tr key={person.id}>
                          <td
                            style={{
                              backgroundImage: `url(${person.avatar})`,
                              width: "50px",
                              height: "100%",
                              backgroundSize: "cover",
                            }}
                          ></td>
                          <td>{person.fullName}</td>
                          <td>{person.phone}</td>
                          <td>{person.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <>
                <div className="table-responsive">
                  <Table bordered hover>
                    <thead>
                      <tr style={{ background: "#6366F1" }} className="text-white">
                        <th className="w-20">Avatar</th>
                        <th className="w-20">Name</th>
                        <th className="w-20">Phone</th>
                        <th className="w-20">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4">
                          <h3>Không có người mượn</h3>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr style={{ background: "#6366F1" }} className="text-white">
                  <th className="w-20">Avatar</th>
                  <th className="w-20">Name</th>
                  <th className="w-20">Phone</th>
                  <th className="w-20">Email</th>
                </tr>
              </thead>
            </Table>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" fullWitdh height={60} />
            </Stack>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <Box sx={style}>
        <Book />
      </Box>
    </>
  );
}
