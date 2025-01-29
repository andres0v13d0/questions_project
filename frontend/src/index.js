  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import './index.css';
  import App from './App.js'
  import Inicio from './pages/Inicio.js';
  import Login from './pages/Login.js';
  import Dashboard from './pages/Dashboard.js';
  import PDFCreate from './pages/PDFCreate.js';
  import reportWebVitals from './reportWebVitals';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/add-project" element={<App />} />
        <Route path="/pdf-create" element={<PDFCreate />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
