import React from "react";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
export default function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mt-16">{children}</main>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
    </>
  );
}
