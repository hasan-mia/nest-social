import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'

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
                <Route path="/" element={<Home/>} />
        </Route>
    </Routes>
    )
}
