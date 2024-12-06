import React from "react";
import "./Items.css"

function Item3({ items, questions, vector, projectId, onAnswerChange }) {

  const handleInputChange = (questionId, value) => {
    onAnswerChange(questionId, value);
  };

  return (<></>);
}

export default Item3;
