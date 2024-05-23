import React, { useEffect, useState } from 'react';
import '../index.css'; 

const TermsModal = ({ isOpen, onClose }) => {
  const [terms, setTerms] = useState([]);

  const fetchTerms = async () => {
    try {
      const response = await fetch('http://localhost:3001/lgpd/terms/termsList');
      const data = await response.json();
      setTerms(data);
    } catch (error) {
      console.error('Erro ao buscar termos:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTerms();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Termos e Condições</h2>
        <p>Aqui estão os termos e condições:</p>
        {terms.map((term, index) => (
          <div  className="TermoBox" key={index}>
            <h3>{term.title}</h3>
            <p className='term-disc'>{term.desc}</p>
          </div>
        ))}
        <div className='center'>
        <button onClick={onClose} className="BTNfechar">X</button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
