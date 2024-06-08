import React, { useState } from 'react';
import './index.css';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Notificar() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sendNotification = async () => {
        try {
            const response = await fetch('http://localhost:3001/lgpd/users/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, subject, text }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Email enviado: ', result.message);
            } else {
                console.error('Error ao enviar email: ', result.error);
                setErrorMessage('Error ao enviar email: ' + result.error);
            }
        } catch (error) {
            console.error('Error: ', error);
            setErrorMessage('Error: ' + error.toString());
        }
    };

    return (
        <div className='tela'>
            <div className='perfilBox'>
                <div className="notificar">
                    <h1>Enviar Notificação</h1>
                    <input
                        type="email"
                        placeholder="Destinatário"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="form-field"
                    />
                    <input
                        type="text"
                        placeholder="Assunto"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="form-field"
                    />
                    <textarea
                        placeholder="Mensagem"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="form-field"
                    />
                    <button onClick={sendNotification} className="btnNotificar" >Enviar Notificação</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
                <Link to="/tabela" className='voltar'>
                    <FaArrowLeft />
                </Link>
                <Link to="/notificarTodos" className='NotificarTodosText'>
                    Notificar Todos
                </Link>
            </div>
        </div>
    );
}

export default Notificar;
