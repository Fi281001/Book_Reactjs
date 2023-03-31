import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import {
  Button
} from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const UserTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user,setUser] = useState([])
  const api="http://localhost:8000/user"

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(api);
      setUser(res);
    };
    getPosts();
  }, []);


  const handleDelete = async (u) => {
    if(confirm('Bạn có muốn xóa ko?')){
    await axios.delete(api + "/" + u.id );
    setUser(user.filter((f) => f.id !== u.id));
    }
  };
  const User =()=>{
  return(
    <>
      <Table striped bordered hover>
      <thead>
        <tr  style={{background:"#6366F1"}} className="text-white">
          <th className='w-20 '>STT</th>
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
        
       { user.map((user, index) =>(
        <tr key={user.id}>
          <td>{index+1}</td>

          <td style={{backgroundImage: `url(${user.imguser})`, width: "50px", height: "100%", backgroundSize: "cover"}}></td>
            {/* <img src={user.imguser} style={{, objectFit:"cover"}}/></td> */}
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.address}</td>
          <td>{user.point}</td>
          <td><Button onClick={handleOpen}
      
             
              >
                Detail
          </Button>
          </td>
          <td><Button onClick={handleOpen}
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

  return (
       <>
       <User/>
       </>         
  );
};

