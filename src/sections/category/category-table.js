import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Box, Button, Unstable_Grid2 as Grid } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CategoryTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filter, setFilter] = useState([]);
  const [search,setSearch] = useState(" ");
  const api = "http://localhost:8000/categories";

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(api);
      setFilter(res);
    };
    getPosts();
  }, [setFilter]);

  const handleDelete = async (cat) => {
    if (confirm(`Bạn có muốn xóa ${cat.name} ko?`)) {
      await axios.delete(api + "/" + cat.id);
      setFilter(filter.filter((f) => f.id !== cat.id));
    }
  };
  const Search = ()=>{
    return(
      <Card sx={{ p: 2 }}>
    <OutlinedInput
    
      fullWidth
      type="text"
      placeholder="Search User"
      name="search"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
    )
  }
  const Categories = () => {
    return (
      <>
       <Search/>
        <Table striped bordered hover>
          <thead>
            <tr style={{ background: "#6366F1" }} className="text-white">
              <th className="w-20 ">ID</th>
              <th className="w-50 ">Loại Sách</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filter.filter((cat)=>{
               if(search === " "){
                return cat
              }
              else if(cat.name.toLowerCase().includes(search.toLocaleLowerCase())){
                return cat
              }
            }).map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleOpen();
                      console.log(`>>>>>>>${cat.name}`);
                    }}
                    variant="contained"
                    color="success"
                  >
                    Upadate
                  </Button>
                </td>

                <td>
                  {" "}
                  <Button variant="contained" color="error" onClick={() => handleDelete(cat)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };
  const ModelUpdate = () => {
    return (
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-monted-modal-description"
      >
        <Box sx={style}>
          <TextField fullWidth label="nhập loại sách update" />
          <div className="mt-2 ">
            <Button variant="contained">save</Button>
          </div>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Categories />
      <ModelUpdate />
    </>
  );
};
