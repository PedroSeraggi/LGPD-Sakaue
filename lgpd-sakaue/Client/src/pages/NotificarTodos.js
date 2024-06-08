import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

function NotificarTodos() {
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const sendNotificationToAll = async () => {
        try {
            const response = await fetch('http://localhost:3001/lgpd/users/send-email-to-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject, text }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Emails enviados: ', result.message);
                setSuccessMessage('Emails envidado a todos os usuarios');
            } else {
                console.error('Error enviando os emails: ', result.error);
                setErrorMessage('Error enviando os emails: ' + result.error);
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
                    <button onClick={sendNotificationToAll} className="btnNotificar">Enviar Notificação para Todos</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <Link to="/notificar" className='NotificarTodosText'>
                        Notificar apenas um
                    </Link>
                    <Link to="/tabela" className='voltar'>
                        <FaArrowLeft />
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default NotificarTodos;


