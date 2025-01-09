import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/ui/Home";
import Counter from "./components/shared/Counter";
import Jobs from "./components/ui/Jobs";

import FilterCard from "./components/ui/FilterCard";
import Browse from "./components/ui/Browse";
import Profile from "./components/ui/Profile";
import JobDescription from "./components/ui/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";

import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/filter",
    element: <FilterCard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  //admin ke liye pages like components
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        {" "}
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
