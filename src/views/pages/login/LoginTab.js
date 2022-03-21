import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledAlert,
} from 'reactstrap';
import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { FieldErrorMessage } from '../../../genui';
import { Navigate } from 'react-router-dom';
import LogInManager from './LoginManager';

function LoginForm(props) {
  if (props.loginSuccess || props.user) {
    return <Navigate to="/"/>
  }

  return  (
    <Container>
      <h2>Login</h2>
      {
        props.apiErrors.map((err, index) => <UncontrolledAlert key={index} color="danger">{err}</UncontrolledAlert>)
      }
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required."),
          password: Yup.string().required("Password is required."),
        })}
        onSubmit={props.onSubmit}
      >
        {
          formik => (
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Field name="username" as={Input} type="text" placeholder="Username" />
              </FormGroup>
              <FieldErrorMessage name="username"/>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Field as={Input} type="password" name="password" placeholder="Password" />
              </FormGroup>
              <FieldErrorMessage name="password"/>

              <Button type="submit" color="primary" disabled={props.submittingLoginRequest}>Login</Button>
            </Form>
          )
        }
      </Formik>
    </Container>
  )
}

export default function LoginTab(props) {
  return (
    <Container>
      <LogInManager {...props} component={LoginForm} />
    </Container>
  )
}