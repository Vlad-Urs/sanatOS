import { useLocation, useNavigate } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { startAuthentication } from '../redux-toolkit/slices/authSlice';
import { RootState } from "../redux-toolkit/store/store";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const correctedPath = useSelector((state: RootState) => state.auth.correctedPath);

  if (isAuthenticated) {
    return (
      <section className="bg-ct-blue-200 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <p className="text-green-600 text-lg mb-4">You're already logged in.</p>
            <button
              type="button"
              onClick={() => correctedPath && navigate(correctedPath)}
              className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              Go to your profile
            </button>
          </div>
        </div>
      </section>
    );
  }

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok && !response.redirected) {
        console.error("Login failed:", response.statusText);

        const errorData = await response.json();
        const errorMessage = errorData.error || "Login failed";
        setLoginError(errorMessage);

        return;
      }

      dispatch(startAuthentication({ email: values.email, password: values.password }));

      const nextUrl = new URL(response.url);
      const pathWithoutHost = nextUrl.pathname;
      navigate(pathWithoutHost);
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred during login");
    }
  };

  return (
    <section className="bg-ct-blue-200 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          <h1 className="text-2xl font-bold text-ct-blue-200 mb-6 mt-4">Login Page</h1>
          {loginError && (
            <div className="mb-4 text-red-700 text-sm">{loginError}</div>
          )}

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-6">
              <input
                type="email"
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.email?.message}
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

            <label className="flex items-center text-gray-700 mb-6">
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
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
