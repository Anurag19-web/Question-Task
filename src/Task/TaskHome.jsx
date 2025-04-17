import { NavLink } from "react-router-dom"
import "./Task.css"

export const TaskHome = () =>{
    return (
        <>
        <div className="home-head-div">
        <h1 className="home-head">Sentence Construction</h1>
        <p className="head-para">Select the correct words to complete the sentence by arranging the provided options in the right order.</p>
        </div>
        <div className="home-div">
            <div className="home-div-one">
                <h1>Time Per Questions</h1>
                <p>30 sec</p>
            </div>
            <div className="home-div-two">
                <h1>Total Questions</h1>
                <p>10</p>
            </div>
            <div className="home-div-three">
                <h1>Coins</h1>
                <p>0</p>
            </div>
        </div>
        <div className="home-buttons">
            <button className="backBtn">Back</button>
            <NavLink to="/questions" >
            <button className="startBtn">Start</button>
            </NavLink>
        </div>
        </>
    )
}