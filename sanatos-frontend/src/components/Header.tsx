import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux-toolkit/slices/authSlice';
import Logo from '../assets/logo.svg';
import { RootState } from '../redux-toolkit/store/store';

const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setShowConfirmation(false);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <header className="bg-ct-white-100 h-20 border-b border-black relative">
      <nav className="h-full flex justify-between container items-center">
        <div className="flex items-center">
          <Link to="/" className="text-4xl text-ct-blue-200 pr-20">
            <img className="float-left" src={Logo} alt="" style={{ height: '2rem' }} />
            SanatOS
          </Link>
        </div>

        {isAuthenticated && (
          <div>
            <button className="text-ct-blue-200 hover:underline" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {showConfirmation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">Are you sure you want to sign out?</p>
          <div className="flex justify-end">
            <button
              className="bg-ct-blue-200 text-white px-4 py-2 rounded-md mr-2 hover:bg-ct-blue-300"
              onClick={confirmLogout}
            >
              Yes
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={cancelLogout}
            >
              No
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;




