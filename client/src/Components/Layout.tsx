import React from "react";
import { Outlet } from "react-router-dom";

//componentes
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
