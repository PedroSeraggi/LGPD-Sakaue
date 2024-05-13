import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './pages/Login';
import CadastroLogin from './pages/CadastroLogin';
import Tabela from './pages/Tabela';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
     
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroLogin />} />
        <Route path="/tabela" element={<Tabela />} />
 
      </Routes>

    </Router>
  </React.StrictMode>,
  rootElement
);