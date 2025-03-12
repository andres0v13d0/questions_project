import { useState } from "react";
import "./Items.css";

function Item({ setOption, items, questions, vector, projectId, onAnswerChange }) {
  const [intermediateScreen, setIntermediateScreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setIntermediateScreen(true);
    setSelectedOption(option);
    setOption(option);

    if (option === "option1") {
      onAnswerChange(23, 10, "response");
      onAnswerChange(24, 0, "response");
    } else {
      onAnswerChange(24, 5, "response");
      onAnswerChange(23, 0, "response");
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (selectedOption === "option1" && q.id === 23) return false;
    if (selectedOption === "option2" && q.id === 24) return false;
    return true;
  });
  

  return (
    <div className="items-cont">
      {items.some((item) => item.id === 10) && !intermediateScreen ? (
        <div className="intermediate-screen">
          <h1>¿Qué tipo de proyecto es?</h1>
          <div>
            <button onClick={() => handleSelection("option1")}>Proyecto Multidisciplinario</button>
            <button onClick={() => handleSelection("option2")}>Proyecto de Carrera</button>
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
          {filteredQuestions
            .filter((question) => question.id !== 23 && question.id !== 24)
            .map((question, index) => (
              <div className="questions-cont" key={question.id}>
                <h1 id="question-num">
                  {question.id === 25 ? 23 : question.id}
                </h1>
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

                    onAnswerChange(question.id, value, "response");
                  }}
                />
                <span>/{vector[question.id - 1]}</span>
                <textarea
                  id="obser"
                  placeholder="Observación (opcional)"
                  onChange={(e) => onAnswerChange(question.id, e.target.value, "observation")}
                ></textarea>
              </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Item;
