import { Route, Routes } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Login from "./Login/Login";
import Signup from "./Login/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import Home from "./Home/Home";

const Views = () => {
  const { user } = useContext(AccountContext);

  return user.loggedIn === null ? (
    <Text>Loading ...</Text>
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Views;
