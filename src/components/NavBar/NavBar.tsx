import { NavLink } from "react-router-dom";
import CollectionsIcon from "./components/CollectionsIcon/CollectionsIcon";
import FavoritesIcon from "../FavoritesIcon/FavoritesIcon";
import HomeIcon from "../HomeIcon/HomeIcon";
import Logo from "../Logo/Logo";
import MyAccountIcon from "../MyAccountIcon/MyAccountIcon";
import SearchIcon from "../SearchIcon/SearchIcon";
import Line from "../Svgs/Line";
import "./NavBar.scss";

const NavBar = () => {
  // const navigate = useNavigate();
  // const onHomeClick = () => {
  //   navigate("/home");
  // };
  // const onMyAccountClick = () => {
  //   navigate("/my-account");
  // };
  return (
    <div className="navBarContainer">
      <Logo />
      <div className="MyAccountWrraper">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navBarIconContainer_active" : ""
          }
          to="/my-account"
        >
          {" "}
          <MyAccountIcon />
        </NavLink>
        <span className="labelMyAccount">My account</span>
      </div>
      <div className="line">
        <Line />
      </div>
      <div className="iconsContainer">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navBarIconContainer_active" : ""
          }
          to="/home"
        >
          <HomeIcon />
        </NavLink>

        <SearchIcon />
        <CollectionsIcon />
        <FavoritesIcon />
      </div>
    </div>
  );
};

export default NavBar;
