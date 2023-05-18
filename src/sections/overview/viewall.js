import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "../../apis/axiosApi";
import Form from "react-bootstrap/Form";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: 500,
  width: 500,
  pl: 6,
};
import FilterPage from "./filter-page";
import queryString from "query-string";
import { useEffect, useState } from "react";

import { SeverityPill } from "src/components/severity-pill";
export default function ModelView(props) {
  const [browse, setBrows] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalRows: 1,
  });
  // xử lí api
  const [load, setLoad] = useState({
    page: 1,
    parPage: 10,
  });
  // call api xử lí logic

  useEffect(() => {
    async function getPosts() {
      const param = queryString.stringify(load);
      try {
        const apilength = await axios.get2(
          "https://thuvien.nemosoftware.net/api/v1/book-user?relations=book,user"
        );
        const legth = apilength.data.meta.totalRows;
        const api = `https://thuvien.nemosoftware.net/api/v1/book-user?relations=book,user&${param}`;
        const res = await axios.get2(api);

        setBrows(res.data.data);
        setPagination({
          ...pagination,
          page: load.page,
          totalRows: legth,
        });
      } catch (error) {
        // console.log("error");
      }
    }
    getPosts();
  }, [load]);

  function handlePageChange(newPage) {
    setLoad({ ...load, page: newPage });
  }
  // call api update
  const [selectedValue, setSelectedValue] = useState("");
  function handleChange(e, id) {
    const selectedValue = e.target.value;
    const successMessages = {
      0: "Pending",
      1: "Rejected",
      2: "Cancel",
      3: "Paying",
      4: "Receiving",
      5: "Borrowing",
      6: "Returned",
      7: "Overdue returned",
      8: "Not returned",
    };

    const successMessage = successMessages[selectedValue] || "";

    // Gửi yêu cầu API
    // axios
    //   .post("url/api/update", { id, selectedValue })
    //   .then((response) => {
    //     // Xử lý kết quả thành công từ API
    //     console.log("Update thành công", response.data);
    //   })
    //   .catch((error) => {
    //     // Xử lý lỗi từ API
    //     console.error("Lỗi khi update", error);
    //   });
    alert("call api xử lý", { id });
    setSelectedValue(selectedValue);
  }
  const Option = ({ id }) => {
    return (
      <>
        <Form.Select
          style={{
            width: "10px",
            marginRight: "10px",
            borderColor: selectedValue ? "#6366F1" : null,
          }}
          aria-label="Default select example"
          value={selectedValue}
          onChange={(e) => handleChange(e, id)}
        >
          <option value="0">Pending</option>
          <option value="1">Rejected</option>
          <option value="2">Cancel</option>
          <option value="3">Paying</option>
          <option value="4">Receiving</option>
          <option value="5">Borrowing</option>
          <option value="6">Returned</option>
          <option value="7">Overdue returned</option>
          <option value="8">Not returned</option>
        </Form.Select>
      </>
    );
  };
  return (
    <>
      <Box sx={style}>
        <FilterPage
          pagination={pagination}
          onPageChange={handlePageChange}
          setLoad={setLoad}
          Data={browse}
        />
        <Table style={{ marginTop: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Emount</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {browse.map((data) => {
              return (
                <TableRow hover key={data.id}>
                  <TableCell>
                    {" "}
                    <span title={data.user.fullName}>{data.user.fullName.substring(0, 8)}...</span>
                  </TableCell>
                  <TableCell>
                    <span title={data.user.email}>{data.user.email.substring(0, 10)}...</span>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <span title={data.createdAt}>{data.createdAt.substring(0, 15)}...</span>
                  </TableCell>
                  <TableCell>
                    <SeverityPill>{data.status}</SeverityPill>
                  </TableCell>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell>{data.payment}</TableCell>
                  <TableCell>
                    <Option id={data.id} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ width: "fit-content", minWidth: "auto" }}
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
