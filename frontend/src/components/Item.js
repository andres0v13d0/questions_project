import { useState } from "react";
import "./Items.css";

function Item({ setOption, items, questions, vector, projectId, onAnswerChange }) {
  const [intermediateScreen, setIntermediateScreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); 

  const handleInputChange = (questionId, value, field) => {
    onAnswerChange(questionId, value, field);

    if (field === "response") {
      if (questionId === 23 && selectedOption === "option1") {
        onAnswerChange(24, 0, "response");
      } else if (questionId === 24 && selectedOption === "option2") {
        onAnswerChange(23, 0, "response"); 
      }
    }
  };

  const filteredItems = items.some((item) => item.id === 10);

  const filteredQuestions = filteredItems
    ? selectedOption === "option1"
      ? [...questions.filter((q) => q.id === 23), ...questions.filter((q) => q.id === 25)]
      : selectedOption === "option2"
      ? [...questions.filter((q) => q.id === 24), ...questions.filter((q) => q.id === 25)]
      : questions.filter((q) => q.id === 25)
    : questions;  


  return (
    <div className="items-cont">
      {filteredItems && !intermediateScreen ? (
        <div className="intermediate-screen">
          <h1>¿Qué tipo de proyecto es?</h1>
          <div>
            <button
              onClick={() => {
                handleInputChange(24, 0, "response");
                setIntermediateScreen(true);
                setSelectedOption('option1');
                setOption('option1');
              }}
            >
              Proyecto Multidisciplinario
            </button>
            <button
              onClick={() => {
                handleInputChange(23, 0, "response");
                setIntermediateScreen(true);
                setSelectedOption('option2');
                setOption('option2');
              }}
            >
              Proyecto de Carrera
            </button>
          </div>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div className="item-content" key={item.id}>
              <h1 id="item-title">{item.id}</h1>
              <h2 id="item-conte">{item.name}</h2>
            </div>
          ))}
          {filteredQuestions.map((question) => (
            <div className="questions-cont" key={question.id}>
              <h1 id="question-num">{question.id}</h1>
              <h2 id="question-txt">{question.content}</h2>
              <input
                type="number"
                min="0"
                max={vector[question.id - 1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  const maxValue = vector[question.id - 1];

                  if (value < 0) {
                    alert("El valor no puede ser menor que 0.");
                    e.target.value = "";
                    return;
                  }

                  if (value > maxValue) {
                    alert(`El valor no puede ser mayor que ${maxValue}.`);
                    e.target.value = "";
                    return;
                  }

                  handleInputChange(question.id, value, "response");
                }}
              />
              <span>/{vector[question.id - 1]}</span>
              <textarea
                id="obser"
                placeholder="Observación (opcional)"
                onChange={(e) =>
                  handleInputChange(question.id, e.target.value, "observation")
                }
              ></textarea>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Item;
