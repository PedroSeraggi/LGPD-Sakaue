import React, { useState } from 'react';
import './index.css';
import { Formik, Form, Field } from "formik";
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      // Redireciona para a página da tabela após o login bem-sucedido
      navigate('/tabela');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(error.message || 'Senha ou Email incorreto');
    }
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
          {({ isSubmitting }) => ( // Adiciona o parâmetro isSubmitting para verificar se o formulário está sendo submetido
            <Form action="submit" className="formLogin">
              <div className='InputLogin'>
                <i><FaUser /></i>
                <Field name="email" type="email" placeholder='Email' className="form-field" />
              </div>
              <div className='InputLogin'>
                <i><FaLock /></i>
                <Field name="password" type="password" placeholder='Senha' className="form-field" />
              </div>
              <button type="submit" className='BTNLogar' disabled={isSubmitting}> {/* Desabilita o botão de login enquanto o formulário está sendo submetido */}
                {isSubmitting ? 'Conectando...' : 'Conectar'}
              </button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <h5>Não tem conta? <a href="/cadastro">Cadastre-se</a></h5>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse?.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
