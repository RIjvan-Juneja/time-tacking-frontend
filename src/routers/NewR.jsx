import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedWrapper from './ProtectedWrapper'
import UserDashboard from '../pages/User/Dashboard/UserDashboard'
import TaskList from "../pages/User/Tasks/TaskList";
import TaskForm from "../pages/User/Tasks/TaskForm";
import TaskReport from "../pages/User/Tasks/TaskReport";
import PublicWrapper from "./PublicWrapper";
import Login from "../pages/Authentication/Login";
import Registation from "../pages/Authentication/Registation";
import AdminDashboard from "../pages/User/Dashboard/AdminDashboard";
import Page404 from "../common/components/Layout/Page404";

const router = createBrowserRouter([
  {
    path: "/user",
    element: <ProtectedWrapper role={['user']} />,
    children: [
      {
        path: "/user/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/user/task/list",
        element: <TaskList />,
      },
      {
        path: "/user/task/form",
        element: <TaskForm />,
      },
      {
        path: "/user/task/form/:_taskId",
        element: <TaskForm />,
      },
      {
        path: "/user/task/Logs",
        element: <TaskReport />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedWrapper role={['admin']} />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      }
    ]
  },
  {
    path: "/",
    element: <PublicWrapper />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registation",
        element: <Registation />,
      }
    ]
  },
  {
    path: '*',
    element: <Page404 />
  }
]);


const NewR = () => {
  return <RouterProvider router={router} />;
}

export default NewR