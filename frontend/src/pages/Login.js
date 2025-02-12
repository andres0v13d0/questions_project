import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.accessToken);
      navigate(response.data.redirectUrl);
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <h2 className="title">Sistema de Evaluación de Proyectos</h2>
            <h2>Iniciar sesión</h2>
            <label htmlFor="email" className={email ? 'active' : ''}>
              <span className="floating-label">Correo</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Introduce tu email"
              />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="password" className={password ? 'active' : ''}>
              <span className="floating-label">Contraseña</span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Introduce tu contraseña"
              />
            </label>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
