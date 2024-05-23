import React, { useEffect, useState } from 'react';
import {FaPen, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import '../index.css';

const TabelaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/lgpd/users/usersList');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

 

  const editarUsuario = async (id, name, email, cpf) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Editar Usuário',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Nome" value="${name}">
          <input id="swal-input2" class="swal2-input" placeholder="Email" value="${email}">
          <input id="swal-input3" class="swal2-input" placeholder="CPF" value="${cpf}">
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
        const response = await fetch(`http://localhost:3001/lgpd/users/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });
  
        if (response.ok) {
          fetchUsuarios();
          Swal.fire(
            'Atualizado!',
            'As informações do usuário foram atualizadas.',
            'success'
          );
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
            setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== id));
            Swal.fire(
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.cpf}</td>
              <td>
                
                <FaPen className="icone" onClick={() => editarUsuario(usuario._id, usuario.name, usuario.email, usuario.cpf)} />
                <FaTrash className="icone" onClick={() => removerUsuario(usuario._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaUsuarios;
