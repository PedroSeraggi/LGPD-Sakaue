import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import CadastroLogin from './pages/CadastroLogin';
import Tabela from './pages/Tabela';
import Termo from './pages/CadastroTermo';
import AceitarTermos from './pages/aceitarTermos';
import Perfil from './pages/Perfil.js';

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
            <Route path="/aceitarTermos" element={<AceitarTermos />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </Router>
 
    </GoogleOAuthProvider>
  </React.StrictMode>,
  rootElement
);
