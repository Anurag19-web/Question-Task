import React, { useEffect, useState } from "react";
import sample from "./sample.json";
import { NavLink } from "react-router-dom";
import { Result } from "./TaskResult";

export const Task = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);
  const [remainingOptions, setRemainingOptions] = useState([]);
  const [correctAnswerData,setCorrectAnswerData] = useState([]);
  const [timer, setTimer] = useState(30); // ⏱ 30 seconds timer

  // Load data from sample
  useEffect(() => {
    if (sample?.data?.questions) {
      setData(sample.data.questions);
    }
  }, []);

  // Reset selected answers, options, and timer when question changes
  useEffect(() => {
    if (data.length > 0) {
      const currentQuestion = data[currentIndex];
      setSelectedAnswers(["", "", "", ""]);
      setRemainingOptions([...currentQuestion.options]);
      setTimer(30); // reset timer
    }
  }, [currentIndex, data]);
  
  

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup
    } else {
      handleNext(); // auto-move when timer hits 0
    }
  }, [timer]);

  const currentQuestion = data[currentIndex];
  

  const handleOptionClick = (option) => {
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

  const handleSubmit = () => {
    const isCorrect = selectedAnswers.every(
      (answer, index) => answer === currentQuestion.correctAnswer[index]
    );
    if (isCorrect) {
      alert("✅ Correct! Well done!");
    } else {
      alert("❌ Some answers are incorrect. Try again!");
    }
  };

  const handleReset = () => {
    setSelectedAnswers(["", "", "", ""]);
    setRemainingOptions([...currentQuestion.options]);
    setTimer(30); // also reset the timer
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } 
    // else {
    //   alert("🎉 Quiz finished!");
    // }
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
          {/* <h3>Question {currentIndex + 1}:</h3> */}
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

          {/* <strong>Options:</strong> */}
          <ul className="options">
            {remainingOptions.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="option"
              >
                {option}
              </li>
            ))}
          </ul>
          {/* <ul>
            {
              currentQuestion.correctAnswer.map((ans,inde)=>(
                <li key={inde}>{ans}</li>
              ))
            }
          </ul> */}

          {/* <button onClick={handleSubmit} style={buttonStyle}>
            Submit
          </button>
          <button onClick={handleReset} style={{ ...buttonStyle, backgroundColor: "orange" }}>
            Reset
          </button>
          {currentIndex < data.length - 1 && (
            
          )} */
          <button onClick={handleNext} style={{ ...buttonStyle, backgroundColor: "gray" }}>
              Next Question
            </button>}
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