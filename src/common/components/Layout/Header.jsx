import { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../redux/slices/UserSlice";
import { Navigate } from "react-router-dom";



const Header = ({ toggleMenu, setToggleMenu }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [[isOpen]]);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700" style={{ padding: "2px 16px" }}>
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <ul className="flex w-full justify-between">
            <li>
              <i className='bx bx-menu cursor-pointer' onClick={() => setToggleMenu(!toggleMenu)} style={{ fontSize: '35px' }}></i>
            </li>
            <li>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    onClick={toggleDropdown}
                  >
                    hello, {user.name}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Account settings</a>
                      <button type="button" onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            </li>

          </ul>
        </div>
      </nav>

    </>
  )
}

export default Header