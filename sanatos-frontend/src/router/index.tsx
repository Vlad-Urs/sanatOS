import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/profile.page";
import RegisterPage from "../pages/register.page";
import PatientPage from "../pages/patient.page";
import DoctorPage from "../pages/doctor.page";
import AuthorizationForm from "../pages/authorization.page";

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "2faa",
      element: <AuthorizationForm />,
    },
    {
      path: "patient/:PatientID", 
      element: <PatientPage />,
    },
    {
      path: "doctor/:DoctorID", 
      element: <DoctorPage />,
    },
  ],
};

const routes: RouteObject[] = [normalRoutes];

export default routes;
