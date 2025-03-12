import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css"
import 'font-awesome/css/font-awesome.min.css';

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
      setUsers(users.map(user => 
        user.id === id ? { ...user, is_deleted: true } : user
      ));
    } catch (err) {
      setError('No se pudo eliminar el usuario');
    }
  };

  const restartSoftDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3002/users/${id}/restart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map(user => (user.id === id ? { ...user, is_deleted: false } : user)));
    } catch (err) {
      setError('No se pudo restaurar el usuario');
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "Fecha no disponible";
    const date = new Date(isoDate);
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDownloadPDF = (bufferData, filename) => {
    if (!bufferData) {
      console.error("No hay PDF disponible para descargar.");
      return;
    }

    try {
      const base64Data = bufferData.type === 'Buffer' 
        ? btoa(String.fromCharCode(...new Uint8Array(bufferData.data))) 
        : bufferData;

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
      <div className="dashboard-buttons">
      <button onClick={handleLogout}> <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión</button> </div>
      

      <table>
      <thead>
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tipo de Usuario</th>
            <th colSpan="2">PDF</th>
            <th>Acciones</th>
        </tr>
        <tr>
            <th colSpan="4"></th>
            <th>Fecha</th>
            <th>Enlace</th>
            <th></th>
        </tr>
    </thead>
        <tbody>
        {users.map((user) => (
          Array.isArray(user.pdfs) && user.pdfs.length > 0 ? (
            user.pdfs.map((pdf, index) => (
              <tr key={`${user.id}-${index}`} className={user.is_deleted ? 'deleted-user' : ''}>
                {index === 0 && (
                  <>
                    <td rowSpan={user.pdfs.length}>{user.first_name}</td>
                    <td rowSpan={user.pdfs.length}>{user.last_name}</td>
                    <td rowSpan={user.pdfs.length}>{user.email}</td>
                    <td rowSpan={user.pdfs.length}>{user.type_user}</td>
                  </>
                )}
                <td>{new Date(pdf.uploaded_at).toISOString().slice(0, 16).replace("T", " ")}</td>
                <td>
                  <button
                    onClick={() => {
                      const fullName = `${user.first_name}${user.last_name}`.toLowerCase().replace(/\s/g, '');
                      const formattedDate = formatDate(pdf.uploaded_at);
                      const fileName = `${fullName}_${formattedDate}.pdf`;

                      handleDownloadPDF(pdf.pdf, fileName);
                    }}
                  >
                    Descargar PDF {index + 1}
                  </button>
                </td>
                {index === 0 && (
                  <td rowSpan={user.pdfs.length}>
                    <button onClick={() => handleRoleChange(user.id, user.type_user === 'administrador' ? 'normal' : 'administrador')}>
                      {user.type_user === 'administrador' ? 'Cambiar a Evaluador' : 'Cambiar a Administrador'}
                    </button>
                    {user.is_deleted ? (
                      <button onClick={() => restartSoftDelete(user.id)}>
                        <i className="fa fa-undo"></i>
                      </button>
                    ) : (
                      <button onClick={() => handleDelete(user.id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr key={user.id} className={user.is_deleted ? 'deleted-user' : ''}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.type_user}</td>
              <td colSpan={2}>No disponible</td>
              <td>
                <button onClick={() => handleRoleChange(user.id, user.type_user === 'administrador' ? 'normal' : 'administrador')}>
                  {user.type_user === 'administrador' ? 'Cambiar a Evaluador' : 'Cambiar a Administrador'}
                </button>
                {user.is_deleted ? (
                  <button onClick={() => restartSoftDelete(user.id)}>
                    <i className="fa fa-undo"></i>
                  </button>
                ) : (
                  <button onClick={() => handleDelete(user.id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                )}
              </td>
            </tr>
          )
        ))}
        </tbody>
      </table>
      <br></br>
      <button onClick={() => setShowModal(true)}>Agregar Usuario</button>
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

     
    </div>
  );
};

export default Dashboard;
