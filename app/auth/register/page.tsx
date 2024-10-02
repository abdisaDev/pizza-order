'use client';
import { FileUpload } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { toFormikValidate, toFormikValidationSchema } from 'zod-formik-adapter';

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
    is_resturant: z.boolean().optional(),
  })
  .refine((schema) => schema.password === schema.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  });

function AuthRegister() {
  const router = useRouter();
  return (
    <Box width='70%'>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirm_password: '',
          location: '',
          phone_number: '',
          aggrement: false,
          is_resturant: false,
          resturant_name: '',
        }}
        onSubmit={async (values) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { confirm_password, ...user } = values;

          await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(user),
          });
          router.push('/dashboard/orders');
        }}
        validate={toFormikValidate(registrationFormSchema)}
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
                label={values.is_resturant ? 'Admin Name' : 'Name'}
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
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(errors.password && touched.password)}
                helperText={<span>{touched.password && errors.password}</span>}
                fullWidth
              />
              <TextField
                name='confirm_password'
                label='Confirm Password'
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirm_password}
                error={Boolean(
                  errors.confirm_password && touched.confirm_password
                )}
                helperText={
                  <span>
                    {touched.confirm_password && errors.confirm_password}
                  </span>
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
                helperText={<span>{touched.location && errors.location}</span>}
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
              {values.is_resturant && (
                <>
                  <TextField
                    name='resturant_name'
                    label='Resturant Name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.resturant_name}
                    error={Boolean(
                      errors.resturant_name && touched.resturant_name
                    )}
                    helperText={
                      <span>
                        {touched.resturant_name && errors.resturant_name}
                      </span>
                    }
                    fullWidth
                  />
                  <Button variant='outlined' color='warning' sx={{ py: 2 }}>
                    <FileUpload />
                    &ensp; Upload Logo
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 2,
                  my: 2,
                }}
              >
                <FormControlLabel
                  id='aggrement'
                  name='aggrement'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.aggrement}
                  control={<Checkbox />}
                  label='I accept the term and conditions.'
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 1,
                  my: 2,
                }}
              >
                <FormControlLabel
                  name='is_resturant'
                  id='is_resturant'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.is_resturant}
                  control={<Checkbox />}
                  label='As Resturant'
                />
              </Box>
            </Box>
            <Box>
              <Button
                variant='contained'
                disableElevation
                fullWidth
                color='warning'
                type='submit'
              >
                Sign Up
              </Button>
            </Box>
            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Typography>
                Already have an account?&ensp;
                <Link href='/auth/login' style={{ color: '#FB9922' }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AuthRegister;
