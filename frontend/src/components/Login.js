import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

function Login() {
  const navigate = useNavigate();  // Usar useNavigate para redirigir

  const handleLogin = () => {
    // Redirigir a la ruta de inicio
    navigate('/');
  };

  return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="/assets/decanato-logo.png"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Somos el equipo Lotus</h4>
            </div>

            <p>Por favor, inicia sesión en tu cuenta</p>

            <MDBInput wrapperClass='mb-4' label='Correo electrónico' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Contraseña' id='form2' type='password'/>

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleLogin}>Iniciar sesión</MDBBtn>
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">Sistema de Evaluación de Proyectos</h4>
              <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
