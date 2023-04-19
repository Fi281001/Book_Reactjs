import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
//import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';
import { margin } from '@mui/system';
import { mt } from 'date-fns/locale';
const Page = () => {
  const router = useRouter();
  // const auth = useAuth();
  // const [method, setMethod] = useState('email');
  // const formik = useFormik({
  //   initialValues: {
  //     email: 'pctrung2',
  //     password: 'zxc123456',
  //     submit: null
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup
  //       .string()
  //       .email('Must be a valid email')
  //       .max(255)
  //       .required('Email is required'),
  //     password: Yup
  //       .string()
  //       .max(255)
  //       .required('Password is required')
  //   }),
  //   onSubmit: async (values, helpers) => {
  //     try {
  //       await auth.signIn(values.email, values.password);
  //       router.push('/');
  //     } catch (err) {
  //       helpers.setStatus({ success: false });
  //       helpers.setErrors({ submit: err.message });
  //       helpers.setSubmitting(false);
  //     }
  //   }
  // });

  // const handleMethodChange = useCallback(
  //   (event, value) => {
  //     setMethod(value);
  //   },
  //   []
  // );

  // const handleSkip = useCallback(
  //   () => {
  //     auth.skip();
  //     router.push('/');
  //   },
  //   [auth, router]
  // );

const [username, setName] = useState('')
const [password, setPassword] = useState('')
console.log({ username, password })
const [admin,setAdmin] = useState([])
const [token,setToken] = useState([])
const handleApi = (e) => {
  e.preventDefault()
  console.log({ username, password })
  axios.post('http://localhost:8001/api/v1/auth/login', {
    username: username,
    password: password
  }).then(result => {
    console.log(result.data)
    
   
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
          justifyContent: 'center'
          
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
          {/*   {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
               
              </form>
            )}*/}
          </div> 
          <form>
           <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={username}
                    onChange={(e)=>setName(e.target.value)}
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