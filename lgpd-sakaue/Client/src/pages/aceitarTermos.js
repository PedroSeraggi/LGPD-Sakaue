import './index.css'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function AceitarTermos() {
  const [terms, setTerms] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const userData = location.state.userData;

  const navigate = useNavigate();

  const fetchTerms = async () => {
    try {
      const response = await fetch('http://localhost:3001/lgpd/terms/termsList');
      if (!response.ok) {
        throw new Error('Erro ao buscar os termos.');
      }
      const data = await response.json();
      setTerms(data);
    } catch (error) {
      console.error('Erro ao buscar termos:', error);
      setError(error.message || 'Erro ao buscar os termos.');
    }
  };

useEffect(() => {
  fetchTerms();
  console.log(userData.email);
  if (userData && userData.email && userData.password) {
  
  }
}, [userData]);


const email = userData.email


  const handleAceitarTermo = async (userData, actions) => {
    try {
      const response = await fetch(`http://localhost:3001/lgpd/users/registerTermoUsuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
  
      if (response.status === 201) {
        alert('Termo atualizado com sucesso!');
        navigate('/');
      } else {
        alert('Erro ao aceitar os termos ');
      }
    } catch (error) {
      console.error('Erro ao aceitar termos:', error);
      alert('Erro ao aceitar termos'); 
    }
  };
  






  const handleCancelar = () => {
    navigate('/');
  };

  return (
    <div className='tela'>
      <div className="termos">
      <h2>Termos e Condições</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <React.Fragment>
          <p>Os termos e condições do site foram atualizado</p>
          <p>é necessario que aceite-os novamente</p>
          {terms.map((term, index) => (
            <div className="Termo" key={index}>
              <h3>{term.title}</h3>
              <p className='term-disc'>{term.desc}</p>
            </div>
          ))}
          <div className='center'>
            <button className="BTNcancelar" onClick={handleCancelar}>Cancelar</button>
            <button className="BTNaceitar" onClick={handleAceitarTermo}>Aceitar</button>
          </div>
        </React.Fragment>
       
      )}
       </div>
    </div>
  );
}

export default AceitarTermos;
