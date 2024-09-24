import { Box, Button, Input } from '@mui/material';

function AuthLogin() {
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
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default AuthLogin;
