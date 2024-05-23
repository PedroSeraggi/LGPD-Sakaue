import React, { useState } from 'react';
import './index.css';
import { Formik, Form, Field } from "formik";
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const response = await fetch(`http://localhost:3001/lgpd/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      } else {
        navigate('/tabela');
      }

    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Senha ou Email incorreto');
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Handle the Google response here. You can send the token to your backend for further verification.
  };

  return (
    <div className='tela'>
      <div className='loginBox'>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values);
            setSubmitting(false);
          }}
        >
          <Form action="submit" className="formLogin">
            <div className='InputLogin'>
              <i><FaUser /></i>
              <Field name="email"
                type="email"
                placeholder='Email'
                className="form-field" />
            </div>

            <div className='InputLogin'>
              <i><FaLock /></i>
              <Field name="password"
                type="password"
                placeholder='Senha'
                className="form-field" />
            </div>

            <button type="submit" className='BTNLogar'>Conectar</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <h5>Não tem conta? <a href="/cadastro">Cadastre-se</a></h5>
          </Form>
        </Formik>
        <GoogleLogin
          onSuccess={credentialResponse => {
            responseGoogle(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
}

export default Login;
