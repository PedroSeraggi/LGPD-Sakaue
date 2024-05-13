import React from 'react';
import "../index.css"
import { FaEye, FaTrash, FaPen } from 'react-icons/fa';

class TabelaUsuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [
        { id: 1, nome: 'João', email: 'joao@email.com', cpf: '123.456.789-00' },
        { id: 2, nome: 'Italo', email: 'italo@email.com', cpf: '987.654.321-00' },
        { id: 3, nome: 'Pedro', email: 'pedro@email.com', cpf: '456.789.123-00' }
      ]
    };
  }


  
  render() {
    return (
      <div>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cpf}</td>
                <td>
                  <FaEye className="icone" onClick={() => this.visualizarUsuario(usuario.id)}  />
                  <FaPen className="icone" onClick={() => this.editarUsuario(usuario.id)} />
                  <FaTrash className="icone" onClick={() => this.removerUsuario(usuario.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  visualizarUsuario(id) {
    // Lógica para visualizar usuário
    console.log("Visualizar usuário com ID:", id);
  }

  editarUsuario(id) {
    // Lógica para editar usuário
    console.log("Editar usuário com ID:", id);
  }

  removerUsuario(id) {
    // Lógica para remover usuário
    console.log("Remover usuário com ID:", id);
  }
}




export default TabelaUsuarios;
