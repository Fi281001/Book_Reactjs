import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { BookTable } from 'src/sections/book/book-table';
import { BookSearch } from 'src/sections/book/book-search';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios, { Axios } from 'axios'; 

const now = new Date();
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

const Page = () => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 // const [id, setID] = useState()
  const [name, setName] = useState("")
  const [categoryId, setCategory] = useState()
  const [quantity, setQuantity] = useState()
  const [price, setPrice] = useState()
  const [status,setSatus] = useState('')
  const [img, setImage] = useState("");
  function load(){

    location.reload();
}
const uploadImage = async (e) => {
  const file = e.target.files[0];
  const base64 = await convertBase64(file);
  setImage(base64);
};
// chuyển file ảnh thành base 64
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
  const api="http://localhost:8000/book";

  const Postdata = (e)=>{
    
    if(name == "" || categoryId =="" || price == "" || quantity=="" || status=="" ){
         alert("xin nhập đầy đủ")
         return handleClose()
       }
    else{
        axios.post(api,{
          name,
          categoryId,
          quantity,
          price,
          status,
          img
        }).then(res => {
         load()
         console.log(res);
        }).catch(err => console.log(err))
  }
  }
  return (
    
    <>
      <Head>
        <title>
          Book | BOOK
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Book
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
              <div>
              <Button onClick={handleOpen}
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add
              </Button>
              </div>
            </Stack>
            {/* <BookSearch/> */}
            <BookTable
            />
          </Stack>
        </Container>
      </Box>
      <div>
  
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <input
        onChange={
          uploadImage
        }
        multiple
        type="file"
        name='img'
      />
        <TextField className='mb-2' fullWidth label="nhập tên sách" type="text" name='name' value={name} onChange={(e)=> setName(e.target.value)} />
        <TextField className='mb-2' fullWidth label="nhập mã loại" type="number" name='categoryId' value={categoryId} onChange={(e)=> setCategory((e.target.value)*1)} />
        <TextField className='mb-2' fullWidth label="nhập số lượng" type="number" name='quantity' value={quantity} onChange={(e)=> setQuantity((e.target.value)*1)} />
        <TextField className='mb-2' fullWidth label="nhập giá" ype="number" name='price' value={price} onChange={(e)=> setPrice((e.target.value)*1)} />
        <TextField className='mb-2' fullWidth label="nhập trạng thái" type="text" name='status' value={status} onChange={(e)=> setSatus(e.target.value)} />
          <div className='mt-2 '>
              <Button 
                onClick={Postdata}
                variant="contained"
              >
                save
              </Button>
            </div>
         
        </Box>
      </Modal>
    </div>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
