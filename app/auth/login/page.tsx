'use client';
import { Box, Button, Input, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const registrationFormSchema = z.object({
  email: z.string({ message: 'Required' }).email(),
  password: z
    .string({ message: 'Required' })
    .min(8, 'Password must be at least 8 characters long'),
});

function AuthLogin() {
  return (
    <>
      <Box width='70%'>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={() => {}}
          validationSchema={toFormikValidationSchema(registrationFormSchema)}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            errors,
            values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  mt: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 2,
                }}
              >
                <TextField
                  name='email'
                  label='Email address'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(errors.email && touched.email)}
                  helperText={<span>{touched.email && errors.email}</span>}
                  fullWidth
                />
                <TextField
                  name='password'
                  label='Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={Boolean(errors.password && touched.password)}
                  helperText={
                    <span>{touched.password && errors.password}</span>
                  }
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 2,
                  my: 2,
                }}
              >
                <Input type='checkbox' id='aggrement' name='aggrement' />
                <label htmlFor='aggrement'>Remeber Me</label>
              </Box>
              <Box>
                <Button
                  variant='contained'
                  disableElevation
                  fullWidth
                  color='warning'
                >
                  Login
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center', my: 2 }}>
                <Typography>
                  Have not an account?&ensp;
                  <Link href='/auth/regiser' style={{ color: '#FB9922' }}>
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default AuthLogin;
