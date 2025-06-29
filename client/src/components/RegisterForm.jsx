import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box } from '@mui/material'

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  phone: Yup.string().required('Required').matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
})

export default function RegisterForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ username: '', password: '', phone: '' }}
      validationSchema={RegisterSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Field name="username" as={TextField} label="Username" />
            <ErrorMessage name="username" component="div" />
            
            <Field name="password" type="password" as={TextField} label="Password" />
            <ErrorMessage name="password" component="div" />
            
            <Field name="phone" as={TextField} label="Phone" />
            <ErrorMessage name="phone" component="div" />
            
            <Button type="submit" disabled={isSubmitting} variant="contained">
              Register
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}