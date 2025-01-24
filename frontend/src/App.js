import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectData from "./components/ProjectData";
import Item from "./components/Item";
import Header from "./section/Header";
import "./App.css";
import { FaArrowAltCircleRight } from "react-icons/fa";

function App() {

  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null); 
  const [projectMembers, setProjectMembers] = useState([]); 
  const [answers, setAnswers] = useState([]);
  const [projectId, setProjectId] = useState(null);

  const vector = [
    3, 5, 5, 5, 4, 4, 4, 4, 2, 5, 2, 2, 2, 4, 5, 5, 5, 2, 3, 5, 2, 2, 10, 0, 10,
  ];

  const [currentIndex, setCurrentIndex] = useState(0); 
  const [items, setItems] = useState([]); 
  const [questions, setQuestions] = useState([]);

  const getComponent = (index) => {
    if (index === 0) {
      return (
        <ProjectData onProjectSubmit={(project, members) => {
          setProjectData(project);
          setProjectMembers(members);
        }} />
      );
    }
    if (index > 0 && index <= 10) {
      return (
        <Item
          items={items.filter((item) => item.id === index)}
          questions={questions.filter((question) => question.item?.id === index)}
          vector={vector}
          projectId={projectId}
          onAnswerChange={(questionId, value, field) => {
            setAnswers((prevAnswers) => {
              const answerIndex = prevAnswers.findIndex((ans) => ans.questionId === questionId);

              if (answerIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[answerIndex] = {
                  ...updatedAnswers[answerIndex],
                  [field]: value,
                };
                console.log("Respuesta actualizada:", updatedAnswers);
                return updatedAnswers;
              } else {
                const newAnswer = [
                  ...prevAnswers,
                  {
                    projectId,
                    questionId,
                    response: field === "response" ? value : "",
                    observation: field === "observation" ? value : "",
                  },
                ];
                console.log("Nueva respuesta añadida:", newAnswer);
                return newAnswer;
              }
            });
          }}
        />
      );
    }
  };

  const validateAnswers = () => {
    const currentQuestions = questions.filter((q) => q.item?.id === currentIndex + 1);
    for (const question of currentQuestions) {
      const answer = answers.find((ans) => ans.questionId === question.id);
      const maxValue = vector[question.id - 1];

      if (currentIndex === 0) {
        if (!answer || answer.response === "") {
          alert(`La respuesta para la pregunta ${question.id} debe estar entre 0 y ${maxValue}.`);
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (currentIndex === 0) {
      try {
        if (!projectData || !projectData.name || !projectData.coordinator) {
          alert("Por favor, completa todos los campos del proyecto antes de continuar.");
          return;
        }
        const projectResponse = await fetch("http://localhost:3002/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        const project = await projectResponse.json();
        setProjectId(project.id);
        
        if (!projectMembers || projectMembers.length === 0 || projectMembers.some((member) => !member)) {
          alert("Por favor, agrega al menos un miembro al proyecto antes de continuar o completa todos los campos.");
          return;
        }

        await Promise.all(
          projectMembers.map((member) =>
            fetch("http://localhost:3002/project-members", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ projectId: project.id, memberName: member }),
            })
          )
        );

      } catch (error) {
        console.error("Error al enviar los datos del proyecto:", error);
      }
    } else if (currentIndex > 0) {
      if (!validateAnswers()) return;

      try {
        const filteredAnswers = answers.filter((ans) => ans.projectId && ans.response !== "");
        await Promise.all(
          filteredAnswers.map((answer) =>
            fetch("http://localhost:3002/answers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(answer),
            })
          )
        );
      } catch (error) {
        console.error("Error al enviar respuestas:", error);
      }
    }

    if (currentIndex >= 10) {
      navigate("/pdf-create", { state: { projectId } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch("http://localhost:3002/items");
        if (!itemsResponse.ok) throw new Error('Error al obtener los items');
        const itemsData = await itemsResponse.json();
        setItems(itemsData);

        const questionsResponse = await fetch("http://localhost:3002/questions");
        if (!questionsResponse.ok) throw new Error('Error al obtener las preguntas');
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []); // No need to add dependencies if the URLs don't change

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        {getComponent(currentIndex)} 
        <div className="navigation-buttons" style={{ marginTop: "20px" }}>
          <button
            onClick={handleNext}
            className="next-btn"
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
