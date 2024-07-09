import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../common/components/Layout/Layout'
import UserDashboard from '../pages/User/Dashboard/UserDashboard'
import Page404 from '../common/components/Layout/Page404'
import TaskList from '../pages/User/Tasks/TaskList'
import TaskForm from '../pages/User/Tasks/TaskForm'

const PublicRoute = () => {
  return (
    <>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/dashboard' element={<UserDashboard />} />
              <Route path='/task/list' element={<TaskList />} />
              <Route path='/task/form' element={<TaskForm />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </>
  )
}

export default PublicRoute