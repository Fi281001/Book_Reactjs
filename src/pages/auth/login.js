import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import {

  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
//import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';

const Page = () => {
  const router = useRouter();


const [username, setName] = useState('')
const [password, setPassword] = useState('')
console.log({ username, password })
const handleApi = (e) => {
  e.preventDefault()
  console.log({ username, password })
  axios.post('http://localhost:8001/api/v1/auth/login', {
    username: username,
    password: password
  }).then(result => {
    localStorage.setItem("token",result.data.data.accessToken )
    router.push("/")
  }).catch(error => {
      alert('Sai mật khẩu hoặc tài khoản')
      console.log(error)
    })
}

  return (
    <>
      <Head>
        <title>
          Login | Book
        </title>
      </Head>
    <Box
        sx={{
          backgroundColor: '  ',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
          </div> 
          <form>
           <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={username}
                    onChange={(e)=>setName(e.target.value)}
                    style={{marginBottom: "10px"}}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    id={password}
                    value={password}
                  />
                   <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleApi}
                  variant="contained"

                >
                  Continue
                </Button>
                </form>
        </Box>
      </Box> 


    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;