import axios from "axios";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {
  Button,
  Box
} from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  // boxShadow: 24,
  p: 4,
};

export const UserTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);
  const [user,setUser] = useState([])
  const [paginatedUser,setpaginatedUser] = useState([]);
  const [curren, setcurren] = useState(1)
  const pageSize = 5;
  const api="http://localhost:8000/user"
  // hien thi san pham
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(api);
      setUser(res.data);
      setpaginatedUser(_(res.data).slice(0).take(pageSize).value());
    };
    getPosts();
  }, []);

  const pageCount = user? Math.ceil(user.length/pageSize) :0
  if(pageCount === 1) return null;
  const pages = _.range(1,pageCount+1)

  const pagination= (pagenumber)=>{
    setcurren(pagenumber);
    const startindex = (pagenumber -1) * pageSize;
    const paginatedUser = _(user).slice(startindex).take(pageSize).value();
    setpaginatedUser(paginatedUser)
  }

  //xoa
  const handleDelete = async (u) => {
    if(confirm(`Bạn có muốn xóa ${u.name} ko?`)){
    await axios.delete(api + "/" + u.id ); 
    setpaginatedUser(paginatedUser.filter((f) => f.id !== u.id));
    setUser(user.filter((f) => f.id !== u.id));
    }
  };
  const User =()=>{
  return(

    <>
      <Table striped bordered hover>
      <thead>
        <tr  style={{background:"#6366F1"}} className="text-white">
          
          <th className='w-20 '>Ảnh</th>
          <th className='w-20 '>Name</th>
          <th className='w-20 '>Phone</th>
          <th className='w-20 '>Email</th>
          <th className='w-20 '>address</th>
          <th className='w-20 '>point</th>
          <th className='w-20 '>Detail</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        
       { paginatedUser.map((user) =>(
        <tr key={user.id}>
          <td style={{backgroundImage: `url(${user.imguser})`, width: "50px", height: "100%", backgroundSize: "cover"}}></td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.address}</td>
          <td>{user.point}</td>
          <td><Button onClick={handleOpenDetail}
              >
                Detail
          </Button>
          </td>
          <td><Button onClick={
            handleOpen
          } 
              variant="contained" color="success"
              >
                Upadate
          </Button>

          </td>
          <td> <Button variant="contained" color="error" onClick={() => handleDelete(user)}>Delete</Button></td>
        </tr>
        ))}
      </tbody>
    </Table>
   
    </>
  )
       };
  const ModelUpdate = ()=>{

    return (
        <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-monted-modal-description"
              >
              <Box sx={style}>
                
                  <TextField fullWidth label="nhập loại sách update"  />
                  <div className='mt-2 '>
                      <Button 
                        variant="contained"
                      >
                        save
                      </Button>
                    </div>
                </Box>
              </Modal>
    )
  }
  const ModelDetail = ()=>{

    return (
      <Modal
        keepMounted
        open={openDetail}
        onClose={handleCloseDetail}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-monted-modal-description"
      >
      <Box sx={style}>

          
        </Box>
      </Modal>
    )
  }
  const Page = ()=>{
    return(
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {
            pages.map((page,key)=>
            <li className={
              page === curren? "page-item active" : "page-item"
            } key={page}>
              <a className="page-link" onClick={()=>pagination(page) }>{page}</a></li>
            )
          }
        </ul>
      </nav>
    )
  }
  return (
       <>
       <User/>
       <ModelUpdate/> 
       <ModelDetail/>
       <Page/>
       </>         
  );
};

