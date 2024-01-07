import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authenticate,
  changeDrop,
  changeNotify,
  changeUser,
  unauthenticate,
} from "./features/slice";

import Navbar from "./components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import ViewProfile from "./pages/ViewProfile";
import SearchUsers from "./pages/SearchUsers";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Friends = lazy(() => import("./pages/Friends"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const authState = localStorage.getItem("auth");

  const auth = useSelector((state: any) => {
    return state.auth.value;
  });

  if (authState) {
    dispatch(authenticate());
  }

  useEffect(() => {
    const fetch = async () => {
      if (token) {
        await axios
          .post(
            "https://socialsync-xmk6.onrender.com/api/auth",
            {},
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((res) => {
            // console.log(res.data)
            dispatch(changeUser(res.data));
            dispatch(authenticate());
            localStorage.setItem("auth", auth);
          })
          .catch((e) => {
            dispatch(unauthenticate());
            localStorage.removeItem("auth");
            toast.error(e.response.data, { theme: theme ? "dark" : "light" });
          });
      }
    };
    fetch();
  }, [token]);

  const theme = useSelector((state: any) => {
    return state.theme.dark;
  });

  return (
    <div className={`${theme ? "bg-[#1a1919]" : "bg-[#e9ebee]"} min-h-screen`}>
      <BrowserRouter>
        {auth ? <Navbar /> : <></>}
        <div
          onClick={() => {
            dispatch(changeDrop(false));
            dispatch(changeNotify(false));
          }}
        >
          <Routes>
            <Route
              path="/login"
              element={
                auth ? (
                  <Suspense>
                    <Navigate to="/" />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Login />
                  </Suspense>
                )
              }
            ></Route>
            <Route
              path="/register"
              element={
                auth ? (
                  <Suspense>
                    <Navigate to="/" />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Register />
                  </Suspense>
                )
              }
            ></Route>
            <Route
              path="/forgetpassword"
              element={
                <Suspense>
                  <ForgetPassword />
                </Suspense>
              }
            />
            <Route
              path="/resetpassword"
              element={
                <Suspense>
                  <ResetPassword />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                auth ? (
                  <Suspense>
                    <Home />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Navigate to="/login" />
                  </Suspense>
                )
              }
            ></Route>
            <Route
              path="/editprofile"
              element={
                auth ? (
                  <Suspense>
                    <Profile />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Navigate to="/login" />
                  </Suspense>
                )
              }
            ></Route>
            <Route
              path="/friends"
              element={
                auth ? (
                  <Suspense>
                    <Friends />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Navigate to="/login" />
                  </Suspense>
                )
              }
            ></Route>
            <Route
              path="/profile/:id"
              element={
                auth ? (
                  <Suspense>
                    <ViewProfile />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Navigate to="/login" />
                  </Suspense>
                )
              }
            ></Route>
            <Route
              path="/search/user/"
              element={
                auth ? (
                  <Suspense>
                    <SearchUsers />
                  </Suspense>
                ) : (
                  <Suspense>
                    <Navigate to="/login" />
                  </Suspense>
                )
              }
            ></Route>
            <Route
              path="*"
              element={
                <Suspense>
                  <NotFound />
                </Suspense>
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
