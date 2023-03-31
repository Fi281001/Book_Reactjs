import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
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
export const BookTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [book,setBook] = useState([])
  const api="http://localhost:8000/book"

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(api);
      setBook(res);
    };
    getPosts();
  }, []);

  const handleDelete = async (b) => {
    if(confirm(`Bạn có muốn xóa ${b.name} ko?`)){
    await axios.delete(api + "/" + b.id );
    setBook(book.filter((f) => f.id !== b.id));
    }
  };
  const Book =()=>{
  return(
    <>
      <Table striped bordered hover>
      <thead>
        <tr  style={{background:"#6366F1"}} className="text-white">
          <th className='w-20 '>STT</th>
          <th className='w-20 '>Ảnh</th>
          <th className='w-20 '>Name</th>
          <th className='w-20 '>Category</th>
          <th className='w-20 '>Quantity</th>
          <th className='w-20 '>Price</th>
          <th className='w-20 '>Status</th>
          <th className='w-20 '>Detail</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        
       { book.map((book,stt) =>(
        <tr key={book.id}>
          <td>{stt+1}</td>
          <td style={{backgroundImage: `url(${book.img})`, width: "50px", height: "100%", backgroundSize: "cover"}}></td>
          <td>{book.name}</td>
          <td>{book.categoryId}</td>
          <td>{book.quantity}</td>
          <td>{book.price}</td>
          <td>{book.status}</td>
       
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
          <td> <Button variant="contained" color="error" onClick={() => handleDelete(book)}>Delete</Button></td>
        </tr>
        ))}
      </tbody>
    </Table>
             
    </>
  )
       };

  return (
       <>
       <Book/>
       </>         
  );
};
