import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import UserDashboard from '../pages/User/Dashboard/UserDashboard'
import Page404 from '../components/Layout/Page404'

const PublicRoute = () => {
  return (
    <>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/home' element={<UserDashboard />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </>
  )
}

export default PublicRoute