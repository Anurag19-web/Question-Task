import { NavLink } from "react-router-dom"

export const Result = () =>{

    return(
        <>
        <p className="result-para">while you correctly formed several sentences, there are a couple of areas where
        improvement is needed. Pay close attention to sentence structure and word placement 
        to ensure clarity and correctness. Review your responses below for more details.</p>
        <NavLink to="/">
        <button className="result-dashboard-btn">Go to Dashboard</button>
        </NavLink>
        <div className="questions-result-one">
            <p>prompt</p><p></p>
            <p>wait</p>
            <p>Your response</p><p>correct</p>
            <p>wait</p>
        </div>
        </>
    )
}