import { NavLink, useLocation } from "react-router-dom";

export const Result = () => {
  const location = useLocation();
  const { results = [] } = location.state || {};

  return (
    <>
    <div className="result-mainDiv">
      <p className="result-para">
        While you correctly formed several sentences, there are a couple of areas where
        improvement is needed. Pay close attention to sentence structure and word placement 
        to ensure clarity and correctness. Review your responses below for more details.
      </p>

      <NavLink to="/">
        <button className="result-dashboard-btn">Go to Dashboard</button>
      </NavLink>

      <div className="questions-result-one">

        {results.map((res, index) => (
          <div
            key={index} className="result-div"
          >
            <div className="result-promptDiv">
                <p className="result-prompt">Prompt</p>
                <br></br>
                <p>
              {res.question.split("_____________").join("_____")}
              </p>
            </div>
            <br></br>
            <div className="result-resDiv">
                <p className="result-res">Your response</p>
                <div className="result-res-para">
                {res.isCorrect ? <p className="crt">correct</p> :
                <p className="incrt">incorrect</p>}
                </div>
                <br></br>
            </div>
            <br></br>
           </div>
        ))}
      </div>
      </div>
    </>
  );
};
