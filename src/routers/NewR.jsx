import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'
import UserDashboard from '../pages/User/Dashboard/UserDashboard'
import TaskList from "../pages/User/Tasks/TaskList";
import TaskForm from "../pages/User/Tasks/TaskForm";
import TaskReport from "../pages/User/Tasks/TaskReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute role={['admin']} />,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/task/list",
        element: <TaskList />,
      },
      {
        path: "/task/form",
        element: <TaskForm />,
      },{
        path: "/task/form/:_taskId",
        element: <TaskForm />,
      },{
        path: "/task/Logs",
        element: <TaskReport />,
      },
    ],
  }
]);


const NewR = () => {
  return <RouterProvider router={router} />;
}

export default NewR