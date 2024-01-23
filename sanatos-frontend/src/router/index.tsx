import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/profile.page";
import PatientPage from "../pages/patient.page";
import DoctorPage from "../pages/doctor.page";
import AuthorizationForm from "../pages/authorization.page";
import UnauthorizedPage from "../pages/unauthorized.page";

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
      // Add a custom route for unauthorized access
      path: "unauthorized",
      element: <UnauthorizedPage />,
    },
  ],
};

const routes: RouteObject[] = [normalRoutes];

export default routes;
