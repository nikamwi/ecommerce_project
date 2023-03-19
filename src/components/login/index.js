import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from './LoginForm'

export const Login = () => {
  return (
    <div>
        <LoginForm/>
        <Link to="/register">don't  have an account?</Link>
    </div>
  )
}
