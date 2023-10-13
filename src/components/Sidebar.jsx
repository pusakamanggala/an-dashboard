import ANLogo from "../img/an-logo.svg";
import GridIcon from "../icons/grid.svg";
import CloudIcon from "../icons/cloud.svg";
import BoxIcon from "../icons/box.svg";
import ToolIcon from "../icons/tool.svg";
import UsersIcon from "../icons/users.svg";
import PackageIcon from "../icons/package.svg";
import LayersIcon from "../icons/layers-alt.svg";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`sidebar h-full bg-sky-950 p-6 text-white overflow-y-auto w-64 md:relative transition-all duration-500 fixed inset-y-0 left-0 md:translate-x-0 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <header>
        <div className="flex space-x-2 mb-8 justify-center items-center">
          <img
            src={ANLogo}
            alt=""
            className="w-12 h-12 bg-white rounded-full p-1"
          />
          <h1 className="text-sm ">Adaptive Network Laboratory</h1>
        </div>
      </header>
      <nav className="space-y-5">
        <ul className="flex flex-col space-y-2">
          <li>
            <h2>Main</h2>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "inActive")}
            >
              <img src={GridIcon} alt="" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/deploy"
              className={({ isActive }) => (isActive ? "active" : "inActive")}
            >
              <img src={CloudIcon} alt="" />
              <span>Deploy</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/images"
              className={({ isActive }) => (isActive ? "active" : "inActive")}
            >
              <img src={BoxIcon} alt="" />
              <span>Images</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              className={({ isActive }) => (isActive ? "active" : "inActive")}
            >
              <img src={ToolIcon} alt="" />
              <span>Service</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addons"
              className={({ isActive }) => (isActive ? "active" : "inActive")}
            >
              <img src={PackageIcon} alt="" />
              <span>Addons</span>
            </NavLink>
          </li>
        </ul>
        <ul className="flex flex-col space-y-2">
          <li>
            <h2>Administrator</h2>
          </li>
          <li>
            <NavLink
              to="/members"
              className={({ isActive }) => (isActive ? "active" : "inActive")}
            >
              <img src={UsersIcon} alt="" />
              <span>Members</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/project-config"
              className={({ isActive }) => (isActive ? "active" : "inActive")}
            >
              <img src={LayersIcon} alt="" />
              <span>Project Config</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
