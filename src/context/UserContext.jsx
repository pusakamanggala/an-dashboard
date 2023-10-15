import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("viewer");

  const getToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="));

    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    const token = getToken();

    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      const roleId = decodedUser.roleId;
      switch (roleId) {
        case 1:
          setUserRole("admin");
          break;
        case 2:
          setUserRole("asisten");
          break;
        case 3:
          setUserRole("praktikum");
          break;
        case 4:
          setUserRole("viewer");
          break;
        default:
          setUserRole(null);
          break;
      }
    }
  }, []);

  const contextValue = { user, userRole };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
