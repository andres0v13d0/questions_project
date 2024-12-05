import React, { useState, useEffect } from "react";
import ProjectData from "./components/ProjectData";
import Header from "./section/Header";
import Slider from "./section/Slider";
import "./App.css";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Item1 from "./components/Item1";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [items, setItems] = useState([]);
  const [questions, setQuestions] = useState([]);

  const components = [
    <ProjectData/>,
    <Item1
      items={items.filter((item) => item.id === 1)}
    questions={questions.filter((question) => question.item?.id === 1)}
    />,
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch("http://localhost:3000/items");
        const itemsData = await itemsResponse.json();
        setItems(itemsData);

        const questionsResponse = await fetch(
          "http://localhost:3000/questions"
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
          <button onClick={handleNext} className="next-btn">
            <FaArrowAltCircleRight />
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
