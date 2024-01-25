import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../redux-toolkit/store/store';

const HomePage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const correctedPath = useSelector((state: RootState) => state.auth.correctedPath);

  return (
    <>
      <section className="bg-ct-blue-200 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md overflow-hidden min-h-[20rem] flex flex-col justify-center items-center shadow-md p-8">
          <h1 className="text-4xl font-bold text-ct-blue-200 mb-4">
            Welcome to SanatOS
          </h1>
          {isAuthenticated ? (
            <button className="bg-ct-blue-100 text-white px-6 py-2 mt-6 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700">
              <Link to={correctedPath || '/profile'} className="text-ct-white-600 text-lg">
                Go to Profile
              </Link>
            </button>
          ) : (
            <button className="bg-ct-blue-100 text-white px-6 py-2 mt-6 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700">
              <Link to="/login" className="text-ct-white-600 text-lg">
                Login
              </Link>
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;



