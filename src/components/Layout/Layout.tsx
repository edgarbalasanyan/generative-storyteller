import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Layout.scss"

const Layout = () => {
  return (
    <div className="layout">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
