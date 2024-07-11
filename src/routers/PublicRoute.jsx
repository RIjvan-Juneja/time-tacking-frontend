import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../common/components/Layout/Layout'
import UserDashboard from '../pages/User/Dashboard/UserDashboard'
import Page404 from '../common/components/Layout/Page404'
import TaskList from '../pages/User/Tasks/TaskList'
import TaskForm from '../pages/User/Tasks/TaskForm'
import TaskReport from '../pages/User/Tasks/TaskReport'

const PublicRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/dashboard' element={<UserDashboard />} />
            <Route path='/task/list' element={<TaskList />} />
            <Route path='/task/form' element={<TaskForm />} />
            <Route path='/task/form/:_taskId' element={<TaskForm />} />
            <Route path='/task/Logs' element={<TaskReport />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default PublicRoute


// const PublicRoute = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route path="/dashboard" element={<UserDashboard />} />
//           <Route
//             path="/task/list"
//             element={
//               <ProtectedRoute requiredPermissions={['ADMIN_VIEW']}>
//                 <TaskList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/task/form"
//             element={
//               <ProtectedRoute requiredPermissions={['ADMIN_EDIT']}>
//                 <TaskForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/task/logs" element={<TaskReport />} />
//           <Route path="*" element={<Page404 />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create a context for authentication
// const AuthContext = createContext();

// // AuthProvider component to wrap your app and provide auth state
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch user data from local storage or API when the app loads
//     const fetchUserData = async () => {
//       try {
//         // Simulate an API call to fetch user data
//         const userData = JSON.parse(localStorage.getItem('user'));
//         if (userData) {
//           setUser(userData);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const login = async (userData) => {
//     // Simulate a login API call and set user data
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     // Simulate a logout API call and clear user data
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
