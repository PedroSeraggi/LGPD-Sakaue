import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import CadastroLogin from './pages/CadastroLogin';
import Tabela from './pages/Tabela';
import Termo from './pages/CadastroTermo';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId="852375122055-tkkqaekmktssb0dgqbeolbdjt6bl255t.apps.googleusercontent.com">
      <Router>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<CadastroLogin />} />
          <Route path="/tabela" element={<Tabela />} />
          <Route path="/termo" element={<Termo />} />

        </Routes>

      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  rootElement
);