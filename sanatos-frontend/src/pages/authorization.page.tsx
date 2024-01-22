import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-toolkit/store/store'; // Replace with the actual path to your store
import { useNavigate } from 'react-router-dom';
import { startAuthentication } from '../redux-toolkit/slices/authSlice'; // Replace with the actual path to your auth slice

const AuthorizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const [authorizationCode, setAuthorizationCode] = React.useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorizationCode(e.target.value);
  };

  const handleResendEmail = () => {
    // Logic to resend email goes here
    console.log('Resending email...');
  };

  // useEffect to check authentication state
  useEffect(() => {
    const hasEmailAndPassword = !!authState.email && !!authState.password;

    // If email and password do not exist, redirect to login
    if (!hasEmailAndPassword) {
      navigate('/unauthorized');
    }
  }, [authState, navigate]);

  const handleContinue = () => {
    // Logic to handle the authentication code and complete authentication
    dispatch(startAuthentication({ email: authState.email!, password: authState.password! }));
    // Redirect to the next page after authentication
    // You can replace this with the appropriate route
    navigate('/next-page');
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

        <button
          type="button"
          onClick={handleContinue}
          className="bg-ct-blue-100 text-white px-4 py-2 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700 mt-4"
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default AuthorizationForm;

