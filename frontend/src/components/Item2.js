import React from "react";
import "./Items.css"

function Item1({ items, questions, vector, projectId, onAnswerChange }) {

  const handleInputChange = (questionId, value) => {
    onAnswerChange(questionId, value);
  };

  return (
    <div className="items-cont">
        {items.map((item) => (
          <div className="item-content">
            <h1 id="item-title">{item.id}</h1>
            <h2 id="item-conte">{item.name}</h2>
          </div>
        ))}
        {questions.map((question) => (
          <div className="questions-cont">
            <h1 id="question-num">{question.id}</h1>
            <h2 id="question-txt">{question.content}</h2>
            <input
              type="number"
              min="0"
              max={vector[question.id - 1]}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
            <span>/{vector[question.id - 1]}</span>
          </div>
        ))}
    </div>
  );
}

export default Item1;
