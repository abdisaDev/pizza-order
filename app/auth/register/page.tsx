'use client';
import { Box, Button, Input, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const registrationFormSchema = z
  .object({
    name: z.string({ message: 'Required' }),
    email: z.string({ message: 'Required' }).email(),
    phone_number: z
      .string({ message: 'Required' })
      .regex(/^(0|\+251|251)(9|7)[0-9]{8}$/, {
        message:
          'Invalid Phone Number, The phone number has to be either safari or ethio telecom',
      }),
    password: z
      .string({ message: 'Required' })
      .min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string({ message: 'Required' }),
    location: z.string({ message: 'Required' }),
    aggrement: z.boolean({ message: 'Please Accept the Terms and Conditions' }),
  })
  .refine((schema) => schema.password === schema.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  });

function AuthRegister() {
  return (
    <>
      <Box width='70%'>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            location: '',
            phone_number: '',
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
                  name='name'
                  label='Name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={Boolean(errors.name && touched.name)}
                  helperText={<span>{touched.name && errors.name}</span>}
                  fullWidth
                />
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
                  value={values.name}
                  error={Boolean(errors.name && touched.name)}
                  helperText={<span>{touched.name && errors.name}</span>}
                  fullWidth
                />
                <TextField
                  name='confirm_password'
                  label='Confirm Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={Boolean(errors.password && touched.password)}
                  helperText={
                    <span>{touched.password && errors.password}</span>
                  }
                  fullWidth
                />
                <TextField
                  name='location'
                  label='Location'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  error={Boolean(errors.location && touched.location)}
                  helperText={
                    <span>{touched.location && errors.location}</span>
                  }
                  fullWidth
                />
                <TextField
                  name='phone_number'
                  label='Phone Numer'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  error={Boolean(errors.phone_number && touched.phone_number)}
                  helperText={
                    <span>{touched.phone_number && errors.phone_number}</span>
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
                <label htmlFor='aggrement'>
                  I accept the term and conditions.
                </label>
              </Box>
              <Box>
                <Button
                  variant='contained'
                  disableElevation
                  fullWidth
                  color='warning'
                >
                  Sign Up
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center', my: 2 }}>
                <Typography>
                  Already have an account{' '}
                  <Link href='/auth/login' style={{ color: '#FB9922' }}>
                    Login
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

export default AuthRegister;
