import { NavLink } from 'react-router-dom'

const Sidebar = ({ toggleMenu }) => {
  return (
    <>
      <div className={`sidebar ${!toggleMenu && 'close'}`} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <div className="logo-details" style={{ borderBottom: '2px solid #11101d26', minHeight: '77px' }}>
          <i className='bx bxs-timer'></i>
          <span className="logo_name">Time Tracking</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => `${isActive && 'active-tab'}`}>
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Dashboard</span>
            </NavLink>
          </li>
          <li className='mt-10'>
            <NavLink to="/task/list" className={({ isActive }) => `${isActive && 'active-tab'}`}>
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Tasks List</span>
            </NavLink>
          </li>
          <li className='mt-10'>
            <NavLink to="/task/form" className={({ isActive }) => `${isActive && 'active-tab'}`}>
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Tasks Form</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar