import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { useState } = require("react");
const { createContext } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => {
    fetch("http://localhost:4000/auth/login", {
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return res.json()
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        navigate("/home")
      });
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
