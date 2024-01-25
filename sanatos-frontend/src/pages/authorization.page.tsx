import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux-toolkit/store/store';
import { useNavigate } from 'react-router-dom';
import {
  completeAuthentication,
  setCorrectedPath,
  startAuthentication,
} from '../redux-toolkit/slices/authSlice';

// Import toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthorizationForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const [authorizationCode, setAuthorizationCode] = React.useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorizationCode(e.target.value);
  };

  const handleResendEmail = async () => {
    try {
      // Send a POST request to resend email
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: authState.email, password: authState.password }),
      });

      if (response.ok || response.redirected) {
        // Show a success message using react-toastify
        toast.success('Email has been sent!', {
          position: 'top-center',
          autoClose: 3000, // Close the notification after 3 seconds
          hideProgressBar: true,
        });
      } else {
        // Show an error message using react-toastify
        toast.error('Failed to resend email. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error during email resend:', error);
    }
  };

  useEffect(() => {
    const hasEmailAndPassword = !!authState.email && !!authState.password;

    if (!hasEmailAndPassword) {
      navigate('/unauthorized');
    }
  }, [authState, navigate]);

  const handleContinue = async () => {
    try {
      const codeNumber = parseInt(authorizationCode, 10);
  
      if (isNaN(codeNumber)) {
        console.error('Invalid authorization code:', authorizationCode);
        return;
      }
  
      const response = await fetch('http://localhost:5000/email-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: codeNumber }),
      });
  
      console.log(response);
      console.log(JSON.stringify({ code: codeNumber }));
  
      if (response.ok || response.redirected) {
        dispatch(startAuthentication({ email: authState.email!, password: authState.password! }));
        dispatch(completeAuthentication({ authenticationCode: authorizationCode }));

        const nextUrl = new URL(response.url);
        const pathWithoutHost = nextUrl.pathname;
        const correctedPath = pathWithoutHost.replace(/-/g, '/');
        
        dispatch(setCorrectedPath({ correctedPath }));
        navigate(correctedPath);
      } else {
        console.error('Verification failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
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
          className="bg-ct-blue-100 text-white px-4 py-2 rounded-md hover:bg-ct-blue-200 focus:outline-none focus:ring focus:border-ct-red-700 mt-4 ml-3"
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default AuthorizationForm;
