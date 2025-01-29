import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3002/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('No se pudieron cargar los usuarios');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3002/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('No se pudo eliminar el usuario');
    }
  };

  const handleDownloadPDF = (bufferData, filename) => {
    try {
      const base64Data = bufferData.type === 'Buffer' ? 
        btoa(String.fromCharCode(...new Uint8Array(bufferData.data))) : 
        bufferData;
  
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
  
      const blob = new Blob([byteArray], { type: 'application/pdf' });
  
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'documento.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };
  

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3002/users/${id}/role`,
        { newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, type_user: newRole } : user
        )
      );
    } catch (err) {
      setError('No se pudo cambiar el rol');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3002/users',
        {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          password: newUser.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers([...users, response.data]);
      setShowModal(false);
      setNewUser({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError('No se pudo agregar el usuario');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard - Administrador</h2>
      {error && <div className="error">{error}</div>}

      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={() => setShowModal(true)}>Agregar Usuario</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tipo de Usuario</th>
            <th>PDF</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.type_user}</td>
              <td>
                {user.pdf ? ( 
                  <button
                    onClick={() => {
                      const base64String = user.pdf; 
                      handleDownloadPDF(base64String, `${user.first_name}_${user.last_name}.pdf`);
                    }}                  >
                    Descargar PDF
                  </button>
                ) : (
                  'No disponible'
                )}
              </td>
              <td>
                <button onClick={() => handleRoleChange(user.id, user.type_user === 'administrador' ? 'normal' : 'administrador')}>
                  {user.type_user === 'administrador' ? 'Cambiar a Normal' : 'Cambiar a Administrador'}
                </button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar Usuario</h3>
            <form onSubmit={handleAddUser}>
              <label>Nombre:</label>
              <input
                type="text"
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                required
              />

              <label>Apellido:</label>
              <input
                type="text"
                value={newUser.last_name}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                required
              />

              <label>Email:</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />

              <label>Contraseña:</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
              />

              <label>Repetir Contraseña:</label>
              <input
                type="password"
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                required
              />

              <button type="submit">Agregar</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            min-width: 300px;
          }
          .modal-content form {
            display: flex;
            flex-direction: column;
          }
          .modal-content input {
            margin-bottom: 10px;
          }
          .modal-content button {
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
