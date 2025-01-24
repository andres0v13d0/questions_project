import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import PDFDocument from './PDFDocument';

function PDFCreate() {
  const [content, setContent] = useState(null);
  const API_BASE_URL = 'http://localhost:3002';

  // Obteniendo projectId desde el estado
  const location = useLocation();
  const projectId = location.state?.projectId || 1;
 
  useEffect(() => {
    if (!projectId) {
      console.error('No se proporcionó projectId en el estado de navegación.');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Iniciando solicitud para obtener datos con projectId:', projectId);

        const [projectResponse, membersResponse, questionsResponse, answersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/projects/${projectId}`),
          fetch(`${API_BASE_URL}/project-members`),
          fetch(`${API_BASE_URL}/questions`),
          fetch(`${API_BASE_URL}/answers`),
        ]);

        // Verificando el estado de las respuestas
        if (!projectResponse.ok) console.error('Error en projectResponse');
        if (!membersResponse.ok) console.error('Error en membersResponse');
        if (!questionsResponse.ok) console.error('Error en questionsResponse');
        if (!answersResponse.ok) console.error('Error en answersResponse');

        if (!projectResponse.ok || !membersResponse.ok || !questionsResponse.ok || !answersResponse.ok) {
          throw new Error('Error al obtener datos desde el servidor');
        }

        const [project, members, questions, answers] = await Promise.all([
          projectResponse.json(),
          membersResponse.json(),
          questionsResponse.json(),
          answersResponse.json(),
        ]);

        // Debugging de datos obtenidos
        console.log('Datos del proyecto:', project);
        console.log('Miembros del proyecto:', members);
        console.log('Preguntas:', questions);
        console.log('Respuestas:', answers);

        // Filtrar miembros y respuestas por projectId
        const filteredMembers = members
          .filter(member => member.project?.id === projectId)
          .map(member => member.memberName);

        console.log('Miembros filtrados:', filteredMembers);

        const filteredAnswers = answers.filter(answer => answer.project?.id === projectId);
        console.log('Respuestas filtradas:', filteredAnswers);

        // Construcción del contenido del PDF
        const newContent = {
          projectName: project.name || 'Nombre no disponible',
          coordinator: project.coordinator || 'Coordinador no disponible',
          score: project.score || 0,
          status: project.status || 'Sin estado',
          members: filteredMembers,
          questions: questions.map(question => {
            const answer = filteredAnswers.find(answer => answer.question?.id === question.id);
            return {
              questionId: question.id,
              content: question.content,
              response: answer?.response || '0',
              observation: answer?.observation || ' ', // Agregado aquí
            };
          }),
        };

        console.log('Contenido construido para el PDF:', newContent);
        setContent(newContent);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [projectId]); // Se ejecutará el efecto cuando cambie el projectId

  return (
    <div style={{height:'100vh'}}>
      {content ? (
        <PDFViewer width="100%" height='100%'>
          <PDFDocument content={content} />
        </PDFViewer>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default PDFCreate;
