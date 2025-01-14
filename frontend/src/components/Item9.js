import React from "react";
import "./Items.css"

function Item1({ items, questions, vector, projectId, onAnswerChange }) {

  const handleInputChange = (questionId, value) => {
    onAnswerChange(questionId, value);
  };

  return (
    <div className="items-cont">
        {items.map((item) => (
          <div className="item-content" key={item.id}>
            <h1 id="item-title">{item.id}</h1>
            <h2 id="item-conte">{item.name}</h2>
          </div>
        ))}
        {questions.map((question) => (
          <div className="questions-cont" key={question.id}>
            <h1 id="question-num">{question.id}</h1>
            <h2 id="question-txt">{question.content}</h2>
            <input
              type="number"
              min="0"
              value="0"
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
            
                handleInputChange(question.id, value);
              }}
            />
            <span>/{vector[question.id - 1]}</span>
          </div>
        ))}
    </div>
  );
}

export default Item1;
