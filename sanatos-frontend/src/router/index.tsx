import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/login.page";
import PatientPage from "../pages/patient.page";
import DoctorPage from "../pages/doctor.page";
import MedicalPage from "../pages/medical.page";
import AuthorizationForm from "../pages/authorization.page";
import UnauthorizedPage from "../pages/unauthorized.page";
import RegisterPage from "../pages/register.page";
import NotFoundPage from "../pages/not.found.page"; // Import the NotFoundPage component

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
      path: "email-verification",
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
    {
      path: ":PatientID/register",
      element: <RegisterPage />,
    },
    {
      // Add a custom route for unauthorized access
      path: "unauthorized",
      element: <UnauthorizedPage />,
    },
    {
      // Add a catch-all route for any other paths
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};


const routes: RouteObject[] = [normalRoutes];

export default routes;
