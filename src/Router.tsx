import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import NotFoundScreen from "./screens/NotFoundScreen";
import GraphDetailsScreen from "./screens/GraphDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
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
])

export default router
  