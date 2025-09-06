import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-yellow-200">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
//bg-[url("bg.png")]
export default Layout