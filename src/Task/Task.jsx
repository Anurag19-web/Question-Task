import React, { useEffect, useState } from "react";
import sample from "./sample.json";
import { NavLink, useNavigate } from "react-router-dom";

export const Task = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);
  const [remainingOptions, setRemainingOptions] = useState([]);
  const [showMatchResult, setShowMatchResult] = useState(false);
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(30);

  const navigate = useNavigate();

  useEffect(() => {
    if (sample?.data?.questions) {
      setData(sample.data.questions);
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const currentQuestion = data[currentIndex];
      setSelectedAnswers(["", "", "", ""]);
      setRemainingOptions([...currentQuestion.options]);
      setTimer(30);
    }
  }, [currentIndex, data]);
  
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); 
    } else {
      handleNext(); 
    }
  }, [timer]);

  const currentQuestion = data[currentIndex];
  
  const handleOptionClick = (option,ans) => {
    const firstEmptyIndex = selectedAnswers.findIndex((answer) => answer === "");
    if (firstEmptyIndex !== -1) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[firstEmptyIndex] = option;
      setSelectedAnswers(updatedAnswers);
      setRemainingOptions((prev) => prev.filter((opt) => opt !== option));
    }
    
  };
 
  const handleBlankClick = (index) => {
    const answerToRemove = selectedAnswers[index];
    if (answerToRemove) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[index] = "";
      setSelectedAnswers(updatedAnswers);

      if (!remainingOptions.includes(answerToRemove)) {
        setRemainingOptions((prev) => [...prev, answerToRemove]);
      }
    }
  };

   const handleNext = () => {
    const isCorrect = selectedAnswers.every(
      (answer, index) => answer === currentQuestion.correctAnswer[index]
    );

    const newResult = {
      question: currentQuestion.question,
      selectedAnswers,
      correctAnswers: currentQuestion.correctAnswer,
      isCorrect,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    if (currentIndex === data.length - 1) {
      navigate("/result", { state: { results: updatedResults } });
    } else {
      setCurrentIndex(currentIndex + 1);
      setShowMatchResult(true);
    }
  };

  return (
    <>
    <div style={{ padding: "20px" }}>
      <div className="upper-part">
      <h1>0:{timer}</h1>
      <NavLink to="/result">
      <button className="quit-btn">Quit</button>
      </NavLink>
      </div>
      {currentQuestion ? (
        <div>
          <p className="questions">
            {currentQuestion.question.split("_____________").map((text, idx) => (
              <span key={idx}>
                {text}
                {idx < selectedAnswers.length && (
                  <span
                    onClick={() => handleBlankClick(idx)}
                    style={{
                      color: selectedAnswers[idx] ? "black" : "gray",
                      fontWeight: "bold",
                      cursor: selectedAnswers[idx] ? "pointer" : "default",
                      textDecoration: selectedAnswers[idx] ? "none" : "none",
                      marginRight: "5px",
                      fontWeight:400,
                      fontSize:"13px",
                      height:"50px",
                      width:"290px",
                      padding:"3px",
                      border: selectedAnswers[idx] ? "1px solid black" : "",
                      borderRadius:"5px",
                      textAlign:"center",
                    }}
                  >
                    {selectedAnswers[idx] || "_____________"}
                  </span>
                )}
              </span>
            ))}
          </p>
          <ul className="options">
            {remainingOptions.map((option, idx) => (
              <p
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="option"
              >
                {option}
              </p>
            ))
            }
          </ul>
          <button onClick={handleNext} style={{ ...buttonStyle, backgroundColor: "gray" }} className="nextBtn">
            {
              currentIndex===data.length-1 ? "Go to Result Page" : "Next Question"
            }
            </button>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
    </>
  );
  
};

const buttonStyle = {
  marginTop: "20px",
  marginRight: "10px",
  padding: "10px 20px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};