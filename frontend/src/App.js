import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectData from "./components/ProjectData";
import Header from "./section/Header";
import Slider from "./section/Slider";
import "./App.css";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Item1 from "./components/Item1";
import Item2 from "./components/Item2";
import Item3 from "./components/Item3";
import Item4 from "./components/Item4";
import Item5 from "./components/Item5";
import Item6 from "./components/Item6";
import Item7 from "./components/Item7";
import Item8 from "./components/Item8";
import Item9 from "./components/Item8";
import Item10 from "./components/Item10";

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

  const components = [
    <ProjectData onProjectSubmit={(project, members) => {
      setProjectData(project);
      setProjectMembers(members);
    }}/>,
    <Item1
      items={items.filter((item) => item.id === 1)}
      questions={questions.filter((question) => question.item?.id === 1)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item2
      items={items.filter((item) => item.id === 2)}
      questions={questions.filter((question) => question.item?.id === 2)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item3
      items={items.filter((item) => item.id === 3)}
      questions={questions.filter((question) => question.item?.id === 3)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item4
      items={items.filter((item) => item.id === 4)}
      questions={questions.filter((question) => question.item?.id === 4)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item5
      items={items.filter((item) => item.id === 5)}
      questions={questions.filter((question) => question.item?.id === 5)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item6
      items={items.filter((item) => item.id === 6)}
      questions={questions.filter((question) => question.item?.id === 6)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item7
      items={items.filter((item) => item.id === 7)}
      questions={questions.filter((question) => question.item?.id === 7)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item8
      items={items.filter((item) => item.id === 8)}
      questions={questions.filter((question) => question.item?.id === 8)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item9
      items={items.filter((item) => item.id === 9)}
      questions={questions.filter((question) => question.item?.id === 9)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,
    <Item10
      items={items.filter((item) => item.id === 10)}
      questions={questions.filter((question) => question.item?.id === 10)}
      vector={vector}
      projectId={projectId}
      onAnswerChange={(questionId, response) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
          if (answerIndex !== -1) {
            updatedAnswers[answerIndex].response = response;
          } else {
            updatedAnswers.push({ projectId, questionId, response });
          }
          return updatedAnswers;
        });
      }}
    />,


    
  ];

  const handleNext = async () => {
    if (currentIndex === 0) {
      try {
        const projectResponse = await fetch("http://localhost:3002/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        const project = await projectResponse.json();
        setProjectId(project.id); 
  
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
      try {
        // Filtrar respuestas duplicadas por questionId
        const uniqueAnswers = Array.from(
          answers.reduce((map, answer) => {
            if (!map.has(answer.questionId)) {
              map.set(answer.questionId, answer); // Agregar si no existe
            }
            return map; // Continuar acumulando
          }, new Map()).values() // Extraer solo los valores únicos
        );
      
        // Comprobar si hubo duplicados y mostrarlos en consola
        if (uniqueAnswers.length !== answers.length) {
          console.log("Se eliminaron respuestas duplicadas:");
          console.log(answers.filter(answer => !uniqueAnswers.includes(answer)));
        }
      
        // Enviar las respuestas únicas al servidor
        await Promise.all(
          uniqueAnswers.map((answer) =>
            fetch("http://localhost:3002/answers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(answer),
            })
          )
        );
      
        console.log("Respuestas enviadas correctamente.");
      } catch (error) {
        console.error("Error al enviar respuestas:", error);
      }      
    }
  
    if (currentIndex === components.length - 1) {
      navigate("/pdf-create", { state: { projectId } });  
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch("http://localhost:3002/items");
        const itemsData = await itemsResponse.json();
        setItems(itemsData);

        const questionsResponse = await fetch(
          "http://localhost:3002/questions"
        );
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="App">
      <Header />
      <Slider />
      <header className="App-header">
        {components[currentIndex]} 
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
