import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Task } from "./Task"
import { Result } from "./TaskResult"
import { TaskHome } from "./TaskHome"

export const TaskMain =()=>{
    const router = createBrowserRouter([
        {
            path:"/",
            element:<TaskHome/>,
        },
        {
            path:"/questions",
            element:<Task/>,
        },
        {
            path:"/result",
            element:<Result/>
        }
    ])
    return(
        <>
        <RouterProvider router={router}/>
        </>
    )
}
//https://question-task-eta.vercel.app/