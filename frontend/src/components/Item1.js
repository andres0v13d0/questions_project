import React from "react";
import "./Items.css"

function Item1({ items, questions }) {
  return (
    <div className="items-cont">
      <h2>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </h2>
      <h2>Questions:</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Item1;
