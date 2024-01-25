import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="bg-ct-blue-200 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          <h2 className="text-3xl font-bold text-ct-red-800 mb-4">
            404 - Page Not Found
          </h2>
          <p className="text-gray-700 mb-6">
            The page you are looking for might be in another universe. Please check the URL or go back to the{" "}
            <Link to="/" className="text-blue-600 underline hover:text-blue-700">
              home page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
