import React, { useEffect, useState } from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
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

  const visualizarUsuario = (id) => {
    // Função para visualizar usuário
  };

  const editarUsuario = (id) => {
    // Função para editar usuário
  };

  const removerUsuario = (id) => {
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
                <FaEye className="icone" onClick={() => visualizarUsuario(usuario._id)} />
                <FaPen className="icone" onClick={() => editarUsuario(usuario._id)} />
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
