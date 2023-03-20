import { Button, FormControl, TextField } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../applications'
import { authenticateUser } from '../../redux';
import { generateRegisterFormValues } from './generateRegisterFormValues'

export const RegisterForm = () => {
  const {
    formValues: registerFormValues, 
    onInputChange: onRegisterInputChange,
  } = useForm({
    defaultFormValues: generateRegisterFormValues()
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onRegister = () => {
    const firstName = registerFormValues.firstName.value;
    const lastName = registerFormValues.lastName.value;
    const email = registerFormValues.email.value;
    const password = registerFormValues.password.value;
    dispatch(
      authenticateUser({
        isLogin: false,
        formValues: {
          firstName,
          lastName,
          email,
          password,
        },
      })
    )
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <FormControl>
      <TextField
      variant="outlined"
      name="firstName"
      label="firstName"
      value={registerFormValues.firstName.values}
      onChange={onRegisterInputChange}
      error={!!registerFormValues.firstName.error}
      helperText={registerFormValues.firstName.error}
      />
      <TextField
      variant="outlined"
      name="lastName"
      label="lastName"
      value={registerFormValues.lastName.values}
      onChange={onRegisterInputChange}
      error={!!registerFormValues.lastName.error}
      helperText={registerFormValues.lastName.error}
      />
      <TextField
      variant="outlined"
      name="email"
      label="email"
      value={registerFormValues.email.values}
      onChange={onRegisterInputChange}
      error={!!registerFormValues.email.error}
      helperText={registerFormValues.email.error}
      />
      <TextField
      variant="outlined"
      name="password"
      label="password"
      value={registerFormValues.password.values}
      onChange={onRegisterInputChange}
      error={!!registerFormValues.password.error}
      helperText={registerFormValues.password.error}
      type="password"
      />
      <Button onClick={onRegister}>register</Button>
    </FormControl>
  )
}
