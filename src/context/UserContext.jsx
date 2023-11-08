import { createContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { getToken } from "../utils/helper";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [activeTerminal, setActiveTerminal] = useState([]);

  const token = getToken();
  const user = useMemo(() => {
    return token ? jwtDecode(token) : null;
  }, [token]);

  // get user role from cookie
  const getUserRoleToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userRole="));

    return cookie ? cookie.split("=")[1] : null;
  };

  // set user role directly from cookie
  const [userRole, setUserRole] = useState(
    getUserRoleToken() ? getUserRoleToken() : null
  );

  // set user role from token if user role is not set yet and token is available
  useEffect(() => {
    if (token && !userRole) {
      const decodedUser = jwtDecode(token);
      const roleId = decodedUser.roleId;
      let role = null;
      switch (roleId) {
        case 1:
          role = "admin";
          break;
        case 2:
          role = "asisten";
          break;
        case 3:
          role = "praktikum";
          break;
        case 4:
          role = "viewer";
          break;
      }
      setUserRole(role);
      // set expire according to remember me check box
      document.cookie = `userRole=${role}; path=/;`;
    }
  }, [userRole, token]);

  const contextValue = { user, userRole, activeTerminal, setActiveTerminal };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
