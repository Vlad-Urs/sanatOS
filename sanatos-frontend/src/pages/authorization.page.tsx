import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthorizationForm: React.FC = () => {
  const [authorizationCode, setAuthorizationCode] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorizationCode(e.target.value);
  };

  const handleResendEmail = () => {
    // Logic to resend email goes here
    console.log('Resending email...');
  };

  return (
    <section className="bg-ct-blue-200 min-h-screen pt-20">
    <div className="max-w-md mx-auto mt-8 p-6 bg-ct-dark-100 rounded-md shadow-md">
      <p className="text-lg font-bold text-ct-blue-200 mb-4">
        Please check your email and input the authorization code
      </p>
      
      <div className="mb-4">
        <label htmlFor="authorizationCode" className="block text-sm font-medium text-gray-600">
          Authorization code
        </label>
        <input
          type="text"
          id="authorizationCode"
          name="authorizationCode"
          value={authorizationCode}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <button
        type="button"
        onClick={handleResendEmail}
        className="bg-ct-blue-100 text-white px-4 py-2 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700"
      >
        Resend email
      </button>
    </div>
    </section>
  );
};

export default AuthorizationForm;
