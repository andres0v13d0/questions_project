import { FaPlus } from 'react-icons/fa';
import "../App.css";
import { useEffect, useState } from 'react';

function ProjectData({ onProjectSubmit }) {

    const [title, setTitle] = useState("");
    const [coordinator, setCoordinator] = useState("");
    const [members, setMembers] = useState([""]);

    const handleAddMember = () => {
        setMembers([...members, ""]);
    };

    const handleMemberChange = (index, value) => {
        const updatedMembers = [...members];
        updatedMembers[index] = value;
        setMembers(updatedMembers);
    };

    useEffect(() => {
        const project = {
        name: title,
        coordinator,
        };
        onProjectSubmit(project, members);
    }, [title, coordinator, members, onProjectSubmit]);


    return (
        <div className="data-container">
          <h2>Agregar nuevo proyecto</h2>
          <p><b>INDICACIONES:</b> Los proyectos para su aprobación y ejecución deberán completar un mínimo de 80 puntos.</p>
          <form>
            <fieldset className="project-title">
              <legend>Título del proyecto</legend>
              <input
                type="text"
                placeholder="Título del proyecto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="coor-name">
              <legend>Nombre del coordinador</legend>
              <input
                type="text"
                placeholder="Nombre del coordinador"
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
                required
              />
            </fieldset>
            <h1 id="label">Integrantes:</h1>
            <div className='members'>
                {members.map((member, index) => (
                <fieldset className="int-names" key={index}>
                    <legend>Nombre del integrante</legend>
                    <input
                    type="text"
                    placeholder="Nombre del integrante"
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    required
                    />
                </fieldset>
                ))}
                <button type="button" id="add-member" onClick={handleAddMember}>
                <FaPlus />
                </button>
            </div>
          </form>
        </div>
    );
  }
  
  export default ProjectData;