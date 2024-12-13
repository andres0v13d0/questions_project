import React from "react";
import "./Items.css"

function Item1({ items, questions, vector, projectId, onAnswerChange }) {

  const handleInputChange = (questionId, value) => {
    onAnswerChange(questionId, value);
  };

  return (
    <div className="items-cont">
        
    </div>
  );
}

export default Item1;
