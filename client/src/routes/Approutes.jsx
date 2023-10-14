import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Reset from "../pages/Reset";

export default function Approutes() {
  return (
    <Routes>
      <Route
        element={
          <AppLayout>
            <Outlet />
          </AppLayout>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
