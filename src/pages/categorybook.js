import Head from 'next/head';
import { useCallback, useMemo, useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/book/book-table';
import { CategorySearch } from 'src/sections/category/category-search';
import {CategoryTable} from 'src/sections/category/category-table';


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
  return (
    <>
    <Head>
      <title>
        Categorybook | Book
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
                Categorybook
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
          <CategorySearch/>
          <CategoryTable/> 
        </Stack>
      </Container>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-monted-modal-description"
      >
        <Box sx={style}>
        <TextField fullWidth label="nhập mã loại "  />
        <div className='mt-2 '></div  >
          <TextField fullWidth label="nhập loại sách"  />
          <div className='mt-2 '>
              <Button 

                variant="contained"
              >
                save
              </Button>
            </div>
        </Box>
      </Modal>
    </Box>
    
  </>

  ) 
  };

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
