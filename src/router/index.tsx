import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { HomePage } from "../pages/Home";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import Cookies from "universal-cookie";
import Account from "../pages/Account";
import ErrorPage from "../components/Error/ErrorPage";

const cookies = new Cookies();
const jwt = cookies.get("jwt");

const routes = createBrowserRouter(
  createRoutesFromElements([
    <>
      {/* Root Layout */}
      <Route
        path="/"
        element={<RootLayout />}
        errorElement={<ErrorPage statusCode={500} message="Server Error" />}
      >
        <Route
          path="/"
          element={
            <ProtectedRoutes isAllowed={!jwt} redirectPath="/home">
              <LoginPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoutes isAllowed={!jwt} redirectPath="/home">
              <RegisterPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoutes isAllowed={jwt} redirectPath="/">
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoutes isAllowed={jwt} redirectPath="/">
              <Account />
            </ProtectedRoutes>
          }
        />
      </Route>
      {/* Error Page Not Found */}
      <Route
        path="*"
        element={<ErrorPage statusCode={404} message="Page Not Found" />}
      />
    </>,
  ])
);

export default routes;
