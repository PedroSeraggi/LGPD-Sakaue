import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import './index.css';
import Swal from 'sweetalert2';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Perfil() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log("Email do localStorage:", email); // Adicionando para debug

    fetch(`http://localhost:3001/lgpd/users/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Erro ao obter dados do perfil:", error));
  }, []);


  const editarUsuario = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Editar Usuário',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Nome" value="${userData.name}">
          <input id="swal-input2" class="swal2-input" placeholder="Email" value="${userData.email}">
          <input id="swal-input3" class="swal2-input" placeholder="CPF" value="${userData.cpf}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const name = document.getElementById('swal-input1').value;
          const email = document.getElementById('swal-input2').value;
          const cpf = document.getElementById('swal-input3').value;
          if (!name || !email || !cpf) {
            Swal.showValidationMessage('Por favor, preencha todos os campos');
            return false;
          }
          return { name, email, cpf };
        }
      });

      if (formValues) {
        const response = await fetch(`http://localhost:3001/lgpd/users/update/${userData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          Swal.fire(
            'Atualizado!',
            'As informações do usuário foram atualizadas.',
            'success'
          );

          fetch(`http://localhost:3001/lgpd/users/perfil/${userData.email}`)
            .then((response) => response.json())
            .then((data) => {
              setUserData(data);
            })
            .catch((error) => console.error("Erro ao obter dados do perfil:", error));
        } else {
          console.error('Erro ao atualizar usuário:', response.statusText);
          Swal.fire(
            'Erro!',
            'Houve um problema ao atualizar as informações do usuário.',
            'error'
          );
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      Swal.fire(
        'Erro!',
        'Houve um problema ao atualizar as informações do usuário.',
        'error'
      );
    }
  };




  const removerUsuario = async (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete isso!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3001/lgpd/users/delete/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            Swal.fire(
              navigate('/tabela'),
              'Deletado!',
              'O usuário foi deletado.',
              'success'
              
            );
          } else {
            console.error('Erro ao remover usuário:', response.statusText);
            Swal.fire(
              'Erro!',
              'Houve um problema ao deletar o usuário.',
              'error'
            );
          }
        } catch (error) {
          console.error('Erro ao remover usuário:', error);
          Swal.fire(
            'Erro!',
            'Houve um problema ao deletar o usuário.',
            'error'
          );
        }
      }
    });
  };


  return (
    <div className='tela'>
      <div className='perfilBox'>
        <h1>Perfil</h1>
        <h1 className='icon'> <FaUser /></h1>
        {userData ? (
          <div>
            <p>Nome: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>CPF: {userData.cpf}</p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <button onClick={editarUsuario} className="btnNotificar" >Editar</button>
        {/* Passando uma função de callback para onClick */}
        <button onClick={() => removerUsuario(userData._id)} className="btnNotificar" >Deletar</button>
      </div>
      <Link to="/tabela" className='voltar'>
                        <FaArrowLeft />
                    </Link>
    </div>
  );
}
export default Perfil;
