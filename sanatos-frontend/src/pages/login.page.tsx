import { useLocation, useNavigate } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { startAuthentication } from '../redux-toolkit/slices/authSlice';

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
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);

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
        // Handle error, show an error message, etc.
        console.error("Login failed:", response.statusText);

        // Assuming the error message is in JSON format, you can parse it
        const errorData = await response.json();
        const errorMessage = errorData.error || "Login failed";
        setLoginError(errorMessage);

        return;
      }

      // Dispatch the startAuthentication action to update the Redux store
      dispatch(startAuthentication({ email: values.email, password: values.password }));

      //console.log(response)
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
                type="password"
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
