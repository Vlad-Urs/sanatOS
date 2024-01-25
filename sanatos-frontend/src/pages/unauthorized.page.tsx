import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <section className="bg-ct-blue-200 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          <h2 className="text-3xl font-bold text-ct-red-800 mb-4">
            401 - Unauthorized Access
          </h2>
          <p className="text-gray-700 mb-6">
            You don't have permission to access this page. Please log in.
          </p>
          <a
            href="/login"
            className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Log In
          </a>
        </div>
      </div>
    </section>
  );
};

export default UnauthorizedPage;

