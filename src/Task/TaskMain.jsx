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

// import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { TaskHome } from "./Home"
// import { Task } from "./Task"
// import { Result } from "./TaskResult"

// export const TaskMain = () => {
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: <TaskHome />,
//         },
//         {
//             path: "/questions",
//             element: <Task />,
//         },
//         {
//             path: "/result",
//             element: <Result />
//         }
//     ]);

//     return (
//         <RouterProvider router={router} />
//     );
// };
