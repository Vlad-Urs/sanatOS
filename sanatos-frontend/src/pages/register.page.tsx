import { useNavigate, useParams } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { startAuthentication } from '../redux-toolkit/slices/authSlice';
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = object({
  username: string()
    .min(1, "Username is required"),
  password: string()
    .min(1, "Password is required"),
  confirmPassword: string()
    .min(1, "Confirm Password is required"),
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { PatientID } = useParams();
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    if (values.password !== values.confirmPassword) {
      setRegistrationError("Passwords do not match");
      return;
    }

    setRegistrationError(null)
    try {
      const response = await fetch(`http://localhost:5000/patient-${PatientID}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok && !response.redirected) {
        console.error("Registration failed:", response.statusText);

        const errorData = await response.json();
        const errorMessage = errorData.error || "Registration failed";
        setRegistrationError(errorMessage);

        return;
      }
      const nextUrl = new URL(response.url);
      const pathWithoutHost = nextUrl.pathname;

        const correctedPath = pathWithoutHost.replace(/-/g, '/');
      console.log("here")
        navigate(correctedPath);
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationError("An error occurred during registration");
    }
  };

  return (
    <section className="bg-ct-blue-200 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 relative"> 
          <h1 className="text-2xl font-bold text-ct-blue-200 mb-6 mt-4">Register Page</h1>
          {registrationError && (
            <div className="mb-4 text-red-700 text-sm px-4 py-2 bg-white border border-red-500 rounded absolute top-[-15px] left-0 right-0">
              {registrationError}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.username?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>

            <label className="mt-2 flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              Show Password
            </label>

            <button
              type="submit"
              className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
