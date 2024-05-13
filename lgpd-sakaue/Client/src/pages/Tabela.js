import React from 'react';
import TabelaUsuarios from './Components/TabelaUsuarios.js';
import { FaDoorOpen } from "react-icons/fa";
import './index.css';
import { Link } from 'react-router-dom';


function Tabela() {


  return (
    <div className='tela'>

      <div className='tabelaBox'>
        <Link to="/" className='logout'>
          <FaDoorOpen />
        </Link>
        <h2>Tabela de Usuários</h2>
        <TabelaUsuarios />
      </div>
    </div>
  );
}

export default Tabela;
