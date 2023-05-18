import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import axios from "../../apis/axiosApi";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pl: 2,
  pr: 2,
};
export default function Modeltoplist(props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [book, setBook] = useState([]);
  // hàm chuyển đổi mm/dd/yyyy thành dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // đổi định dạng
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    return formattedDate;
  };

  const handleChose = async () => {
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);

    console.log("Start date:", startDateFormatted);
    console.log("End date:", endDateFormatted);
    try {
      const response = await axios.get2(
        ` https://thuvien.nemosoftware.net/api/v1/book-user?relations=book&status=borrowing&borrowedAt[gte]=${startDateFormatted}&borrowedAt[gte]=${endDateFormatted}&column=amount&sortType=desc&limit=5`
      );

      //setBook(response.data.data);
      console.log("rss", response.data.data.totoRows);
    } catch (error) {
      console.log("loi");
    }
  };

  return (
    <>
      <Box sx={style}>
        <div>
          <h3 style={{ textAlign: "center", color: "#6366F1" }}>Choose a date</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form.Group
              style={{ width: "150px", marginRight: "10px" }}
              className="mb-3"
              controlId="formGroupEmail"
            >
              <Form.Label>
                <strong>From: </strong>
              </Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              style={{ width: "150px", marginRight: "10px" }}
              className="mb-3 mr-2"
              controlId="formGroupPassword"
            >
              <Form.Label>
                <strong>To: </strong>
              </Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <div style={{ width: "41px" }}>
              <Button
                style={{
                  backgroundColor: "#6366F1",
                  color: "white",
                  height: "41",
                  marginTop: "28px",
                }}
                type="submit"
                onClick={handleChose}
              >
                Choose
              </Button>
            </div>
          </div>
          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr style={{ background: "#6366F1" }} className="text-white">
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th style={{ width: "300px" }}>rental book number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.amount}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Box>
    </>
  );
}
