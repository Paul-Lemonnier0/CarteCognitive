import {
    createBrowserRouter,
  } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import NotFoundScreen from "./screens/NotFoundScreen";
import GraphDetailsScreen from "./screens/GraphDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen/>
  },

  {
    path: "/graphDetails",
    element: <GraphDetailsScreen/>
  },
  {
    path:"/Profile",
    element : <ProfileScreen/>
  },

  {
    path: "*",
    element: <NotFoundScreen/>
  },

  {
    path:"SignIn",
    element:<LoginScreen/>
  },
  {
    path:"SignUp",
    element:<SignUpScreen/>
  }
])

export default router
  