import React from 'react'

const Sidebar = ({ toggleMenu } )  => {
  return (
    <> 
      <div className={`sidebar ${!toggleMenu && 'close'}`} style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <div className="logo-details" style={{borderBottom : '2px solid #11101d26',minHeight: '77px' }}> 
        <i className='bx bxs-timer'></i>
          <span className="logo_name">Time Tracking</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Dashboard</span>
            </a>
          </li>
          <li className='mt-10 active-tab'>
            <a href="#">
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Tasks</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar