import { Button, FormControl, TextField } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../applications'
import { authenticateUser } from '../../redux';
import { generateLoginFormValues } from './generateLoginFormValues'

export const LoginForm = () => {
  const {
    formValues: loginFormValues, 
    onInputChange: onLoginInputChange,
  } = useForm({
    defaultFormValues: generateLoginFormValues()});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = () => {
      const email = loginFormValues.email.value;
      const password = loginFormValues.password.value;
      dispatch(
        authenticateUser({
          isLogin: true,
          formValues: {
            email, 
            password,
          }, 
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        });
    }; 

  return (
    <FormControl>
      <TextField
      variant="outlined"
      name="email"
      label="email"
      value={loginFormValues.email.values}
      onChange={onLoginInputChange}
      error={!!loginFormValues.email.error}
      helperText={loginFormValues.email.error}
      />
      <TextField
      variant="outlined"
      name="password"
      label="password"
      value={loginFormValues.password.values}
      onChange={onLoginInputChange}
      error={!!loginFormValues.password.error}
      helperText={loginFormValues.password.error}
      />
      <Button onClick={onLogin}>login</Button>
    </FormControl>
  )
}
