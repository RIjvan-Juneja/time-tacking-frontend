import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom";
import Header from './Header'
import { useState } from 'react';

const Layout = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  return (
    <>
      <Sidebar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <section className="home-section ">
        <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        <div className="h mx-9 mt-7 bg-white p-4">
          <Outlet />
        </div>
      </section>
    </>
  )
}

export default Layout