import React, { useState, useEffect, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';  
import { useLocation } from 'react-router-dom';
import PDFDocument from '../components/PDFDocument';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

function PDFCreate() {
  const [content, setContent] = useState(null);
  const API_BASE_URL = 'http://localhost:3002';
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId || 8;
  const option = location.state?.option || 'option1';
  const pdfGenerated = useRef(false);

  useEffect(() => {
    if (!projectId || pdfGenerated.current) {
      console.error('No se proporcionó projectId en el estado de navegación.');
      return;
    }

    const updateScore = async () => {
      try {
        console.log(`Actualizando puntaje del proyecto con ID: ${projectId}`);
        await axios.get(`${API_BASE_URL}/projects/${projectId}/update-score`);
        console.log('Puntaje actualizado correctamente.');
      } catch (error) {
        console.error('Error al actualizar el puntaje del proyecto:', error);
      }
    };

    const fetchData = async () => {
      try {
        console.log('Iniciando solicitud para obtener datos con projectId:', projectId);

        const [projectResponse, membersResponse, questionsResponse, answersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/projects/${projectId}`),
          fetch(`${API_BASE_URL}/project-members`),
          fetch(`${API_BASE_URL}/questions`),
          fetch(`${API_BASE_URL}/answers`),
        ]);

        if (!projectResponse.ok || !membersResponse.ok || !questionsResponse.ok || !answersResponse.ok) {
          throw new Error('Error al obtener datos desde el servidor');
        }

        const [project, members, questions, answers] = await Promise.all([
          projectResponse.json(),
          membersResponse.json(),
          questionsResponse.json(),
          answersResponse.json(),
        ]);

        const filteredMembers = members.filter(member => member.project?.id === projectId).map(member => member.memberName);
        const filteredAnswers = answers.filter(answer => answer.project?.id === projectId);

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
              observation: answer?.observation || ' ',
            };
          }),
        };

        setContent(newContent);
       
        if (!pdfGenerated.current) {
          pdfGenerated.current = true;
          await generateAndSendPDF(newContent);
        }

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    const updateAndFetchData = async () => {
      await updateScore(); 
      await fetchData();
    };
  
    updateAndFetchData();
  }, [projectId]);

  const generateAndSendPDF = async (content) => {
    try {
      const pdfBlob = await pdf(<PDFDocument content={content} option={option} />).toBlob();

      console.log(' PDF generado:', pdfBlob);

      const pdfBuffer = await pdfBlob.arrayBuffer();

      await uploadPdf(pdfBuffer);

    } catch (error) {
      console.error('Error al generar o enviar el PDF:', error);
    }
  };

  const uploadPdf = async (pdfBuffer) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token en el localStorage');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; 

    try {

      const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

      const formData = new FormData();
      formData.append('pdf', pdfBlob, 'evaluation.pdf');

      console.log('Enviando FormData:', formData.get('pdf'));

      const response = await axios.post(
        `${API_BASE_URL}/user-pdfs/${userId}/upload`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('PDF enviado correctamente:', response.data);
    } catch (error) {
      console.error('Error al enviar el PDF:', error);
    }
  };

  const handleContinue = () => {
    navigate('/inicio');
  };
  return (
    <div style={{ height: '100vh' }}>
      {content ? (
        <>
        <p>Gracias por completar la evaluación. El PDF se está guardando.</p>
        <button onClick={handleContinue}>Continuar</button>
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default PDFCreate;
