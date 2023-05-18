import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "../../apis/axiosApi";

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
  p: 4,
  pl: 10,
  pr: 10,
};
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
export default function FilterPage(props) {
  const { pagination, onPageChange, setLoad, Data } = props;
  const { page, perPage, totalRows } = pagination;
  const { load, status } = setLoad;
  const totalPages = Math.ceil(totalRows / perPage);
  const [selectedValue, setSelectedValue] = useState("");

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  function handleChange(e) {
    const selectedValue = e.target.value;
    if (selectedValue === "1") {
      setLoad({ ...pagination, page: 1, status: "ejected" });
    } else if (selectedValue === "2") {
      setLoad({ ...pagination, page: 1, status: "Cancel" });
    } else if (selectedValue === "3") {
      setLoad({ ...pagination, page: 1, status: "Paying" });
    } else if (selectedValue === "4") {
      setLoad({ ...pagination, page: 1, status: "Receiving" });
    } else if (selectedValue === "5") {
      setLoad({ ...pagination, page: 1, status: "borrowing" });
    } else if (selectedValue === "6") {
      setLoad({ ...pagination, page: 1, status: "Returned" });
    } else if (selectedValue === "7") {
      setLoad({ ...pagination, page: 1, status: "Overdue returned" });
    } else if (selectedValue === "8") {
      setLoad({ ...pagination, page: 1, status: "Not returned" });
    } else if (selectedValue === "0") {
      setLoad({ ...pagination, page: 1, status: "pending" });
    } else {
      setLoad({ ...pagination, page: 1 });
    }
    setSelectedValue(selectedValue);
  }
  const Option = () => {
    return (
      <>
        <Form.Select
          style={{
            width: "200px",
            marginRight: "10px",
            borderColor: selectedValue ? "#6366F1" : null,
          }}
          aria-label="Default select example"
          value={selectedValue}
          onChange={handleChange}
        >
          <option>Fitter status</option>
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
      <div style={{ display: "flex", paddingLeft: "1px", marginTop: "10px" }}>
        <div>
          <Option />{" "}
        </div>
        <div>
          <Button
            onClick={() => {
              handlePageChange(page - 1);
            }}
            variant="contained"
            disabled={page === 1}
          >
            prev
          </Button>

          <strong style={{ marginInline: "5px" }}>{page}</strong>

          <Button
            disabled={page >= totalPages}
            onClick={() => {
              handlePageChange(page + 1);
            }}
            variant="contained"
          >
            next
          </Button>
        </div>
      </div>
    </>
  );
}
