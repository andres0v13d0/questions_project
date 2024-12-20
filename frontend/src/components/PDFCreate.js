import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import PDFDocument from './PDFDocument';

const PDFCreate = () => {
  const location = useLocation();
  const { projectId } = location.state || {}; // Obtén el projectId desde el estado
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtén los datos del proyecto
        const projectResponse = await fetch(`http://localhost:3002/projects/${projectId}`);
        const project = await projectResponse.json();

        // Obtén todos los miembros del proyecto
        const membersResponse = await fetch('http://localhost:3002/project-members');
        const members = await membersResponse.json();
        const filteredMembers = members.filter(member => member.projectId === projectId);

        // Obtén todas las preguntas
        const questionsResponse = await fetch('http://localhost:3002/questions');
        const questions = await questionsResponse.json();

        // Obtén todas las respuestas
        const answersResponse = await fetch('http://localhost:3002/answers');
        const answers = await answersResponse.json();
        const filteredAnswers = answers.filter(answer => answer.projectId === projectId);

        // Construye el contenido para el PDF
        const newContent = {
          projectName: project.name,
          coordinator: project.coordinator,
          score: project.score,
          status: project.status,
          members: filteredMembers.map(member => member.memberName),
          questions: questions.map(question => ({
            questionId: question.id,
            response: filteredAnswers.find(answer => answer.questionId === question.id)?.response || '0',
          })),
        };

        setContent(newContent);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  if (!content) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ height: '100vh' }}>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <PDFDocument content={content} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFCreate;
