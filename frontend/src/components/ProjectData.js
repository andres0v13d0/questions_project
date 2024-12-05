import { FaPlus } from 'react-icons/fa';
import "../App.css";

function ProjectData() {
    return (
        <div className='data-container'>
            <h2>Agregar nuevo proyecto</h2>
            <p><b> INDICACIONES: </b> Los proyectos para su aprobación y ejecución deberán completar un mínimo de 80 puntos.</p>
            <form action="post">
                <fieldset className='project-title'>
                    <legend>Título del proyecto</legend>
                    <input type="text" id="titulo" name="titulo" placeholder='Título del proyecto' required />
                </fieldset>

                <fieldset className='coor-name'>
                    <legend>Nombre del coordinador</legend>
                    <input type="text" id="coordinador" name="coordinador" placeholder='Nombre del coordinador' required />
                </fieldset>

                <h1 id='label'>Integrantes:</h1>
                <div className='members'>
                    <fieldset className='int-names'>
                        <legend>Nombre del integrante</legend>
                        <input type="text" name="integrantes" placeholder="Nombre del integrante" required />
                    </fieldset>

                    <button type="button" id="add-member"><FaPlus/></button>
                </div>
            </form>
        </div>
    );
  }
  
  export default ProjectData;